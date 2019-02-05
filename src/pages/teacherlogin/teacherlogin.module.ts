import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherloginPage } from './teacherlogin';

@NgModule({
  declarations: [
    TeacherloginPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherloginPage),
  ],
  exports: [
    TeacherloginPage
  ]
})
export class TeacherloginPageModule {}
