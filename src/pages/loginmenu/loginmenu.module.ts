import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginmenuPage } from './loginmenu';

@NgModule({
  declarations: [
    LoginmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginmenuPage),
  ],
  exports: [
    LoginmenuPage
  ]
})
export class LoginmenuPageModule {}
