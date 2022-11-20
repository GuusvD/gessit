import { Injectable } from "@angular/core";
import { Community } from "@gessit/data";
import { Observable, of } from "rxjs";

@Injectable({providedIn: 'root',})
export class CommunitiesImService {
    private community? : Community;
    private communityArray: Community[] = [
        {
            "_id": "0",
            "name": "School community",
            "description": "This is a school community.",
            "creationDate": new Date(),
            "image": "https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png",
            "isOpen": true
        },
        {
            "_id": "1",
            "name": "Gaming community",
            "description": "This is a gaming community.",
            "creationDate": new Date(),
            "image": "https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png",
            "isOpen": true
        },
    ];
    private id: number | undefined;

    getAll(): Observable<Community[]> {
        return of(this.communityArray);
    }

    getById(communityId: string):  Observable<Community> {
        return of(this.communityArray.filter(community => community._id === communityId)[0]);
    }

    create(community: Community): Observable<any> {
        this.community = { ...community };

        this.id = this.communityArray.length++;
        this.community._id = this.id.toString();
        this.community.creationDate = new Date();
        this.community.image = "https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png";
        this.community.isOpen = true;

        this.communityArray.push(this.community);

        console.log("Community aangemaakt");

        return of({
          status: 201,
          message: 'success',
        });
    }
    
    update(community?: Community): Observable<any> {
        // TO DO: movieList updaten
    
        return of({
            status: 201,
            message: 'success',
        });
    }

    delete(communityId: string) {
        this.communityArray = this.communityArray.filter(community => community._id !== communityId);

        return of({
            status: 201,
            message: 'success',
        });
    }
}