import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, map, filter, take, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ItemsStore } from "../../store/items.store";
import { ItemFormComponent } from "../../core/components/item-form/item-form.component";
import { WarehouseItemAttrs } from "../../core/models/warehouseItem";
import { ItemsService } from "../../services/items.service";
import { tap } from "rxjs/operators";

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
    private route: ActivatedRoute,
    private itemService: ItemsService
  ) {}

  private idObservable = new Observable<string>();

  item$ = this.itemsStore.selectedItem$;

  onUpdate(event: WarehouseItemAttrs) {
    this.idObservable
      .pipe(
        take(1),
        map((id) => {
          return {
            id,
            ...event,
          };
        }),
        switchMap((itemToUpdate) => this.itemService.updateItem(itemToUpdate)),
        tap((response) => console.log("Item updated successfully", response))
      )
      .subscribe({
        error: (error) => console.error("Error updating item", error),
        complete: () => console.log("Update complete"),
      });
  }

  ngOnInit(): void {
    this.idObservable = this.route.paramMap.pipe(
      map((p) => p.get("id")),
      filter((id): id is string => id !== null)
    );
    if (this.idObservable) this.itemsStore.loadItem(this.idObservable);
  }
}
