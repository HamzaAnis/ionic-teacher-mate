import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { HomePage } from '../home/home';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the LoginmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginmenu',
  templateUrl: 'loginmenu.html',
})
export class LoginmenuPage {

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

    console.log('in loginmenu');
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user!=null){
    //     console.log('user' + user);
    //  //   this.navCtrl.pop();
    //     this.navCtrl.push(HomePage);
    //   }
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginmenuPage');
  }

  teacheraccount() {
    //   this.navCtrl.setRoot(HomePage);
    //   this.navCtrl.pop();
    // this.navCtrl.push('TeacherloginPage');
    //  this.navCtrl.push('TeacherloginPage')
    // .then(() => {
    //   const startIndex = this.navCtrl.getActive().index - 1;
    //   this.navCtrl.remove(startIndex, 1);
    // });

    var modalPage = this.modalCtrl.create('TeacherloginPage');
    modalPage.onDidDismiss(data => {
      if (data == true) {
        console.log(data + " login menu ")
        this.navCtrl.popToRoot();
      }
    });
    modalPage.present();
  }

  parentaccount() {
    var modalPage = this.modalCtrl.create('ParentloginPage');
    modalPage.onDidDismiss(data => {
      if (data == true) {
        console.log(data + " login menu ")
        this.navCtrl.popToRoot();
      }
    });
    modalPage.present();
  }
}
