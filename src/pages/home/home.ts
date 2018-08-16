import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { AuthProvider } from '../../providers/auth/auth';

//Pages
import { AskingPage } from '../asking/asking';
import { GivingPage } from '../giving/giving';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  coords: any = { lat: 0, lng: 0 };

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public translateService: TranslateService) {
    
  }

  setLanguage(lang) {
    this.translateService.use(lang);
  }

  goToPage(page){
    this.navCtrl.push(page, this.coords);
  }

  closeSesion(){
    this.auth.logout();
  }

}
