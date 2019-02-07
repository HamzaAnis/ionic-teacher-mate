import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupModalPage } from './signup-modal';

@NgModule({
  declarations: [
    SignupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupModalPage),
  ],
})
export class SignupModalPageModule {}
