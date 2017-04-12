import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {EditRecipe} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list";
import {RecipesService} from "../../services/recipes";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe:Recipe;
  index :number;
  ngOnInit(): void {
   this.recipe = this.params.get('recipe');
   this.index = this.params.get('index');
  }


  constructor(public navCtrl:NavController,
              public params:NavParams,
              public slService:ShoppingListService,
              public recipesService:RecipesService){

  }
  onEditRecipe(){
    this.navCtrl.push(EditRecipe,{mode:"Edit",recipe:this.recipe,index:this.index})
  }

  onAddIngredients(){
    this.slService.addItems(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
