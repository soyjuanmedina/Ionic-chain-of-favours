import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare var google: any; 

import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AskingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asking',
  templateUrl: 'asking.html',
})
export class AskingPage {

  coords: any = { lat: 0, lng: 0 };
  address: string;
  place: string;
  private todo : any;

  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    public platform: Platform,
    private geolocation: Geolocation) {

    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      expiration: false,
      expirationDate: [''],
      expirationHour: [''],
      tip: false,
      tipAmount: [''],
      goToSomewhere: false,
      placeToGo: [''],
    });


    platform.ready().then(() => {
      // La plataforma esta lista y ya tenemos acceso a los plugins.
      this.getLocation();
    });

  }


  setCurrentPosition(){
    console.log(this.address);
    this.todo.placeToGo = this.address;
    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/location-mark.png',
      map: this.map,
      position: this.coords
    });
  }

  askAFavour(){
    console.log('pidiendo favor');
  }

  getLocation(): any {
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;
      this.getAddress(this.coords).then(res => {
        this.address = res[0]['formatted_address']})
      this.loadMap();
    })
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  getAddress(coords): any {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function (resolve, reject) {
      geocoder.geocode({ 'location': coords }, function (results, status) { // llamado asincronamente
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  loadMap() {
    let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 12
    });
  }

  ionViewDidLoad() {

  }

  

}
