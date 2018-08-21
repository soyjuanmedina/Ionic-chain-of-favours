import { importExpr } from "@angular/compiler/src/output/output_ast";
import { Component } from "@angular/core";
import { NavController, IonicPage, NavParams } from "ionic-angular";

import { TranslateService } from "@ngx-translate/core";

import { AuthProvider } from "../../providers/auth/auth";

import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular";
declare var google: any;
declare var localStorage: any;

//Pages
import { AskingPage } from "../asking/asking";
import { FavourPage } from "../favour/favour";
import { GivingPage } from "../giving/giving";
import { LoginPage } from "../login/login";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user = {};
  myFavours = [];
  favoursInMyLocation = [];
  favoursWithoutLocation = [];
  favoursIllDo = [];
  allFavours = [];
  coords: any = { lat: 0, lng: 0 };
  address: string;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public translateService: TranslateService,
    public platform: Platform,
    private geolocation: Geolocation,
    private _DB: DatabaseProvider
  ) {
    platform.ready().then(() => {
      // La plataforma esta lista y ya tenemos acceso a los plugins.
      this.getLocation();
    });
  }

  getAllFavours(email) {
    this._DB
      .getDocuments("favours")
      .then(data => {
        let favours = [];
        data.forEach(function(documentSnapshot) {
          let favour = documentSnapshot.data();
          favour.id = documentSnapshot.id;
          favours.push(favour);
          //this.favores.push(favour);
        })
        this.allFavours = favours;
        
        this.myFavours = this.allFavours.filter(function (favour) {
          return favour.askedMail == localStorage.email;
        });
        this.favoursInMyLocation = this.allFavours.filter(function (favour) {
          return favour.location == localStorage.location && favour.doItUserId != localStorage.userId && favour.askedMail != localStorage.email;
        });
        this.favoursWithoutLocation = this.allFavours.filter(function (favour) {
          return favour.location == "" && favour.doItUserId != localStorage.userId && favour.askedMail != localStorage.email;
        });
        this.favoursIllDo = this.allFavours.filter(function (favour) {
          return favour.doItUserId == localStorage.userId;
        });

        console.log('todos', this.allFavours);
        console.log('mios', this.myFavours);
        console.log('aqui', this.favoursInMyLocation);
        console.log('sin location', this.favoursWithoutLocation);
        console.log('que hare', this.favoursIllDo);
      
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLocation(): any {
    this.geolocation
      .getCurrentPosition()
      .then(res => {
        this.coords.lat = res.coords.latitude;
        this.coords.lng = res.coords.longitude;
        this.getAddress(this.coords).then(res => {
          this.address = res[1]["formatted_address"];
          localStorage.setItem('location', this.address);
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

  setLanguage(lang) {
    this.translateService.use(lang);
  }

  goToPage(page) {
    this.navCtrl.push(page, this.coords);
  }

  closeSesion() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  showFavour(favour){
    this.navCtrl.push(FavourPage, { favour });
  }


  ionViewWillEnter() {
    console.log(this.address);
    if (localStorage) {
      this.user = localStorage;
      this.getAllFavours(localStorage.email);
    }
  }


}
