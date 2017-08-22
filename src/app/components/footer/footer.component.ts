import { Component, OnInit } from '@angular/core';
import {UrlConfig} from 'config/url-config';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  config: any;
  constructor(
    private service: AppConfigService
  ) { }

  ngOnInit() {
    //  this.service.configVal.subscribe(data => {
    //   this.config = data;
    // });
    this.config= this.service.getConfig();
  }

}
