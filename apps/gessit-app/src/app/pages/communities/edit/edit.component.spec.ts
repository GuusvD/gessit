global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Theme } from 'libs/data/src/entities/theme';
import { Thread } from 'libs/data/src/entities/thread';
import { User } from 'libs/data/src/entities/user';
import { CommunitiesService } from 'libs/data/src/services/communities.service';
import { ThemesService } from 'libs/data/src/services/themes.service';
import { Types } from 'mongoose';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { EditComponent } from './edit.component';

const dummyCommunity = 
{
    _id: new Types.ObjectId("6391333037ceb01d296c5982"),
    name: "School community",
    description: "This is a community about school",
    ranking: 0,
    creationDate: new Date(),
    image: "https://img.freepik.com/vrije-vector/grote-schoolgebouw-scene_1308-32058.jpg?w=2000",
    isOpen: true,
    themes: [] as Theme[],
    threads: [] as Thread[],
    members: [] as Types.ObjectId[],
    owner: new User()
};

const dummyCategories = [
    {
        _id: "6390d1cc295f50e74c8fd45c",
        name: "Racing",
    },
    {
        _id: "6390d201295f50e74c8fd460",
        name: "Gaming",
    },
    {
        _id: "6390d20d295f50e74c8fd464",
        name: "School",
    }
]

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let activatedRouteSpy;
  let type: boolean;
  let fakeAuthServiceMock: any;
  let fakeCommunitiesServiceMock: any;
  let fakeThemeServiceMock: any;

  beforeEach(waitForAsync(() => {
        activatedRouteSpy = {
            snapshot: {
                data: convertToParamMap({
                    createCommunity: type,
                }),
            },
        };

        fakeCommunitiesServiceMock = {
            getById: jest.fn().mockReturnValue(of(dummyCommunity)),
        };

        fakeThemeServiceMock = {
            getThemes: jest.fn().mockReturnValue(of(dummyCategories)),
        };

        fakeAuthServiceMock = {
            getUserFromLocalStorage: jest.fn().mockReturnValue(of(new User())),
            formHeaders: jest.fn().mockReturnValue(
                    of({
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + 'token',
                    }),
                })
            ),
        currentUser$: new BehaviorSubject<User | undefined>(undefined),
        };

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [EditComponent],
            providers: [
                { provide: CommunitiesService, useValue: fakeCommunitiesServiceMock },
                HttpTestingController,
                { provide: ActivatedRoute, useValue: activatedRouteSpy },
                { provide: AuthService, useValue: fakeAuthServiceMock },
                { provide: ThemesService, useValue: fakeThemeServiceMock },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(EditComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should check for valid url input in the form | success', () => {
        component.createCommunity = true
        const result = component.validImageUrl(new FormControl("https://angular.io/api/forms/FormControl"))
        expect(result).toBe(null);
    });

    it('should check for valid url input in the form | success', () => {
        component.createCommunity = true
        const result = component.validImageUrl(new FormControl("https://angular.io/api/forms/FormControl"))
        expect(result).toBe(null);
    });

    it('should check for valid url input in the form | fail', () => {
        expect(true).toBeTruthy();
        const result = component.validImageUrl(new FormControl("invalidUrl"))
        expect(result).toStrictEqual({imageUrl : false});
    });

    it('should check for name input in form | success', () => {
        component.createCommunity = true
        const result = component.validName(new FormControl("success (min 5 characters)"))
        expect(result).toBe(null);
    });

    it('should check for name input in form | fail', () => {
        expect(true).toBeTruthy();
        const result = component.validName(new FormControl("fail"))
        expect(result).toStrictEqual({name : false});
    });

    it('should check for description input in form | success', () => {
        component.createCommunity = true
        const result = component.validDescription(new FormControl("I'm a good description, because I contain more than 10 characters."))
        expect(result).toBe(null);
    });

    it('should check for description input in the form | fail', () => {
        expect(true).toBeTruthy();
        const result = component.validDescription(new FormControl("fail"))
        expect(result).toStrictEqual({description : false});
    });
});