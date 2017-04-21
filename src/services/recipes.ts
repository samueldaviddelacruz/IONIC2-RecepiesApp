import {Ingredient} from "../models/ingredient";
import {Recipe} from "../models/recipe";
import {Http} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService {

  private myRecipes: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) {

  }
  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {

    let recipe = new Recipe(title, description, difficulty, ingredients);
    this.myRecipes.push(recipe);


  }

  getRecipes() {
    return this.myRecipes.slice();
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {

    this.myRecipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.myRecipes.splice(index, 1);
  }


  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;

    return this.http.put(`https://ionic2-recipebook-7dbf9.firebaseio.com/${userId}/recipes.json?auth=${token}`, this.myRecipes).map(response => {

      return response.json();
    });

  }

  fetchList(token: string) {

    const userId = this.authService.getActiveUser().uid;
    return this.http.get(`https://ionic2-recipebook-7dbf9.firebaseio.com/${userId}/recipes.json?auth=${token}`).map(response => {
      const recipes: Recipe[] = response.json() ? response.json() : [];

      for (let item of recipes) {

        if (!item.hasOwnProperty('ingredients')) {
          item.ingredients = [];
        }

      }
      return recipes;
    }).do((recipes: Recipe[]) => {
      if (recipes) {
        this.myRecipes = recipes;
      } else {
        this.myRecipes = [];
      }

    });


  }

}
