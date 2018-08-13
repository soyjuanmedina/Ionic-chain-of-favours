import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

//Pages
import { AskingPage } from '../asking/asking';
import { GivingPage } from '../giving/giving';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  idioms: any[] = [];

  constructor(public navCtrl: NavController,
    public translateService: TranslateService) {
    this.idioms = [
      {
        value: 'es',
        label: 'SPANISH'
      },
      {
        value: 'en',
        label: 'ENGLISH'
      }
    ];
  }

  setLanguage(lang) {
    this.translateService.use(lang);
  }

  goToPage(page){
    this.navCtrl.push(page);
  }

}
