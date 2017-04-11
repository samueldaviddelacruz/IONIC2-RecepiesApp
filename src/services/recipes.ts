import {Ingredient} from "../models/ingredient";
import {Recipe} from "../models/recipe";
export class RecipesService {

  private myRecipes: Recipe[] = [];

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
    this.myRecipes.slice(index, 1);
  }

}
