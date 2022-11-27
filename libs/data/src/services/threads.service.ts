import { Injectable } from "@angular/core";
import { Thread } from "../entities/thread";

@Injectable({providedIn: 'root',})
export class ThreadsImService {
    private thread?: Thread;
    private threadArray: Thread[] = [
        {
            "_id": "0",
            "communityId": "0",
            "title": "How to learn?",
            "content": "Can someone give me tips on how I should learn for a specific course?",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": ""
        },
        {
            "_id": "1",
            "communityId": "0",
            "title": "What is your favorite subject?",
            "content": "",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": ""
        },
        {
            "_id": "2",
            "communityId": "0",
            "title": "A picture of me in class.",
            "content": "Me in class.",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": "https://tophat.com/wp-content/uploads/BLOG_how-to-motivate-students.jpg"
        },
        {
            "_id": "3",
            "communityId": "0",
            "title": "What are the best schools in the world?",
            "content": "Which schools are considered the best?",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": "https://www.cjg043.nl/wp-content/uploads/2020/07/tips-kiezen-middelbare-school.jpg"
        },
        {
            "_id": "4",
            "communityId": "0",
            "title": "What are the average costs to go to school?",
            "content": "Does someone know how much money it costs to go to school?",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": ""
        },
        {
            "_id": "5",
            "communityId": "1",
            "title": "How to become better at a game?",
            "content": "How do I improve at playing a game?",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": ""
        },
        {
            "_id": "6",
            "communityId": "2",
            "title": "Do you like this drawing?",
            "content": "Give your opinion!",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": "https://images.saymedia-content.com/.image/t_share/MTc1MDEwNDM4ODU2MDU4NjY3/how-to-draw-a-dead-tree.jpg"
        },
        {
            "_id": "7",
            "communityId": "3",
            "title": "A picture of me working out!",
            "content": "",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-front.jpg"
        },
        {
            "_id": "8",
            "communityId": "4",
            "title": "Breaking! Russia has started an attack on Ukraine.",
            "content": "Today Russia has started a special operation in Ukraine.",
            "views": 0,
            "likes": 0,
            "dislikes": 0,
            "creationDate": new Date(),
            "image": "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-11/221121-ukraine-soldier-al-0702-e26bb9.jpg"
        }
    ];

    getAll(): Thread[] {
        return this.threadArray;
    }

    getAllByCommunity(communityId: string): Thread[] {
        return this.threadArray.filter(thread => thread.communityId === communityId);
    }

    getById(threadId: string): Thread {
        return this.threadArray.filter(thread => thread._id === threadId)[0];
    }

    create(thread: Thread) {
        this.thread = new Thread();

        this.thread._id = Math.random().toString();
        this.thread.communityId = thread.communityId;
        this.thread.title = thread.title;
        this.thread.content = thread.content;
        this.thread.views = 0;
        this.thread.likes = 0;
        this.thread.dislikes = 0;
        this.thread.creationDate = new Date();
        this.thread.image = thread.image;

        this.threadArray.push(this.thread);
    }

    update(thread: Thread) {
        this.thread = new Thread();

        this.thread._id = thread._id;
        this.thread.communityId = thread.communityId;
        this.thread.title = thread.title;
        this.thread.content = thread.content;
        this.thread.views = thread.views;
        this.thread.likes = thread.likes;
        this.thread.dislikes = thread.dislikes;
        this.thread.creationDate = thread.creationDate;
        this.thread.image = thread.image;

        const index = this.threadArray.map(t => t._id).indexOf(thread._id);
        let oldThread = this.threadArray[index];
        oldThread = { ...this.thread };
        this.threadArray[index] = oldThread;
    }

    delete(threadId: string) {
        this.threadArray = this.threadArray.filter(thread => thread._id !== threadId);
    }

    increaseViews(threadId: string) {
        let thread = this.threadArray.filter(thread => thread._id === threadId)[0];
        const index = this.threadArray.map(t => t._id).indexOf(thread._id);
        thread.views++;

        this.threadArray[index] = thread;
    }
}