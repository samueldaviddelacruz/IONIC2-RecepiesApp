import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipe implements OnInit {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  ngOnInit() {
    this.mode = this.params.get('mode');
    this.initializeForm()
  }

  constructor(private params: NavParams, private actionSheetCtrl: ActionSheetController) {

  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {

          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
      ]
    });
  }

}
