import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, map, filter, take, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ItemsStore } from "../../store/items.store";
import { ItemFormComponent } from "../../core/components/item-form/item-form.component";
import { UpdateWarehouseItem, WarehouseItemAttrs } from "../../core/models/warehouseItem";

@Component({
  selector: "app-item-details",
  standalone: true,
  imports: [CommonModule, ItemFormComponent],
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.scss"],
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    private itemsStore: ItemsStore,
    private route: ActivatedRoute
  ) {}

  private idObservable = new Observable<string>();

  item$ = this.itemsStore.selectedItem$;

  onUpdate(event: WarehouseItemAttrs) {
    this.idObservable
      .pipe(
        take(1),
        map((id): UpdateWarehouseItem => {
          return {
            id,
            ...event,
          };
        }),
        map((itemToUpdate) => this.itemsStore.updateItem(itemToUpdate))
      )
      .subscribe({
        error: (error) => console.error("Error updating item", error),
        complete: () => console.log("Update complete"),
      });
  }

  onDelete(id: string) {
    this.itemsStore.removeItem(of(id));
  }

  ngOnInit(): void {
    this.idObservable = this.route.paramMap.pipe(
      map((p) => p.get("id")),
      filter((id): id is string => id !== null)
    );
    if (this.idObservable) this.itemsStore.loadItem(this.idObservable);
  }
}
