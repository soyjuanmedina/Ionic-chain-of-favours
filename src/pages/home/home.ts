import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { AuthProvider } from '../../providers/auth/auth';

//Pages
import { AskingPage } from '../asking/asking';
import { GivingPage } from '../giving/giving';
import { LoginPage } from '../login/login';


@IonicPage() 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public translateService: TranslateService) {
    
  }

  setLanguage(lang) {
    this.translateService.use(lang);
  }

  goToPage(page){
    this.navCtrl.push(page);
  }

  closeSesion(){
    this.auth.logout();
  }

}
