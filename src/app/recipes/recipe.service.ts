import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    recipes: Recipe[] = [
        {
            name: 'test1',
            description: 'test1-description',
            imagePath: 'test1.png',
            ingredients: [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 10)
            ]
        },
        {
            name: 'test2',
            description: 'test2-description',
            imagePath: 'test2.png',
            ingredients: [
                new Ingredient('Meat1', 2),
                new Ingredient('French Fries1', 20)
            ]
        },
      ];
    constructor(private slService: ShoppingListService) {}
    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }
    addIngredientsToShopping(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newrecipe: Recipe) {
        this.recipes[index] = newrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
