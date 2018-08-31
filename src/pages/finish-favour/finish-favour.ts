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
  }

  valorateFavour() {
    //Actualizamos el favor y lo cerramos
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.favour.status = "3-Finished";
    this.favour.finishedDate = Date.now();
    this._DB
      .updateDocument("favours", this.favour.id, this.favour)
      .then(data => {})
      .catch(error => {
        console.log(error);
      });

    //Actualizamos el usuario con su valoración
    let assessment: any = {};
    this.thanksForm.rate ? assessment.rate = this.thanksForm.rate : assessment.rate = "";
    this.thanksForm.comments ? assessment.comments = this.thanksForm.comments : assessment.comments = "";
    assessment.date = Date.now();
    this.doItUser.assessments ? this.doItUser.assessments.push(assessment) :  this.doItUser.assessments = [ assessment ];
    this.doItUser.averageRate ? this.doItUser.averageRate = (this.doItUser.averageRate + this.thanksForm.rate) / 2 :  this.doItUser.averageRate = this.thanksForm.rate;
    
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
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }
}
