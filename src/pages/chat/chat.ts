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
  favourId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _DB: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {

    this.favourId = this.navParams.get("favourId");

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._DB
      .getDocument("favours", this.favourId)
      .then(documentSnapshot => {
        var favour = documentSnapshot.data();
        for (var key in favour) {
          favour.key = favour[key];
        }
        this.favour = favour;
        console.log(this.favour);
        if (!this.favour.chatId) {
          let chat = {
            askedUser: {
              name: this.favour.askedName, id: this.favour.askedUserId
            },
            doItUser: {
              name: this.favour.doItUserName, id: this.favour.doItUserId
            },
            messages: []
          };
          this._DB
            .addDocument("chats", chat)
            .then(data => {
              this.favour.chatId = data.id;
              this.getChat(this.favour.chatId);
              this._DB
                .updateDocument("favours", this.favour.id, this.favour)
                .then(data => { })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.getChat(this.favour.chatId);
        }
      })
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();

  }

  getChat(chatId){
    console.log('getchat')
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this._DB
      .getDocument("chats", chatId)
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
    this.observingChat(this);
    
  }

  sendMessage() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let message = {
      date: Date.now(),
      message: this.message,
      user: { name: localStorage.name, id: localStorage.userId}
    };
    this.chat.messages.push(message);
    this._DB
      .updateDocument("chats", this.favour.chatId, this.chat)
      .then(data => {})
      .catch(error => {
        console.log(error);
      });
    loader.dismiss();
    if (this.content._scroll) this.content.scrollToBottom(0);
  }

  ionViewDidLoad() {
  }

  ngOnInit() {}

  observingChat(objectThis){
    
    if(objectThis.favour.chatId){
    this._DB._DB
      .collection("chats")
      .doc(objectThis.favour.chatId)
      .onSnapshot(function(doc) {
        objectThis.chat = doc.data();
        if (objectThis.content._scroll) objectThis.content.scrollToBottom(0);
      });    
    } 
  }

  ionViewDidEnter() {
    console.log(this.favour);
    this.content.scrollTo(100000, 1000000, 3000)
    
  }
}
