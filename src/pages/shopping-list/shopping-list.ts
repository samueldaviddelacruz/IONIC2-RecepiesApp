import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {
  listItems: Ingredient[];

  constructor(private shoppingListService: ShoppingListService,
              private popOverctrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {

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
      this.shoppingListService.fetchList(token).subscribe((list: Ingredient[]) => {

        if (list) {
          this.listItems = list;
          console.log('Success!')

        } else {
          this.listItems = [];
        }
        loading.dismiss()
      }, error => {
        loading.dismiss()
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
      this.shoppingListService.storeList(token).subscribe(() => {
        console.log('Success!')
        loading.dismiss()
      }, error => {
        loading.dismiss()
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
