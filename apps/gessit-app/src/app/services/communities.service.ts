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
        {
            "_id": "2",
            "name": "Drawing community",
            "description": "This is a drawing community.",
            "creationDate": new Date(),
            "image": "https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png",
            "isOpen": true
        },
        {
            "_id": "3",
            "name": "Sports community",
            "description": "This is a sports community.",
            "creationDate": new Date(),
            "image": "https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png",
            "isOpen": true
        },
        {
            "_id": "4",
            "name": "News community",
            "description": "This is a news community.",
            "creationDate": new Date(),
            "image": "https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png",
            "isOpen": true
        }
    ];
    private id: number | undefined;

    getAll(): Observable<Community[]> {
        return of(this.communityArray);
    }

    getById(communityId: string):  Observable<Community> {
        return of(this.communityArray.filter(community => community._id === communityId)[0]);
    }

    create(community: Community): Observable<any> {
        this.community = new Community(undefined, undefined, undefined, undefined, undefined, undefined);
        this.id = this.communityArray.length++;

        this.community._id = this.id.toString();
        this.community.name = community.name;
        this.community.description = community.description;
        this.community.image = community.image;
        this.community.creationDate = new Date();

        if (community.isOpen == undefined) {
            this.community.isOpen = false;
        } else {
            this.community.isOpen = community.isOpen;
        }

        this.communityArray.pop();
        this.communityArray.push(this.community);

        return of({
          status: 201,
          message: 'success',
        });
    }
    
    update(community: Community): Observable<any> {
        this.community = new Community(undefined, undefined, undefined, undefined, undefined, undefined);

        this.community.name = community.name;
        this.community.description = community.description;
        this.community.image = community.image;
        this.community.isOpen = community.isOpen;

        const index = this.communityArray.map(c => c._id).indexOf(community._id);
        let oldCommunity = this.communityArray[index];
        oldCommunity = { ...this.community };
        this.communityArray[index] = oldCommunity;
    
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