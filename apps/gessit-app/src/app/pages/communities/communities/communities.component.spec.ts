global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { Theme } from 'libs/data/src/entities/theme';
import { Thread } from 'libs/data/src/entities/thread';
import { User } from 'libs/data/src/entities/user';
import { CommunitiesService } from 'libs/data/src/services/communities.service';
import { Types } from 'mongoose';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { CommunitiesComponent } from './communities.component';

let dummyCommunities: Community[];

fdescribe('CommunitiesComponent', () => {
    let component: CommunitiesComponent;
    let fixture: ComponentFixture<CommunitiesComponent>;
    let activatedRouteSpy;
    let type: any;
    let fakeAuthServiceMock: any;
    let fakeCommunitiesServiceMock: any;

    beforeEach(() => {
        dummyCommunities = [ 
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
            },
            {
                _id: new Types.ObjectId("63913b615640812705d69976"),
                name: "Gaming community",
                description: "This is a community about gaming",
                ranking: 0,
                creationDate: new Date(),
                image: "https://image.coolblue.nl/624x351/content/1f3843a1d94bd73ff9de7c4d8a10c760",
                isOpen: true,
                themes: [] as Theme[],
                threads: [] as Thread[],
                members: [] as Types.ObjectId[],
                owner: new User()
            }
        ]

        activatedRouteSpy = {
        snapshot: {
            data: convertToParamMap({
                type: type,
            }),
        },
        };

        fakeCommunitiesServiceMock = {
            getCommunities: jest.fn().mockReturnValue(of(dummyCommunities)),
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
            declarations: [CommunitiesComponent],
            providers: [
            { provide: CommunitiesService, useValue: fakeCommunitiesServiceMock },
            HttpClientTestingModule,
            HttpClient,
            HttpHandler,
            HttpTestingController,
            { provide: ActivatedRoute, useValue: activatedRouteSpy },
            { provide: AuthService, useValue: fakeAuthServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommunitiesComponent);
        component = fixture.componentInstance;
        component.communities = dummyCommunities;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should get a list of all communities', () => {
        type = 'all';
        component.ngOnInit();
        const result = component.communities;
        expect(result?.length).toBe(2);
        expect(result).toEqual(dummyCommunities);
        expect(result).toContain(dummyCommunities.at(0));
        expect(result).toContain(dummyCommunities.at(1));
    });

    it('should get a list of all communities user has created', () => {
        type = 'created';
        component.ngOnInit();
        const result = component.communities
        expect(result?.length).toBe(2);
        expect(result).toEqual(dummyCommunities);
        expect(result).toContain(dummyCommunities.at(0));
        expect(result).toContain(dummyCommunities.at(1));
    });

    it('should get a list of all joined communities', () => {
        type = 'joined';
        component.ngOnInit();
        const result = component.communities
        expect(result?.length).toBe(2);
        expect(result).toEqual(dummyCommunities);
        expect(result).toContain(dummyCommunities.at(0));
        expect(result).toContain(dummyCommunities.at(1));
    });

    it('should call current user', () => {
        type = '';
        component.ngOnInit()
        expect(fakeAuthServiceMock.currentUser$).toBeTruthy()
    });
});