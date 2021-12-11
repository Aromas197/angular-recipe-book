import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

//The object in Injectable is optional. If you don't want it, this service can be imported in the
//app.module.ts providers array like with the shopping list and recipe services.
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        //With put(), data on the back end will be overridden
        this.http.put(
            'https://mcfaterecipebook-default-rtdb.firebaseio.com/recipes.json',
            recipes
            )
            .subscribe(response => {
               console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://mcfaterecipebook-default-rtdb.firebaseio.com/recipes.json',
            )
            .pipe(
                map(recipes => {
                    //map above is an rxjs operator, map below is a javascript operator
                    return recipes.map(recipe => {
                        //If the recipe retrieved has an ingredient array, use that array. If the array doesn't exist, submit an empty array in its place
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
} 