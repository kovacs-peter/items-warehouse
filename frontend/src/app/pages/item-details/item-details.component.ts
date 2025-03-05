import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, map, filter, take } from "rxjs";
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

  private id$: Observable<string>;

  item$ = this.itemsStore.selectedItem$;

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      take(1),
      map((p) => p.get("id")),
      filter((id): id is string => id !== null)
    );
    this.itemsStore.loadItem(this.id$);
  }

  onUpdate(event: WarehouseItemAttrs) {
    this.id$
      .pipe(
        take(1),
        map(
          (id): UpdateWarehouseItem => ({
            id,
            ...event,
          })
        ),
        map((itemToUpdate) => this.itemsStore.updateItem(itemToUpdate))
      )
      .subscribe();
  }

  onDelete(_: void) {
    this.id$
      .pipe(
        take(1),
        map((id) => {
          return this.itemsStore.removeItem(id);
        })
      )
      .subscribe();
  }
}
