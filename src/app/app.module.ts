import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {EditRecipe} from '../pages/edit-recipe/edit-recipe';
import {RecipePage} from '../pages/recipe/recipe';
import {Recipes} from '../pages/recipes/recipes';
import {ShoppingList} from '../pages/shopping-list/shopping-list';
import {Tabs} from "../pages/tabs/tabs";
import { MyApp } from './app.component';
import {ShoppingListService} from "../services/shopping-list";
import {RecipesService} from "../services/recipes";
import {Signup} from "../pages/signup/signup";
import {Signin} from "../pages/signin/signin";
import {AuthService} from "../services/auth";
import {SLOptionsPage} from "../pages/shopping-list/sl-options/sl-options";
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    MyApp,
    EditRecipe,
    RecipePage,
    Recipes,
    ShoppingList,
    Tabs,
    Signup,
    Signin,
    SLOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipe,
    RecipePage,
    Recipes,
    ShoppingList,
    Tabs,
    Signup,
    Signin,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
