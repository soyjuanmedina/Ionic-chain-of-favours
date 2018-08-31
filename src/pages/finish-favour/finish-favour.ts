import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { FormBuilder } from "@angular/forms";

import { LoadingController } from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { HomePage } from "../home/home";

/**
 * Generated class for the FinishFavourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-finish-favour",
  templateUrl: "finish-favour.html"
})
export class FinishFavourPage {
  thanksForm: any;
  favour;
  doItUser;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private _DB: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {
    this.thanksForm = this.formBuilder.group({
      comments: [""],
      rate: [""]
    });

    this.favour = this.navParams.data.favour;
    console.log(this.favour);
  }

  valorateFavour() {
    //Actualizamos el favor y lo cerramos
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.favour.status = "Finished";
    console.log(this.favour.id);
    this._DB
      .updateDocument("favours", this.favour.id, this.favour)
      .then(data => {})
      .catch(error => {
        console.log(error);
      });

    //Actualizamos el usuario con su valoración
    if (this.thanksForm.rate) {
      this.doItUser.rate.push(this.thanksForm.rate);
    }
    if (this.thanksForm.comments) {
      this.doItUser.comments.push(this.thanksForm.comments);
    }
    this._DB
      .updateDocument("users", this.favour.doItUserId, this.doItUser)
      .then(data => {
        const alert = this.alertCtrl.create({
          title: "Thanks for your valoration",
          subTitle: "Your opinion helps to other users",
          buttons: ["OK"]
        });
        alert.present();
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._DB
      .getDocument("users", this.favour.doItUserId)
      .then(documentSnapshot => {
        var doItUser = documentSnapshot.data();
        for (var key in doItUser) {
          doItUser.key = doItUser[key];
        }
        this.doItUser = doItUser;
        console.log(this.doItUser);
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }
}
