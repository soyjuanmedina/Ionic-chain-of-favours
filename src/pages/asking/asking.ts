import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  private todo : FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder) {
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

  setCurrentPosition(){
    this.todo.placeToGo = this.address;
  }

  askAFavour(){
    console.log(this.todo.value);
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
