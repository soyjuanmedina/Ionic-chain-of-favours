import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskingPage } from './asking';

@NgModule({
  declarations: [
    AskingPage,
  ],
  imports: [
    IonicPageModule.forChild(AskingPage),
  ],
})
export class AskingPageModule {}
