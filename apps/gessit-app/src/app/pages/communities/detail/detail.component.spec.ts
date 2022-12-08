global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                DetailComponent
            ],
            providers: [ 
                { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({id: 1})) } },
                HttpClient,
                HttpHandler
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(DetailComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should call the isPartOfCommunity', () => {
        const fixture = TestBed.createComponent(DetailComponent);
        const app = fixture.componentInstance;
        expect(app.isPartOfCommunity).toBeTruthy();
    });

    it('should call the join', () => {
        const fixture = TestBed.createComponent(DetailComponent);
        const app = fixture.componentInstance;
        expect(app.join).toBeTruthy();
    });

    it('should call the delete', () => {
        const fixture = TestBed.createComponent(DetailComponent);
        const app = fixture.componentInstance;
        expect(app.delete).toBeTruthy();
    });

    it('should call the leave', () => {
        const fixture = TestBed.createComponent(DetailComponent);
        const app = fixture.componentInstance;
        expect(app.leave).toBeTruthy();
    });
});