import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThreadsService } from '../../../../../../../libs/data/src/services/threads.service';

@Component({
  selector: 'gessit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})

export class EditComponent implements OnInit, OnDestroy {
  title: string | undefined;
  createThread: boolean | undefined
  threadId: string | undefined
  communityId: string | undefined
  subs?: Subscription;
  threadForm: FormGroup = new FormGroup({});

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private threadsService: ThreadsService){}

    ngOnInit(): void {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.createThread = this.route.snapshot.data['createThread'] || false;

      this.subs = this.route.paramMap.subscribe((params) => {
        this.communityId = params.get('c-id')?.toString()
      });

      this.threadForm = new FormGroup({
        title: new FormControl(null, [Validators.required, this.validTitle.bind(this)]),
        content: new FormControl({content : true}),
        image: new FormControl({image : true}, [Validators.required, this.validUrl.bind(this)]),
      });

      if(!this.createThread) {
        this.subs = this.route.paramMap.subscribe((params) => {
          this.threadId = params.get('id')?.toString()
        });

        this.subs = this.threadsService.getById(this.communityId as string, this.threadId as string).subscribe((thread) => {
          this.threadForm.patchValue({title: thread.title, content: thread.content, image: thread.image});
        });
      }
    }

    ngOnDestroy(): void {
      if (this.subs) {
        this.subs.unsubscribe();
      }
    }

    onSubmit() {
      if (this.threadForm.valid) {
        if(!this.createThread) {
          this.threadsService.update(this.threadForm.value, this.communityId as string, this.threadId as string).subscribe((community) => {
            if (community) {
              this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]);
            }
          });
        } else {
          this.threadsService.create(this.threadForm.value, this.communityId as string).subscribe((community) => {
            if (community) {
              this.router.navigate(['/communities', this.communityId]);
            }
          });
        }
      }
    }


    validUrl(control: FormControl): { [s: string]: boolean } {
      const imageUrl = control.value;
      const regexp = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i');

      const regexp2 = new RegExp('^$');


      console.log(regexp2.test(imageUrl) !== true)

      if (regexp.test(imageUrl) !== true && regexp2.test(imageUrl) !== true) {
        return { imageUrl: false };
      } else {
        return null!
      }
    }

    validTitle(control: FormControl): { [s: string]: boolean } {
      const description = control.value;
      const regexp = new RegExp(
        '.{5,}'
      );
  
      if (regexp.test(description) !== true) {
        return { description: false };
      } else {
        return null!;
      }
    }
}