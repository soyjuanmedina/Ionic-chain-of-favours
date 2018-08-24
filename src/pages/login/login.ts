import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

import { TranslateService } from "@ngx-translate/core";
import { HomePage } from "../home/home";
import { CreateAccountPage } from "../create-account/create-account";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = { email: "", password: "" };
  idioms: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public translateService: TranslateService
  ) {
    this.idioms = [
      {
        value: "es",
        label: "SPANISH"
      },
      {
        value: "en",
        label: "ENGLISH"
      }
    ];
  }

  ionViewDidLoad() {}

  createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }

  login() {
    // todo almaceno el mail aunque este mal
    localStorage.setItem("email", this.user.email);
    this.auth
      .loginUser(this.user.email, this.user.password)
      .then(user => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err.message,
          buttons: ["Aceptar"]
        });
        alert.present();
      });
  }

  setLanguage(lang) {
    this.translateService.use(lang);
    localStorage.setItem("language", lang);
  }
}
