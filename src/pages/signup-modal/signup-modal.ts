import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoaderserviceProvider } from '../../providers/loaderservice/loaderservice';
/**
 * Generated class for the SignupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-modal',
  templateUrl: 'signup-modal.html',
})
export class SignupModalPage {

  person: string = '';
  constructor(public loaderservice:LoaderserviceProvider, public alertCtrl :AlertController, public afauth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.person = this.navParams.get('person');

  }
  
  name: string = '';
  password: string = '';
  email: string = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupModalPage');
  }
  presentAlert(alerttitle, alertsub) {
    let alert = this.alertCtrl.create({
      title: alerttitle,
      subTitle: alertsub,
      buttons: ['OK']
    });
    alert.present();

  }

  register(){
    this.afauth.auth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{
      this.afauth.auth.currentUser.sendEmailVerification().then(()=>{
      
        this.navCtrl.popToRoot();
      });
    })

  }
  
}
