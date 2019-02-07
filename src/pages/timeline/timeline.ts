import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';



/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afauth: AngularFireAuth) {

    this.afauth.auth.onAuthStateChanged(user => {
    
      console.log(user);
      if (user==null){
        console.log(user+" "+this.navCtrl);
       // this.navCtrl.pop();
        console.log(this.navCtrl.getViews());

        this.navCtrl.push('LoginmenuPage');
      }
    });
      
    }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }
  chatpage(){
    this.navCtrl.push('ChatPage');
  }
}
