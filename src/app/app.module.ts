import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LoaderserviceProvider } from '../providers/loaderservice/loaderservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { SignupServiceProvider } from '../providers/signup-service/signup-service';

// import { TeacherloginPage } from '../pages/teacherlogin/teacherlogin';
// import { ParentloginPage } from '../pages/parentlogin/parentlogin';

export const firebaseConfig = {
  apiKey: "AIzaSyDKzlwtZRCthJWAcMFLvUIzujESFHctJug",
  authDomain: "wired-coffee-4f603.firebaseapp.com",
  databaseURL: "https://wired-coffee-4f603.firebaseio.com",
  projectId: "wired-coffee-4f603",
  storageBucket: "wired-coffee-4f603.appspot.com",
  messagingSenderId: "765787238011"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //  AngularFirestoreModule.enablePersistence({experimentalTabSynchronization: true}),
    AngularFirestoreModule.enablePersistence(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoaderserviceProvider,
    LoginserviceProvider,
    HomeServiceProvider,
    ChatServiceProvider,
    SignupServiceProvider
  ]
})
export class AppModule { }
