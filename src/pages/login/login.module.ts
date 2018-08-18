import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { CreateAccountPageModule } from '../create-account/create-account.module'

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    CreateAccountPageModule
  ],
})
export class LoginPageModule {}
