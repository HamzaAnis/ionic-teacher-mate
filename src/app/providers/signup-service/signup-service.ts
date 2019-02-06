import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import {
  AngularFirestore,
  // AngularFirestoreCollection,
  AngularFirestoreDocument,
  // AngularFirestoreDocument
} from "angularfire2/firestore";
import { LoaderserviceProvider } from '../loaderservice/loaderservice';

/*
  Generated class for the SignupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupServiceProvider {
  parentDoc: AngularFirestoreDocument<any>;
  constructor(public afs: AngularFirestore, public loaderservice: LoaderserviceProvider) {
    console.log('Hello SignupServiceProvider Provider');

  }

  parentsignup(parentemail: string, parentname: string) {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loaderservice.loading = this.loaderservice.loadingCtrl.create({

          content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"> Creating Account </div>
          </div>`,

        });
        this.loaderservice.loading.present().then(res => {
          this.parentDoc = this.afs.doc('/parentclassroom/' + parentemail);
          this.parentDoc.ref.get().then(
            res => {
              if (res.exists) {
                this.loaderservice.loading.dismiss();
                resolve('done');
              } else {
                this.afs.doc('/parentclassroom/' + parentemail).set({
                  classroom: '',
                  parentname: ''
                }).then(res => {
                  this.loaderservice.loading.dismiss();
                  resolve('done');
                }).catch(error => {
                  this.loaderservice.loading.dismiss();
                  reject(error);
                });

              }
            }).catch(err => {
              this.afs.doc('/parentclassroom/' + parentemail).set({
                classroom: ''
              }).then(res => {
                this.loaderservice.loading.dismiss();
                resolve('done');
              }).catch(error => {
                this.loaderservice.loading.dismiss();
                reject(error);
              });

            })

        });

      }, 1000);
    });
    return promise;
  }

}


