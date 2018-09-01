import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoadingController } from "ionic-angular";

//Providers
import { DatabaseProvider } from "../../providers/database/database";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html"
})
export class ChatPage implements OnInit {
  favour;
  chat;
  message = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {
    this.favour = this.navParams.get("favour");
    console.log(this.favour);
    if (!this.favour.chatId) {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      let chat = {
        askedName: this.favour.askedName,
        helperName: this.favour.doItUserName,
        messages: []
      };
      this._DB
        .addDocument("chats", chat)
        .then(data => {
          this.favour.chatId = data.id;
          this._DB
            .updateDocument("favours", this.favour.id, this.favour)
            .then(data => {})
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
      loader.dismiss();
    } else {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this._DB
        .getDocument("chats", this.favour.chatId)
        .then(documentSnapshot => {
          var chat = documentSnapshot.data();
          for (var key in chat) {
            chat.key = chat[key];
          }
          delete chat.key;
          this.chat = chat;
          console.log(this.chat);
        })
        .catch(error => {
          console.log(error);
        });
      loader.dismiss();
    }
  }

  sendMessage() {
    console.log(this.message);
    console.log(localStorage);
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let message = {
      date: Date.now(),
      message: this.message,
      user: localStorage.name
    };
    this.chat.messages.push(message);
    this._DB
      .updateDocument("chats", this.favour.chatId, this.chat)
      .then(data => {})
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatPage");
  }

  ngOnInit() {
    this.chat = this._DB.subscribeObservable("chats", this.favour.chatId);
  }
}
