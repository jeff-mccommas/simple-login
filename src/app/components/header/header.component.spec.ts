import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {By} from '@angular/platform-browser'
import { AppConfigService } from '../../services/app-config.service';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { NgbModule, NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot(), HttpModule],
        providers: [AppConfigService, {provide: HttpClient, deps: [MockBackend]}],
        declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should have onLanguageChange defined', () => {
    component.onLanguageChange("en_US");
    expect(component.onLanguageChange).toBeTruthy();
  });
  it('should have setCurrentLanguage defined', () => {
    expect(component.setCurrentLanguage).toBeTruthy();
  });

  it('should have img tag with mhe logo image', async(() => {
    var regexp = /assets\/MHE_logo_desktop.png/;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toMatch(regexp);
  }));
});
