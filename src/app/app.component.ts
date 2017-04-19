import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { Tabs } from '../pages/tabs/tabs';
import {Signin} from "../pages/signin/signin";
import {Signup} from "../pages/signup/signup";
import {AuthService} from "../services/auth";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = Tabs;
  signinPage = Signin;
  signupPage = Signup;
  isAuthenticated = false;
  @ViewChild('nav')
  nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyDPsvq1gmDMR6_QIntWG7M2kwBoqKs98JM",
      authDomain: "ionic2-recipebook-7dbf9.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = Tabs;
        //this.nav.setRoot(this.TabsPage);

      } else {
        this.isAuthenticated = false;
        this.rootPage = Signin;
        // this.nav.setRoot(this.signinPage);
      }

    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage);
  }

}

