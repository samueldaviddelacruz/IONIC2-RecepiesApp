import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, PopoverController} from 'ionic-angular';
import {EditRecipe} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth";


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {

  recipes:Recipe[];

  constructor(private  navCtrl: NavController,
              private recipesService: RecipesService,
              private popOverctrl: PopoverController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthService) {

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


  onShowOptions(event: MouseEvent) {
    const popover = this.popOverctrl.create(DatabaseOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(async data => {
      if (!data) {
        return;
      }
      if (data.action == 'load') {


        await this.onLoadData();

      } else if (data.action == 'store') {


        await this.onSaveData();

      }
    })
  }

  private async onLoadData() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let token;
    try {
      loading.present();
      token = await this.authService.getActiveUser().getToken();

      this.recipesService.fetchList(token).subscribe((recipes: Recipe[]) => {

        console.log(recipes)
        if (recipes) {
          this.recipes = recipes;
          console.log('Success!')

        } else {
          this.recipes = [];
        }
        loading.dismiss()
      }, error => {
        loading.dismiss();
        this.handleError(error.json().error);
      })
    } catch (error) {

    }
  }

  private async onSaveData() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let token;

    try {
      loading.present();
      token = await this.authService.getActiveUser().getToken();
      this.recipesService.storeList(token).subscribe(() => {
        console.log('Success!');
        loading.dismiss()
      }, error => {
        loading.dismiss();
        this.handleError(error.json().error);
      })
    } catch (error) {


    }
  }


  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();

  }


}
