import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTeacherModalPage } from './login-teacher-modal';

@NgModule({
  declarations: [
    LoginTeacherModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTeacherModalPage),
  ],
})
export class LoginTeacherModalPageModule {}
