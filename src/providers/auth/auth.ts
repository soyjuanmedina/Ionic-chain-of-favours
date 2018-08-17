import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user;

  constructor(private afAuth: AngularFireAuth,
    private _DB: DatabaseProvider) {
    console.log('Hello AuthProvider Provider');
  }

  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        this._DB.addDocument('users',
          {
            email
          })
          .then((data) => {
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(err => Promise.reject(err))
  }

  loginUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        Promise.resolve(this.user = user);
        window.localStorage.setItem("email", email);
        this._DB.getDocumentByQuery('users', 'email', email)
          .then((data) => {
            for (var key in data) {
              window.localStorage.setItem(key, data[key]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(err => Promise.reject(err))
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      window.localStorage.clear();
    })
  }

  get Session() {
    return this.afAuth.authState;
  }
  
  getUser() {
    return this.afAuth.auth.currentUser.uid;
  }

}
