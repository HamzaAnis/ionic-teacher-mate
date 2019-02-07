import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider {

  teachers: AngularFirestoreCollection<any>; 

  constructor(public afauth:AngularFireAuth, public afs: AngularFirestore) {

    this.teachers =  this.afs.collection('parents', ref=> {
      return ref.where('classroom','array-contains', '');
    });
    
    console.log('Hello ChatServiceProvider Provider');
  }

}
