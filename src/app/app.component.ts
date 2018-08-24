import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";

import { TranslateService } from "@ngx-translate/core";

import { LoginPage } from "../pages/login/login";
import { HomePage } from "../pages/home/home";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translateService: TranslateService,
    private auth: AuthProvider
  ) {
    // Idioma
    this.translateService.setDefaultLang("en");
    this.translateService.use("en");
    platform.ready().then(() => {
      if (localStorage.email) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      if (localStorage.language) {
        this.translateService.use(localStorage.language);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
