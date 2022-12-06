import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'libs/data/src/entities/user';
import { AlertService } from '../shared/alert/alert.service';
import { Types } from 'mongoose';
import { Role } from 'libs/data/src/entities/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    // Check of we al een ingelogde user hebben
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(username: string, password: string): Observable<User | undefined> {
    console.log(`login at ${environment.SERVER_API_URL}auth/login`);

    return this.http
      .post<User>(
        `${environment.SERVER_API_URL}auth/login`,
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(userData: User): Observable<User | undefined> {
    console.log(`register at ${environment.SERVER_API_URL}auth/register`);
    console.log(userData);

    const anyDate = userData.birthDate as any;

    if(anyDate.month.toString().length === 1) {
      anyDate.month = '0' + anyDate.month;
    }

    if(anyDate.day.toString().length === 1) {
      anyDate.day = '0' + anyDate.day;
    }

    const user = {
      username: userData.username,
      birthDate: anyDate?.year + '-' + anyDate?.month + '-' + anyDate?.day,
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      image: userData.image
    }

    console.log(user);

    return this.http
      .post<User>(`${environment.SERVER_API_URL}auth/register`, user, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          // const user = new User(response);
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(userData: User): Observable<User | undefined> {
    const url = `${environment.SERVER_API_URL}auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.access_token,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<any>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError((error: any) => {
        console.log('Validate token Failed');
        this.logout();
        this.currentUser$.next(undefined);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
    return of(localUser);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): boolean {
    let isAdmin;
    let isOwnerOfData;
    
    this.getUserFromLocalStorage().subscribe((user) => {
      console.log(user)
      isAdmin = user.roles.includes(Role.Admin);
      isOwnerOfData = new Types.ObjectId(user._id).equals(new Types.ObjectId(itemUserId));
    }).unsubscribe();

    return (isAdmin || isOwnerOfData) ? true : false;
  }

  partOfCommunity(communityId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User | undefined) => (user ? user.joinedCommunities.includes(new Types.ObjectId(communityId)) : false))
    ); 
  }

  formHeaders(): object {
    let token;
    this.getUserFromLocalStorage().subscribe((p) => {
      token = p.access_token;
    }).unsubscribe();

    return { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token})
    }
  }
}
