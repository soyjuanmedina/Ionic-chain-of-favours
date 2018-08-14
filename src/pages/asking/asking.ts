import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any; 

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
  title: string;
  description: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  askAFavour(){
    console.log('pidiendo favor');
  }

  ionViewDidLoad() {
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
    this.getAddress(this.coords).then(results => {
      this.address = results[0]['formatted_address'];
      this.place = results[0]['address_components'][2]['long_name'];
      
    }, errStatus => {
      // Aquí iría el código para manejar el error
    });
  }

  

}
