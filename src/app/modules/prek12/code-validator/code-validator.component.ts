import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Prek12Service } from '../../../services/prek12/prek12.service';
import { AppConfigService } from '../../../services/app-config.service';
import { JWT } from '../../../models/prek12/jwt';
import { Student } from '../../../models/prek12/student';
import { UrlConfig } from '../../../../config/url-config';

@Component({
  selector: 'app-code-validator',
  templateUrl: './code-validator.component.html',
  styleUrls: ['./code-validator.component.scss']
})
export class CodeValidatorComponent implements OnInit {
  JWTObj: JWT;
  selectedStudent: Student;
  id: number;
  s3ImageDomain: String;
  iconData: any;
  firstColVal: any;
  secondColVal: any;
  thirdColVal: any;
  disableNext = true;
  invalidPwd = false;
  constructor(
    private service: Prek12Service,
    private route: ActivatedRoute,
    private router: Router,
    private configService: AppConfigService
    ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.service.getStudentFromId(+params['contextid'], params['id']))
      .subscribe((data: Student) => {
        this.selectedStudent = data;
      });
    // this.id = +this.route.snapshot.params['id'];
    this.s3ImageDomain = this.configService.getConfig().s3BucketImageDomain;
    this.iconData = new UrlConfig().getIcons(this.s3ImageDomain);
    // this.service.showJWT()
    //     .then(data => this.JWTObj = data );
    // console.log(this.route.snapshot);
  }
   onSelectIcon(icon: any): void {
    // console.log(icon);
    if (icon.col === '1'){
      this.firstColVal = icon;
    }else if (icon.col === '2'){
      this.secondColVal = icon;
    }else{
      this.thirdColVal = icon;
    }
    this.disableNext = true;
    this.invalidPwd = false;
    if (this.firstColVal != null && this.secondColVal != null && this.thirdColVal != null){
      this.disableNext = false;
    }
  }
  goBack(){
    this.router.navigate(['/prek12/context', +this.route.snapshot.params['contextid'], 'students']);
  }
  goNext(){
    this.disableNext = true;
    const password = `${this.firstColVal.row}${this.secondColVal.row}${this.thirdColVal.row}`;
    const reqBody = {
      username: this.selectedStudent.usr,
      password: password
    }
    this.service.validateUser(reqBody)
      .then((data) => {
        console.log(`in code validator ${data}`);
      })
      .catch((data) => {
        if ((data.statusCode === 400) ||
        (data.statusCode === 401)) {
          this.invalidPwd = true;
          this.firstColVal= null;
          this.secondColVal= null;
          this.thirdColVal= null;
        }else if(data.statusCode === 500){
          window.location.href = '/error';
        }
      })
  }

}
