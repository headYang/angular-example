import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slform: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItem: Ingredient;
  constructor(private sl: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.sl.startEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.sl.getIngredient(index);
        this.slform.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.sl.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.sl.addIngredient(newIngredient);
    }
    this.onCancel();
  }
  onDelete() {
    this.sl.deleteIngredient(this.editedItemIndex);
    this.onCancel();
  }
  onCancel() {
    this.slform.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
