// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/take';
import {
  AngularFirestore,
  AngularFirestoreCollection
  // AngularFirestoreDocument
} from "angularfire2/firestore";
import { LoaderserviceProvider } from '../loaderservice/loaderservice';
/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {

  classroomdoc: AngularFirestoreCollection<any>;


  homeclass: Array<any> = [];
  home: Array<any> = [];
  teacherclassroom: Array<any> = [];

  classfound: boolean = false;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public loaderservice: LoaderserviceProvider, public alertCtrl: AlertController) {

    // this.loaderservice.loading =  this.loaderservice.loadingCtrl.create({
    //   content: 'loading'
    // });
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user != undefined) {
        this.teacherclassroom = [];
        this.classroomdoc = this.afs.collection('classroom'
          , ref => {
            return ref.where("teacheremail", "==", user.email); //.orderBy("teacheremail");
          });
        // console.log('in user');
        this.classroomdoc.valueChanges().subscribe(snap => {

          snap.forEach(snapshot => {
            console.log(snapshot);
            this.classfound = true;

            this.teacherclassroom.push(snapshot);
          });
        });
      }
    });
  }
  presentAlert(alerttitle, alertsub) {
    let alert = this.alertCtrl.create({
      title: alerttitle,
      subTitle: alertsub,
      buttons: ['OK']
    });
    alert.present();

  }

  addclassroom(teacherclass) {

    return new Promise((resolve, reject) => {
      let id = this.afs.createId();



      this.afs.collection('classroom').doc(id).set({
        teacheremail: teacherclass.email,
        classname: teacherclass.classname,
        section: teacherclass.section,
        subject: teacherclass.subject
      }).then(res => {
        resolve('done');

      }).catch(err => {
        console.log(err);

        reject('error');
      });

    });

  }

}
