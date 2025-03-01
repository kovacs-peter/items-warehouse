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
  items$ = this.itemsStore.items$;

  constructor(private itemsStore: ItemsStore) {}

  ngOnInit(): void {
    this.itemsStore.loadItems();
  }
  //constructor(private itemsMockService: ItemsMockService) {}

  /* addItemToShipment(id: number): void {
    this.itemsMockService.addToShipment(id);
  }*/
}
