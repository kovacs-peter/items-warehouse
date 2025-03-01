import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListItemComponent } from "./list-item/list-item.component";
import { ItemsStore } from "../../store/items.store";

@Component({
  selector: "app-items-list",
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"],
})
export class ItemsListComponent implements OnInit {
  constructor(private itemsStore: ItemsStore) {}
  items$ = this.itemsStore.items$;

  ngOnInit(): void {
    this.itemsStore.loadItems();
  }

  /* addItemToShipment(id: number): void {
    this.itemsMockService.addToShipment(id);
  }*/
}
