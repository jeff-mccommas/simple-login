import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { AppConfigService } from '../../services/app-config.service';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpModule],
      declarations: [ FooterComponent ],
      providers: [AppConfigService, {provide: HttpClient, deps: [MockBackend]}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
