import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { DatabaseProvider } from "../database/database";
import firebase from "firebase";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "angularfire2/firestore";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user;

  constructor(
    private afAuth: AngularFireAuth,
    private _DB: DatabaseProvider,
    private afs: AngularFirestore
  ) {}

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

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      console.log(credential);
      Promise.resolve((this.user = credential));
      this._DB
        .getDocumentsByQuery("users", "uid", "==", credential.user.uid)
        .then(data => {
          if (data.size > 0) {
            data.forEach(function(documentSnapshot) {
              localStorage.setItem("userId", documentSnapshot.id);
              var document = documentSnapshot.data();
              for (var key in document) {
                localStorage.setItem(key, document[key]);
              }
            });
          } else {
            this.updateUserData(credential.user);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  updateUserData(user) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    if (user.displayName) {
      var name = user.displayName
        .split(" ")
        .slice(0, -1)
        .join(" ");
      var surname = user.displayName
        .split(" ")
        .slice(-1)
        .join(" ");
    } else {
      name = "";
      surname = "";
    }
    const data: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      name: name,
      surname: surname,
      photoURL: user.photoURL
    };

    this._DB
      .getDocumentsByQuery("users", "uid", "==", user.uid)
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

    return userRef.set(data, { merge: true });
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
}
