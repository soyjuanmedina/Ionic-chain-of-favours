import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import * as _ from "lodash";

import { DatabaseProvider } from "../../providers/database/database";
declare var localStorage: any;

import { ChatPage } from "../chat/chat";
import { FinishFavourPage } from "../finish-favour/finish-favour";

import { LoadingController } from "ionic-angular";
import { UserProfilePage } from "../user-profile/user-profile";

/**
 * Generated class for the FavourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-favour",
  templateUrl: "favour.html"
})
export class FavourPage {
  favour;
  uneditedFavour;
  itsMine: boolean = false;
  illGoToDoIt: boolean = false;
  editing: boolean = false;
  favourId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    if (this.navParams.get("favourId")) {
      this.favourId = this.navParams.get("favourId");
      this.loadFavour(this.favourId);
    } else {
      this.favour = this.navParams.get("favour");
      this.uneditedFavour = _.clone(this.favour);
      if (
        localStorage.userId == this.favour.askedUserId ||
        localStorage.email == this.favour.askedMail
      ) {
        this.itsMine = true;
      }
      if (localStorage.userId == this.favour.doItUserId) {
        this.illGoToDoIt = true;
      }
    }
  }

  editFavour() {
    this.editing = true;
  }

  chat() {
    this.navCtrl.push(ChatPage);
  }

  doFavour() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.favour.status = "2-Progress";
    this.favour.doItUserId = localStorage.userId;
    this.favour.doItUserName = localStorage.name;
    this._DB
      .updateDocument("favours", this.favour.id, this.favour)
      .then(data => {
        const alert = this.alertCtrl.create({
          title: "Thanks for your help",
          subTitle: "Now you can chat with the asked user to concretate",
          buttons: ["OK"]
        });
        alert.present();
        this.illGoToDoIt = true;
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  dontDoIt() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.favour.status = "1-Asked";
    this.favour.doItUserId = "";
    this._DB
      .updateDocument("favours", this.favour.id, this.favour)
      .then(data => {
        const alert = this.alertCtrl.create({
          title: "Tnaks",
          subTitle: "Maybe you can do other favor",
          buttons: ["OK"]
        });
        alert.present();
        this.illGoToDoIt = false;
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  declineOffer() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.favour.status = "1-Asked";
    this.favour.doItUserId = "";
    this.favour.doItUserName = "";
    this._DB
      .updateDocument("favours", this.favour.id, this.favour)
      .then(data => {
        const alert = this.alertCtrl.create({
          title: "Ok",
          subTitle: "Maybe other user can help you",
          buttons: ["OK"]
        });
        alert.present();
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  finishFavour() {
    let favour = this.favour;
    this.navCtrl.push(FinishFavourPage, { favour });
  }

  cancelEdition() {
    this.favour = this.uneditedFavour;
    this.editing = false;
  }

  deleteFavour() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._DB
      .deleteDocument("favours", this.favour.id)
      .then(data => {
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  updateFavour() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.editing = false;
    this._DB
      .updateDocument("favours", this.favour.id, this.favour)
      .then(data => {
        const alert = this.alertCtrl.create({
          title: "Correct update",
          subTitle: "Your favour have been updated",
          buttons: ["OK"]
        });
        alert.present();
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  viewProfile(userId) {
    this.navCtrl.push(UserProfilePage, { userId });
  }

  loadFavour(favourId) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._DB
      .getDocument("favours", favourId)
      .then(documentSnapshot => {
        var favour = documentSnapshot.data();
        for (var key in favour) {
          favour.key = favour[key];
        }
        this.favour = favour;
        console.log(this.favour);
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  ionViewDidLoad() {}
}
