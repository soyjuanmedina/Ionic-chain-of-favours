import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";

import { LoadingController } from "ionic-angular";

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-create-account",
  templateUrl: "create-account.html"
})
export class CreateAccountPage {
  userForm: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {
    this.userForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: [""],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ionViewDidLoad() {}

  signin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.auth
      .registerUser(this.userForm.value)
      .then(user => {
        let alert = this.alertCtrl.create({
          title: "Account create",
          subTitle:
            "Your account has been sucessfully create. Now you can login",
          buttons: [
            {
              text: "Acept",
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err.message,
          buttons: ["Acept"]
        });
        alert.present();
      });
    loader.dismiss();
  }
}
