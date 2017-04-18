import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  async onSignup(form: NgForm) {

    let values = form.value;
    let result;
    const loading = this.loadingCtrl.create({
      content: 'Sign you up...'
    });

    try {

      loading.present();
      result = await this.authService.signup(values.email, values.password);
      console.log(result);
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signup failed',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    }


  }



}
