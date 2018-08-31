import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Geolocation } from "@ionic-native/geolocation";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";

import { MyApp } from "./app.component";

// Pages
import { AuthProvider } from "../providers/auth/auth";
import { LoginPage } from "../pages/login/login";
import { HomePage } from "../pages/home/home";
import { FavourPage } from "../pages/favour/favour";
import { UserProfilePage } from "../pages/user-profile/user-profile";
import { ChatPage } from "../pages/chat/chat";
import { FinishFavourPage } from "../pages/finish-favour/finish-favour";

//Providers
import { DatabaseProvider } from "../providers/database/database";

// Import ionic2-rating module
import { Ionic2RatingModule } from "ionic2-rating";

import { AskingPageModule } from "../pages/asking/asking.module";
import { ShowAllFavoursPageModule } from "../pages/show-all-favours/show-all-favours.module";
import { CreateAccountPageModule } from "../pages/create-account/create-account.module";

export const firebaseConfig = {
  apiKey: "AIzaSyDCq-ijTJjzSG639LBOFdDF3bxXXYJ4h3k",
  authDomain: "chain-of-favours.firebaseapp.com",
  databaseURL: "https://chain-of-favours.firebaseio.com",
  projectId: "chain-of-favours",
  storageBucket: "chain-of-favours.appspot.com",
  messagingSenderId: "168240510778"
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    FavourPage,
    ChatPage,
    UserProfilePage,
    FinishFavourPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    CreateAccountPageModule,
    AskingPageModule,
    ShowAllFavoursPageModule,
    AngularFireAuthModule,
    Ionic2RatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    FavourPage,
    ChatPage,
    UserProfilePage,
    FinishFavourPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DatabaseProvider,
    Geolocation
  ]
})
export class AppModule {}
