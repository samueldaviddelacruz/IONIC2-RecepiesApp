import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';

/**
 * Created by samuel on 4/9/17.
 */
@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {

  }
  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);

  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

//https://ionic2-recipebook-7dbf9.firebaseio.com/

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;

    return this.http.put(`https://ionic2-recipebook-7dbf9.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.ingredients).map(response => {
      return response.json();
    });

  }

}
