global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { TestBed } from '@angular/core/testing';
import { Community } from '../../../../libs/data/src/entities/community';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommunitiesService } from '../../../../libs/data/src/services/communities.service';
import { Types } from 'mongoose';
import { Theme } from '../../../../libs/data/src/entities/theme';
import { Thread } from '../../../../libs/data/src/entities/thread';
import { User } from '../../../../libs/data/src/entities/user';
import { environment } from "../environments/environment";

fdescribe('CommunitiesService', () => {
    let service: CommunitiesService;
    let httpMock: HttpTestingController;
    let dummyCommunities: Community[] = [];

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

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CommunitiesService
            ]
        });

        service = TestBed.inject(CommunitiesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should return communities when calling getCommunities', (done) => {
        service.getCommunities('community').subscribe((communities) => {
            expect(communities.length).toBe(2);
            expect(communities.at(0)?._id).toEqual(dummyCommunities.at(0)!._id);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community');
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return no communities when calling getCommunities', (done) => {
        dummyCommunities = [];

        service.getCommunities('community').subscribe((communities) => {
            expect(communities.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community');
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling getById', (done) => {
        service.getById(dummyCommunities.at(0)!._id.toString()).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + dummyCommunities.at(0)!._id.toString());
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling getById', (done) => {
        dummyCommunities = [];

        service.getById(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + undefined);
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling create', (done) => {
        service.create(dummyCommunities.at(0)!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling create', (done) => {
        dummyCommunities = [];

        service.create(dummyCommunities.at(0)!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling update', (done) => {
        service.update(dummyCommunities.at(0)!, dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + dummyCommunities.at(0)?._id.toString());
        expect(req.request.method).toBe("PATCH");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling update', (done) => {
        dummyCommunities = [];

        service.update(dummyCommunities.at(0)!, dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + undefined);
        expect(req.request.method).toBe("PATCH");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling delete', (done) => {
        service.delete(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + dummyCommunities.at(0)?._id.toString());
        expect(req.request.method).toBe("DELETE");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling delete', (done) => {
        dummyCommunities = [];

        service.delete(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + undefined);
        expect(req.request.method).toBe("DELETE");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling join', (done) => {
        service.join(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + dummyCommunities.at(0)?._id.toString() + '/join');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling join', (done) => {
        dummyCommunities = [];

        service.join(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + undefined + '/join');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling leave', (done) => {
        service.leave(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + dummyCommunities.at(0)?._id.toHexString() + '/leave');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling leave', (done) => {
        dummyCommunities = [];

        service.leave(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            let result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.BASE_API_URL + 'community/' + undefined + '/leave');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });
});
