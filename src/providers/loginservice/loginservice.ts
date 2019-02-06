
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {
  AngularFirestore,
 AngularFirestoreCollection,
 // AngularFirestoreDocument
} from "angularfire2/firestore";
import { LoaderserviceProvider } from '../../providers/loaderservice/loaderservice';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {
  teacherDoc:  AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private loader: LoaderserviceProvider, private afauth:AngularFireAuth) {
    this.teacherDoc = this.afs.collection<any>('/classroom', ref=> {
      return ref.orderBy("email");
    });
    console.log('Hello LoginserviceProvider Provider');
     
   
   
  }
 findteacher(tcredts){
   let found = false;
    this.loader.presentLoadingDefault('');
    this.afauth.auth.signInWithEmailAndPassword(tcredts.email,tcredts.password).then(res=> {

      
    });
   
  }

 addteacherlogin(tcredts){
 console.log('teacher added');
  
  let id = this.afs.createId();
  console.log(id);
  return new Promise((resolve, reject) => {
    this.afs.collection('/classroom').doc(id).set({
      email: tcredts.email,
      classrooms: '',
      parents: '',
      name: ''
    }).then(res=> {
      console.log(res);
      resolve('done')}).catch(err=>{
      console.log('error' , err);
      reject('error')});
  });
  
 }

}
