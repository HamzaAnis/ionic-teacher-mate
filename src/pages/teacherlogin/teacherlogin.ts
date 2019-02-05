import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
 

  constructor(public loginprovider: LoginserviceProvider, public alertCtrl: AlertController, public loader: LoaderserviceProvider, public navCtrl: NavController, public navParams: NavParams, public afauth: AngularFireAuth) {
   
    // this.afauth.auth.onAuthStateChanged(user => {
    //   if (user){
    //   //  this.navCtrl.pop();
    //    //   this.navCtrl.popToRoot();
    //     //  this.navCtrl.setRoot(HomePage);
    //      this.navCtrl.push(HomePage);
    //   }
    // });

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
      
      let childnavs = this.navCtrl.getViews();
      for (let i=0;i<childnavs.length;i++){
      console.log(childnavs[i].component.name+" "+childnavs[i]);
      
      }
      this.navCtrl.popToRoot();
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
}
