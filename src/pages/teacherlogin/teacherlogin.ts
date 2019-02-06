import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoaderserviceProvider } from '../../providers/loaderservice/loaderservice';
 import { HomePage } from '../home/home';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
/**
 * Generated class for the TeacherloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherlogin',
  templateUrl: 'teacherlogin.html',
})
export class TeacherloginPage {

   
     teacher_email: string= "";
     teacher_password: string= "";
     emailverified: boolean = false;

  constructor(public modalctrl: ModalController, public viewCtrl:ViewController, public loginprovider: LoginserviceProvider, public alertCtrl: AlertController, public loader: LoaderserviceProvider, public navCtrl: NavController, public navParams: NavParams, public afauth: AngularFireAuth) {
   
    // this.afauth.auth.onAuthStateChanged(user => {
    //   if (user){
    //   //  this.navCtrl.pop();
    //    //   this.navCtrl.popToRoot();
    //     //  this.navCtrl.setRoot(HomePage);
    //      this.navCtrl.push(HomePage);
    //   }
    // });
//    console.log(this.afauth.auth.currentUser)
if (this.afauth.auth.currentUser != null || this.afauth.auth.currentUser != undefined){
    if (this.afauth.auth.currentUser.emailVerified ){
      this.emailverified = true;
    }
  }else {
    this.emailverified = true;
  }
} 

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherloginPage');
  }

  presentAlert(alerttitle, alertsub) {
    let alert = this.alertCtrl.create({
      title: alerttitle,
      subTitle: alertsub,
      buttons: ['OK']
    });
    alert.present();

  }

  login(){
    let tcredts = {
      email: this.teacher_email,
      password: this.teacher_password
    }
    // this.loginprovider.findteacher(tcredts);
    this.afauth.auth.signInWithEmailAndPassword(tcredts.email,tcredts.password).then(res=> {
      
      // let childnavs = this.navCtrl.getViews();
      // for (let i=0;i<childnavs.length;i++){
      // console.log(childnavs[i].component.name+" "+childnavs[i]);
      
      // }
      console.log(this.afauth.auth.currentUser);
      if (this.afauth.auth.currentUser!= undefined && this.afauth.auth.currentUser!= null && this.afauth.auth.currentUser.emailVerified){
      this.viewCtrl.dismiss(true);
      }else{
        this.emailverified = false;
      }
     // this.navCtrl.popToRoot();
     // this.navCtrl.push(HomePage);
    
      // this.navCtrl.push(HomePage)
      // .then(() => {
      //   const startIndex = this.navCtrl.getActive().index - 1;
      //   this.navCtrl.remove(startIndex, 1);
      // }); 

    }).catch(err=>{
      this.presentAlert('Login Failed ',' Username not found ');
    });
  }
  googlelogin(){
    let tcredts = {
      email: this.teacher_email,
      password : this.teacher_password
    }
    
  }

  register(){
    var person = 'Teacher';
    var modalPage = this.modalctrl.create('SignupModalPage',{person: person});
    modalPage.present();
  }
  
  sendverification(){
    this.afauth.auth.currentUser.sendEmailVerification().then(()=>{
      this.presentAlert('Verification Link Send ','Successfully');
    }).catch(err=>{
      this.presentAlert('Verificaton Email Sending ',' Failed ');
    });
  }

  verified(){
    if (this.afauth.auth.currentUser.emailVerified ){
      this.emailverified = true;
      this.navCtrl.popToRoot();
    }else{
      this.presentAlert('Email verfication ',' Failed ');
    }
  }
}
