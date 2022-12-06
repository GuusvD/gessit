import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'libs/data/src/entities/community';
import { Theme } from 'libs/data/src/entities/theme';
import { Subscription } from 'rxjs';
import { CommunitiesService } from '../../../../../../../libs/data/src/services/communities.service';
import { ThemesService } from '../../../../../../../libs/data/src/services/themes.service';
import { AlertService } from '../../../shared/alert/alert.service';

@Component({
  selector: 'gessit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  title: string | undefined;
  createCommunity: boolean | undefined;
  subs?: Subscription;
  communityForm: FormGroup = new FormGroup({});
  communityId : string | undefined;
  themes: Theme[] | undefined;
  selectedThemes: string[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communitiesService: CommunitiesService,
    private themesService: ThemesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'] || undefined;
    this.createCommunity = this.route.snapshot.data['createCommunity'] || false;

    if(!this.createCommunity) {
      this.subs = this.route.paramMap.subscribe((params) => {
        this.communityId = params.get('id')?.toString()
      });

      this.communityForm = new FormGroup({
        name: new FormControl(null, [Validators.required, this.validName.bind(this)]),
        description: new FormControl(null, [Validators.required, this.validDescription.bind(this)]),
        image: new FormControl(null, [Validators.required, this.validImageUrl.bind(this)]),
        isOpen: new FormControl(false),
      });

      this.subs = this.communitiesService.getById(this.communityId as string).subscribe((community) => {
        this.communityForm.patchValue({name: community.name, description: community.description, imageUrl: community.image, isPublic: community.isOpen});
      });
    }
    else {
      this.communityForm = new FormGroup({
        name: new FormControl(null, [Validators.required, this.validName.bind(this)]),
        description: new FormControl(null, [Validators.required, this.validDescription.bind(this)]),
        image: new FormControl(null, [Validators.required, this.validImageUrl.bind(this)]),
        isOpen: new FormControl(false),
      });
    }

    this.themesService.getThemes().subscribe((p) => (this.themes = p));
    this.selectedThemes = [];
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit() {
    if (this.communityForm.valid) {
      const community = this.communityForm.value as Community;

      if (this.selectedThemes) {
        community.themes = this.selectedThemes;
      }

      if(!this.createCommunity) {
        this.communitiesService.update(this.communityForm.value, this.communityId as string).subscribe((community) => {
          if (community) {
            this.router.navigate(['/communities']);
          }
        });
      } else {
        this.communitiesService.create(this.communityForm.value).subscribe((community) => {
          if (community) {
            this.router.navigate(['/communities']);
          }
        });
      }
    }
  }

  onChange(_id: string) {
    if (this.selectedThemes?.includes(_id)) {
      this.selectedThemes = this.selectedThemes.filter(p => p !== _id);
    } else {
      this.selectedThemes?.push(_id);
    }
  }

  validImageUrl(control: FormControl): { [s: string]: boolean } {
    const imageUrl = control.value;
    const regexp = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');
    if (regexp.test(imageUrl) !== true) {
      return { imageUrl: false };
    } else {
      return null!
    }
  }

  validName(control: FormControl): { [s: string]: boolean } {
    const name = control.value;
    const regexp = new RegExp(
      '.{5,}'
    );

    if (regexp.test(name) !== true) {
      return { name: false };
    } else {
      return null!;
    }
  }

  validDescription(control: FormControl): { [s: string]: boolean } {
    const description = control.value;
    const regexp = new RegExp(
      '.{10,}'
    );

    if (regexp.test(description) !== true) {
      return { description: false };
    } else {
      return null!;
    }
  }
}