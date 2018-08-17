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
            window.localStorage.setItem("UserID", data.id);
            window.localStorage.setItem("email", email);
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
        window.localStorage.setItem("userUid", this.user.user.uid);
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
