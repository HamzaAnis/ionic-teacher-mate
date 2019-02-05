import { Component } from '@angular/core';
import {ModalController ,NavController, PopoverController, ToastController, AlertController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomeServiceProvider } from '../../providers/home-service/home-service';

// import { LoaderserviceProvider } from '../../providers/loaderservice/loaderservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   // search condition
   public search = {
    name: "name ",
    date: new Date().toISOString()
  }

  constructor(public homeservice: HomeServiceProvider,public afAuth:AngularFireAuth, public alertctrl:AlertController ,public toastctrl:ToastController, public modalctrl: ModalController, public platform: Platform, public actionsheetCtrl: ActionSheetController, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    let childnavs = this.nav.getViews();
      for (let i=0;i<childnavs.length;i++){
      console.log(childnavs[i].component.name+" "+childnavs[i]);
      }
  this.afAuth.auth.onAuthStateChanged(user => {
    
    console.log(user);
    if (!user){
      console.log('go to login');
      this.nav.push('LoginmenuPage')
       .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      }); 
    }
  });
    
  }
 
  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "User name "
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
  //  this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
  //  this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
  //  this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    // console.log(myEvent);
    // let popover = this.popoverCtrl.create(NotificationsPage);
    // popover.present({
    //   ev: myEvent
    // });
  }


  viewClassroom(classname: any, classteacher: any){
    this.nav.push('TimelinePage')
  }

  createclassroom() {
    let createclass = this.alertctrl.create({
      title: 'Create class',
      message: "Class name(required)",
      inputs: [
        {
          name: 'classname',
          placeholder: 'class name',
          type: 'name'
        },
        {
          name: 'section',
          placeholder: 'section name',
          type: 'name'
        },
        {
          name: 'subject',
          placeholder: 'subject name',
          type: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log('Create clicked');
            console.log(data);
            let classname = '';
            let subject = '';
            let section = '';
            if (data.classname == ''){
              classname = data.classname;
            }else{
              classname = data.classname;
            }

            if (data.subject == ''){
              subject = data.subject;
            }else{
              subject = data.subject;
            }
            
            if (data.section == ''){
              section = data.section;
            }else{
              section = data.section;
            }
            

            let teacherclass = {
              email: this.afAuth.auth.currentUser.email,
              classname: classname,
               section: section,
               subject: subject,
               teachername: this.afAuth.auth.currentUser.email
            };
            this.homeservice.addclassroom(teacherclass).then(res=>{
            this.nav.push('ChatPage');
            }).catch(err=>{

            });

            this.presentAlert('Error','Cannot Create Classroom');   
          }
        }
      ]
    });
    createclass.present();
  }

  presentAlert(alerttitle, alertsub) {
    let alert = this.alertctrl.create({
      title: alerttitle,
      subTitle: alertsub,
      buttons: ['OK']
    });
    alert.present();

  }

}
