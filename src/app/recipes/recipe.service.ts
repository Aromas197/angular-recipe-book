import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Spaghett',
    //          'Somebody touched it',
    //           'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_960_720.jpg',
    //           [
    //               new Ingredient('Pasta', 5),
    //               new Ingredient('Sauce', 5)
    //           ]
    //           ),
    //     new Recipe(
    //         'Borgar',
    //          'Mmmm tasty borgar',
    //           'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
    //           [
    //               new Ingredient('Buns', 2),
    //               new Ingredient('Meat', 2)
    //           ]
    //           ),
    //   ];
    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}