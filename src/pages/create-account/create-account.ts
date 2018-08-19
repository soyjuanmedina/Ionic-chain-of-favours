import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular";
declare var google: any;

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  userForm : any;
  coords: any = { lat: 0, lng: 0 };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    private geolocation: Geolocation,
    private formBuilder: FormBuilder) {
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        surname: [''],
        favoriteLocation: [''],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });

      platform.ready().then(() => {
        // La plataforma esta lista y ya tenemos acceso a los plugins.
        this.getLocation();
      });
  }

  ionViewDidLoad() {
  }

  signin() {
    this.auth.registerUser(this.userForm.value)
      .then((user) => {
        let alert = this.alertCtrl.create({
          title: 'Account create',
          subTitle: 'Your account has been sucessfully create. Now you can login',
          buttons: [
            {
              text: 'Acept',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
        });
        alert.present();
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Acept']
        });
        alert.present();
      })
  }

  getLocation(): any {
    this.geolocation
      .getCurrentPosition()
      .then(res => {
        this.coords.lat = res.coords.latitude;
        this.coords.lng = res.coords.longitude;
        this.getAddress(this.coords).then(res => {
          this.userForm.favoriteLocation = res[1]["formatted_address"];
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAddress(coords): any {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ location: coords }, function(results, status) {
        // llamado asincronamente
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

}
