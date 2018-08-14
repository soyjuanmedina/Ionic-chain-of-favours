import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { AuthProvider } from '../../providers/auth/auth';

import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

//Pages
import { AskingPage } from '../asking/asking';
import { GivingPage } from '../giving/giving';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  coords: any = { lat: 0, lng: 0 };

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public translateService: TranslateService,
    public platform: Platform,
    private geolocation: Geolocation) {

    platform.ready().then(() => {
      // La plataforma esta lista y ya tenemos acceso a los plugins.
      this.getLocation();
    });
    
  }

  setLanguage(lang) {
    this.translateService.use(lang);
  }

  goToPage(page){
    this.navCtrl.push(page, this.coords);
  }

  closeSesion(){
    this.auth.logout();
  }

  getLocation(): any {
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;

      this.loadMap();
    })
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  loadMap() {
    let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 12
    });
    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/location-mark.png',
      map: this.map,
      position: this.coords
    });
  }

}
