import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";

import { LoadingController } from "ionic-angular";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  userId;
  user = {};
  itsMine: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {
    this.userId = this.navParams.get("userId");
    if (localStorage.userId == this.userId) {
      this.itsMine = true;
    }
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._DB
      .getDocument("users", this.userId)
      .then(documentSnapshot => {
        var user = documentSnapshot.data();
        for (var key in user) {
          user.key = user[key];
        }
        this.user = user;
        console.log(this.user);
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserProfilePage");
  }
}
