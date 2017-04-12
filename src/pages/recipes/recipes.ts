import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {EditRecipe} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {

  recipes:Recipe[];
  constructor(private  navCtrl: NavController,private recipesService:RecipesService) {

  }

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipe, {mode: 'New'});
  }
  onLoadRecipe(recipe:Recipe,index:number){
      this.navCtrl.push(RecipePage,{recipe,index})
  }


}
