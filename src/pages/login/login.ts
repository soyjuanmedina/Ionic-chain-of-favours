import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { email: '', password: '' };
  idioms: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.auth.registerUser(this.user.email, this.user.password)
      .then((user) => {
        // El usuario se ha creado correctamente
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })

  }

  login() {
    this.auth.loginUser(this.user.email, this.user.password).then((user) => {
      console.log(user);
      this.navCtrl.push(HomePage);
    }
    )
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }

  setLanguage(lang) {
    this.translateService.use(lang);
  }

}
