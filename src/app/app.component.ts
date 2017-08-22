import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simplified login page';
  constructor(private translate: TranslateService) {
        translate.addLangs(['en_US', 'en_GB', 'es_MX']);
        translate.setDefaultLang('en_US');

        //const browserLang = translate.getBrowserLang();
        //translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    }
}
