import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FavourPage } from "./favour";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [FavourPage],
  imports: [IonicPageModule.forChild(FavourPage), TranslateModule.forChild()]
})
export class FavourPageModule {}
