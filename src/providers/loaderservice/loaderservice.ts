// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the LoaderserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderserviceProvider {
  loading ; 
  constructor(public loadingCtrl: LoadingController) {
    this.loading =  this.loadingCtrl.create({
      content: ''
    });
    console.log('in constructor ');
  }
  
  presentLoadingDefault(message: string) {
    
    this.loading =  this.loadingCtrl.create({
      content: 'loading'
    });

     this.loading.present();
  
    //  setTimeout(() => {
    //    this.loading.dismiss();
    // }, 500);
  }
  
  dismissloading(){
    console.log('dismissed');
    this.loading.dismiss();
  }
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
    });
  
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();
  }
}
