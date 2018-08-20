import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from "../../providers/database/database";

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
  itsMine: boolean = false;
  editing: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider) {
      console.log(navParams);
      this.favour = this.navParams.get('favour');
      if(localStorage.userId == this.favour.askedUserId || localStorage.email == this.favour.askedMail){
        this.itsMine = true;
      }
  }

  editFavour(){
    console.log(this.editing);
    this.editing = true;
    console.log(this.editing);
  }

  deleteFavour(){
    this._DB.deleteDocument("favours", this.favour.id)
    .then(data => {
      console.log('eliminado');
      this.navCtrl.pop();
      })
      .catch(error => {
        console.log(error);
      });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavourPage');
  }

}
