import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

/**
 * Generated class for the Signin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  async onSignin(form: NgForm) {

    let result;
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    try {
      loading.present();
      result = await this.authService.signin(form.value.email, form.value.password);
      console.log(result);
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signin failed!',
        message: error.message,
        buttons: ['Ok']
      });

      alert.present();
    }

  }

}
