import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GivingPage } from './giving';

@NgModule({
  declarations: [
    GivingPage,
  ],
  imports: [
    IonicPageModule.forChild(GivingPage),
  ],
})
export class GivingPageModule {}
