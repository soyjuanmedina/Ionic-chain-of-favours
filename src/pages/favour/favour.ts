import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { DatabaseProvider } from "../../providers/database/database";
declare var localStorage: any;

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
  uneditedFavour;
  itsMine: boolean = false;
  editing: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider) {
      this.favour = this.navParams.get('favour');
      this.uneditedFavour = _.clone(this.favour);
      if(localStorage.userId == this.favour.askedUserId || localStorage.email == this.favour.askedMail){
        this.itsMine = true;
      }
  }

  editFavour(){
    this.editing = true;
    console.log(this.favour);
  }

  cancelEdition(){
    this.favour = this.uneditedFavour;
    this.editing = false;
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

  updateFavour(){
    console.log(this.favour);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavourPage');
  }

}
