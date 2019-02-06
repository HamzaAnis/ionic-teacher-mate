import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the ParentloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parentlogin',
  templateUrl: 'parentlogin.html',
})
export class ParentloginPage {
  teacher_email: string= "";
  teacher_password: string= "";
  emailverified: boolean = false;

constructor(public modalctrl: ModalController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, public afauth: AngularFireAuth, public alertCtrl:AlertController) {

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
 console.log('ionViewDidLoad ParentloginPage');
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
 var person = 'Parent';
 var modalPage = this.modalctrl.create('SignupModalPage',{person: person});
 modalPage.onDidDismiss(data=>{
  if (data == true)
  {
    console.log(data+" parentsignup ")
    this.viewCtrl.dismiss(true);
  }
});
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
