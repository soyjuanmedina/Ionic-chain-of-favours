import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favour',
  templateUrl: 'favour.html',
})
export class FavourPage {
  favour; 

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
      console.log(navParams);
      this.favour = this.navParams.get('favour');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavourPage');
  }

}
