import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ShowAllFavoursPage } from "./show-all-favours";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ShowAllFavoursPage],
  imports: [
    IonicPageModule.forChild(ShowAllFavoursPage),
    TranslateModule.forChild()
  ]
})
export class ShowAllFavoursPageModule {}
