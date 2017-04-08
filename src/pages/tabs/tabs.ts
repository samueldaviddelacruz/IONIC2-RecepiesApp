import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {ShoppingList} from '../shopping-list/shopping-list';
import {Recipes} from '../recipes/recipes';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})


export class Tabs {
 slPage = ShoppingList;
 recipesPage = Recipes;

}
