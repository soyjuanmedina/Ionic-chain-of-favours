import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as _ from 'lodash';

import { DatabaseProvider } from "../../providers/database/database";
declare var localStorage: any;

import { ChatPage } from "../chat/chat";

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
  illGoToDoIt: boolean = false;
  editing: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider,
    public alertCtrl: AlertController) {
      this.favour = this.navParams.get('favour');
      this.uneditedFavour = _.clone(this.favour);
      if(localStorage.userId == this.favour.askedUserId || localStorage.email == this.favour.askedMail){
        this.itsMine = true;
      }
      if(localStorage.userId == this.favour.doItUserId){
        this.illGoToDoIt = true;
      }
  }

  editFavour(){
    this.editing = true;
    console.log(this.favour);
  }

  chat(){
    this.navCtrl.push(ChatPage);
  }

  doFavour(){
    this.favour.status = 'In progress';
    this.favour.doItUserId = localStorage.userId;
    this._DB.updateDocument("favours", this.favour.id, this.favour)
    .then(data => {
      const alert = this.alertCtrl.create({
        title: 'Thanks for your help',
        subTitle: 'Now you can chat with the asked user to concretate',
        buttons: ['OK']
      });
      alert.present();
      this.illGoToDoIt = true;
      })
      .catch(error => {
        console.log(error);
      }); 
  }

  dontDoIt(){
    this.favour.status = 'asked';
    this.favour.doItUserId = "";
    this._DB.updateDocument("favours", this.favour.id, this.favour)
    .then(data => {
      const alert = this.alertCtrl.create({
        title: 'Tnaks',
        subTitle: 'Maybe you can do other favor',
        buttons: ['OK']
      });
      alert.present();
      this.illGoToDoIt = false;
      })
      .catch(error => {
        console.log(error);
      });
  }

  cancelEdition(){
    this.favour = this.uneditedFavour;
    this.editing = false;
  }

  deleteFavour(){
    this._DB.deleteDocument("favours", this.favour.id)
    .then(data => {
      this.navCtrl.pop();
      })
      .catch(error => {
        console.log(error);
      }); 
  }

  updateFavour(){
    this.editing = false;
    this._DB.updateDocument("favours", this.favour.id, this.favour)
    .then(data => {
      const alert = this.alertCtrl.create({
        title: 'Correct update',
        subTitle: 'Your favour have been updated',
        buttons: ['OK']
      });
      alert.present();
      })
      .catch(error => {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log(this.favour);
  }

}
