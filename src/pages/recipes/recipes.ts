import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {EditRecipe} from "../edit-recipe/edit-recipe";


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {

  constructor(private  navCtrl: NavController) {

  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipe, {mode: 'New'});
  }


}
