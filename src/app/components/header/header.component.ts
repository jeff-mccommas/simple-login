import { Component, OnInit } from '@angular/core';
import {UrlConfig} from 'config/url-config';
import {TranslateService} from '@ngx-translate/core';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  config: any;
  languages: any =  new UrlConfig().getLanguage();
  currentLang: any = {
    'languageValue': 'en_US',
    'desktopLabel': 'English – United States',
    'mobileLabel': 'English (US)'
  };
  constructor(
    private translate: TranslateService,
    private service: AppConfigService
    ) {}

  ngOnInit() {
    console.log(`config is ${this.config} and languages is ${this.languages}`);
    // this.service.configVal.subscribe(data => {
    //   this.config = data;
    // })
    this.config = this.service.getConfig();
    // .then( config => {
    //     this.config = config;
    //     console.log(this.config);
    //   });

  }
  onLanguageChange(language: any) {
    this.setCurrentLanguage(language);
    this.translate.use(language.languageValue);
  }
  setCurrentLanguage(language: any) {
    this.currentLang = language;
  }

}
