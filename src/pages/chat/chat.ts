import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { Content } from "ionic-angular";

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
  @ViewChild(Content)
  content: Content;
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
        })
        .catch(error => {
          console.log(error);
        });
      loader.dismiss();
    }
  }

  sendMessage() {
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
    this.content.scrollToBottom();
  }

  ionViewDidLoad() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this._DB._DB
      .collection("chats")
      .doc(this.favour.chatId)
      .onSnapshot(function(doc) {
        this.chat = doc.data();
        console.log(this.chat);
      });
    this.content.scrollToBottom();
  }
}
