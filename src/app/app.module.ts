import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClient,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import { CodeValidatorComponent } from './modules/prek12/code-validator/code-validator.component';
// import { SelectClassComponent } from './modules/prek12/select-class/select-class.component';
// import { SelectStudentComponent } from './modules/prek12/select-student/select-student.component';

import {Prek12Module} from './modules/prek12/prek12.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import {InMemoryDataService} from './mockdata/prek12/in-memory-data-service';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppConfigService} from './services/app-config.service';
import {LoggerService} from './services/logger.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './services/error-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
// Add this function
export function initConfig(appConfigService: AppConfigService){
 return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    Prek12Module,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [LoggerService,
              AppConfigService,
              {
                provide: APP_INITIALIZER,
                useFactory: initConfig,
                  deps: [AppConfigService],
                  multi: true
              },
              {
                provide: HTTP_INTERCEPTORS,
                useClass: ErrorInterceptor,
                multi: true,
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
