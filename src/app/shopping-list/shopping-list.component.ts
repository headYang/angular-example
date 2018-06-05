import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private sl: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.sl.getIngredints();
    this.subscription = this.sl.ingredientsChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients; });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSelectItem(index: number) {
    this.sl.startEditing.next(index);
  }
}
