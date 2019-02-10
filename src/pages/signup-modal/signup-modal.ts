import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoaderserviceProvider } from '../../providers/loaderservice/loaderservice';
import { SignupServiceProvider } from '../../providers/signup-service/signup-service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  constructor(private formbuilder:FormBuilder, private validators:Validators , private formcontrol:FormControl,public viewCtrl:ViewController, public loaderservice:LoaderserviceProvider,public signupservice:SignupServiceProvider ,public alertCtrl :AlertController, public afauth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.person = this.navParams.get('person');
  // validators on name and email
    this.validators = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
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
    if (this.person == 'Parent'){
    this.signupservice.parentsignup(this.email, this.name).then((val)=>{
      console.log(val);
      this.viewCtrl.dismiss(true);
    }, (err)=>{
      this.presentAlert('Account not created ','Failed');
    });
  }else{
    this.signupservice.teachersignup(this.email, this.name).then((val)=>{
      console.log(val);
      this.viewCtrl.dismiss(true);
    }, (err)=>{
      this.presentAlert('Account not created ','Failed');
    });
  }
    /*
    this.afauth.auth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{
      this.afauth.auth.currentUser.sendEmailVerification().then(()=>{
       
        this.navCtrl.popToRoot();
      });
    })*/

  }
  
}
