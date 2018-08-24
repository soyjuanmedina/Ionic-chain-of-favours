import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FavourPage } from "../favour/favour";

/**
 * Generated class for the ShowAllFavoursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-show-all-favours",
  templateUrl: "show-all-favours.html"
})
export class ShowAllFavoursPage {
  favoursArray = [];
  pageTitle = "";
  location = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.favoursArray = this.navParams.get("favoursArray");
    this.location = localStorage.location;
    if (this.favoursArray[0].askedMail == localStorage.email) {
      this.pageTitle = "LIST_OF_ALL_FAVOUR_YOU_ASK";
    }
    if (
      this.favoursArray[0].location == localStorage.location &&
      this.favoursArray[0].doItUserId != localStorage.userId &&
      this.favoursArray[0].askedMail != localStorage.email
    ) {
      this.pageTitle = "LIST_OF_ALL_FAVOUR_IN";
    }
    if (
      this.favoursArray[0].location == "" &&
      this.favoursArray[0].doItUserId != localStorage.userId &&
      this.favoursArray[0].askedMail != localStorage.email
    ) {
      this.pageTitle = "LIST_OF_ALL_FAVOUR_NO_LOCATION";
    }
    if (this.favoursArray[0].doItUserId == localStorage.userId) {
      this.pageTitle = "LIST_OF_ALL_FAVOUR_YOU_WILL_DO";
    }
    console.log(this.pageTitle);
  }

  showFavour(favour) {
    this.navCtrl.push(FavourPage, { favour });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShowAllFavoursPage");
  }
}
