import { Component } from '@angular/core';
import {IonicPage, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {SLOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {
  listItems: Ingredient[];

  constructor(private shoppingListService: ShoppingListService, private popOverctrl: PopoverController, private authService: AuthService) {

  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount)
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popOverctrl.create(SLOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(async data => {
      if (data.action == 'load') {

      } else {
        let token;
        try {
          token = await this.authService.getActiveUser().getToken();
          this.shoppingListService.storeList(token).subscribe(() => {
            console.log('Success!')
          }, error => {
            console.log(error)
          })
        } catch (error) {

        }

      }
    })
  }

}
