import { Component } from "@angular/core";
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
export class ChatPage {
  favour;

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
      this._DB
        .addDocument("chats", {
          askedName: this.favour.askedName,
          helperName: this.favour.doItUserName,
          messages: []
        })
        .then(data => {
          console.log(data.id);
          this.favour.chatId = data.id;
          this._DB
            .updateDocument("favours", this.favour.id, this.favour)
            .then(data => {
              console.log(data);
              this.favour = data;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
      loader.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatPage");
  }
}
