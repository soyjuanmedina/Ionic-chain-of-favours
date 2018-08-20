import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
declare var google: any;

import { DatabaseProvider } from "../../providers/database/database";

/**
 * Generated class for the AskingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-asking",
  templateUrl: "asking.html"
})
export class AskingPage {
  coords: any = { lat: 0, lng: 0 };
  location: string;
  place: string;
  todo: any;

  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private _DB: DatabaseProvider
  ) {
    this.todo = this.formBuilder.group({
      title: ["", Validators.required],
      description: [""],
      expiration: false,
      expirationDate: [""],
      expirationHour: [""],
      tip: false,
      tipAmount: [""],
      goToSomewhere: false,
      location: [""]
    });

  }

  setMyLocation() {
    this.todo.location = this.location;
    
  }

  askAFavour() {
    let askedMail = localStorage.email ? localStorage.email : "";
    let askedUserId = localStorage.userId ? localStorage.userId : "";

    let placeToGo =
      typeof this.todo.value.placeToGo === "undefined"
        ? ""
        : this.todo.value.placeToGo;

    this._DB
      .addDocument("favours", {
        title: this.todo.value.title,
        description: this.todo.value.description,
        expiration: this.todo.value.expiration,
        expirationDate: this.todo.value.expirationDate,
        expirationHour: this.todo.value.expirationHour,
        tip: this.todo.value.tip,
        tipAmount: this.todo.value.tipAmount,
        goToSomewhere: this.todo.value.goToSomewhere,
        location: this.todo.value.location,
        askedMail: askedMail,
        askedUserId: askedUserId
      })
      .then(data => {
        this.navCtrl.pop();
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

  loadMap() {
    let mapContainer = document.getElementById("map");
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 12
    });
  }

  ionViewDidLoad() {
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
    this.getAddress(this.coords).then(res => {
      this.location = res[1]["formatted_address"];
      this.todo.location = this.location;
      let miMarker = new google.maps.Marker({
        icon: "assets/imgs/location-mark.png",
        map: this.map,
        position: this.coords
      });
    });
    this.loadMap();
  }
}
