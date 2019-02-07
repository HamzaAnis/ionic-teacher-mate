import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  parents: AngularFirestoreCollection<any>;
  constructor(public afauth:AngularFireAuth, public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
