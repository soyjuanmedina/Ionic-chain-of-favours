import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  favoursArray;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.favoursArray = this.navParams.get("favoursArray");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShowAllFavoursPage");
  }
}
