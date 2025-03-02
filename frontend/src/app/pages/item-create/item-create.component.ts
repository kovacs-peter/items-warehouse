import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { of } from "rxjs";
import { ItemsStore } from "../../store/items.store";
import { ItemFormComponent } from "../../core/components/item-form/item-form.component";
import { CreateWarehouseItem } from "../../core/models/warehouseItem";

@Component({
  selector: "app-item-details",
  standalone: true,
  imports: [CommonModule, ItemFormComponent],
  templateUrl: "./item-create.component.html",
  styleUrls: ["./item-create.component.scss"],
})
export class ItemCreateComponent {
  constructor(private itemsStore: ItemsStore) {}

  onCreate(event: CreateWarehouseItem) {
    this.itemsStore.createItem(of(event));
  }
}
