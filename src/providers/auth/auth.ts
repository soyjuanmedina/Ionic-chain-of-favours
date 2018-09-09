import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { DatabaseProvider } from "../database/database";
import firebase from "firebase";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user;

  constructor(private afAuth: AngularFireAuth, private _DB: DatabaseProvider) {}

  registerUser(data) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        delete data.password;
        data.assessments = [];
        data.averageRate = "";
        this._DB
          .addDocument("users", data)
          .then(data => {})
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => Promise.reject(err));
  }

  loginUser(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        Promise.resolve((this.user = user));
        this._DB
          .getDocumentsByQuery("users", "email", "==", email)
          .then(data => {
            data.forEach(function(documentSnapshot) {
              localStorage.setItem("userId", documentSnapshot.id);
              var document = documentSnapshot.data();
              for (var key in document) {
                localStorage.setItem(key, document[key]);
              }
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => Promise.reject(err));
  }

  loginWithGoggle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log("auth.loginWithGoggle");
    return this.socialSignIn(provider);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      window.localStorage.clear();
    });
  }

  get Session() {
    return this.afAuth.authState;
  }

  getUser() {
    return this.afAuth.auth.currentUser.uid;
  }

  socialSignIn(provider) {
    console.log("socialSignIn");
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.user = credential.user;
        // this.updateUserData()
      })
      .catch(error => console.log(error));
  }
}
