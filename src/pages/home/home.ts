import { importExpr } from "@angular/compiler/src/output/output_ast";
import { Component } from "@angular/core";
import { NavController, IonicPage, NavParams } from "ionic-angular";

import { TranslateService } from "@ngx-translate/core";

import { AuthProvider } from "../../providers/auth/auth";

//Pages
import { AskingPage } from "../asking/asking";
import { GivingPage } from "../giving/giving";
import { LoginPage } from "../login/login";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user = {};
  myFavours = [];
  favoursToDo = [];
  allFavours = [];

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public translateService: TranslateService,
    private _DB: DatabaseProvider
  ) {
    if (localStorage) {
      this.user = localStorage;
      this.getAllFavours(localStorage.email);
    }
  }

  getAllFavours(email) {
    this._DB
      .getDocuments("favours")
      .then(data => {
        let favours = [];
        data.forEach(function(documentSnapshot) {
          let favour = documentSnapshot.data();
          favour.id = documentSnapshot.id;
          favours.push(favour);
          console.log(favour);
          //this.favores.push(favour);
        })
        this.allFavours = favours;
        this.myFavours = this.allFavours.filter(function (favour) {
          console.log(favour)
          return favour.askedMail == localStorage.email;
        });
        ;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMyFavours(email) {
    this._DB
      .getDocumentsByQuery("favours", "askedMail", "==", email)
      .then(data => {
        let favours = [];
        data.forEach(function(documentSnapshot) {
          let favour = documentSnapshot.data();
          favour.id = documentSnapshot.id;
          favours.push(favour);
          console.log(favour);
          //this.favores.push(favour);
        })
        this.myFavours = favours;
        ;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFavoursToDo(email) {
    this._DB
      .getDocumentsByQuery("favours", "askedMail", "!=", email)
      .then(data => {
        let favours = [];
        data.forEach(function(documentSnapshot) {
          let favour = documentSnapshot.data();
          favour.id = documentSnapshot.id;
          favours.push(favour);
          console.log(favour);
          //this.favores.push(favour);
        })
        this.favoursToDo = favours;
        ;
      })
      .catch(error => {
        console.log(error);
      });
  }

  setLanguage(lang) {
    this.translateService.use(lang);
  }

  goToPage(page) {
    this.navCtrl.push(page);
  }

  closeSesion() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
