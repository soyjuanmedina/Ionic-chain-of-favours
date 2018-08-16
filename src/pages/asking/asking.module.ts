import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskingPage } from './asking';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AskingPage,
  ],
  imports: [
    IonicPageModule.forChild(AskingPage),
    // TranslateModule.forChild() 
  ],
})
export class AskingPageModule {}
