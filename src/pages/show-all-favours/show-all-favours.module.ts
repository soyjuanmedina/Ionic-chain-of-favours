import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowAllFavoursPage } from './show-all-favours';

@NgModule({
  declarations: [
    ShowAllFavoursPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowAllFavoursPage),
  ],
})
export class ShowAllFavoursPageModule {}
