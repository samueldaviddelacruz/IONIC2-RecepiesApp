import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
  }

  async onSignup(form: NgForm) {
    let values = form.value;
    let result;
    try {
      result = await this.authService.signup(values.email, values.password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }


  }



}
