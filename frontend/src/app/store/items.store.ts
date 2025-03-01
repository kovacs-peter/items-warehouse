import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ItemsService } from "../services/items.service";
import { WarehouseItem } from "../core/models/warehouseItem";
import { tap } from "rxjs/operators";

interface ItemsState {
  items: WarehouseItem[];
  selectedItem?: WarehouseItem;
}

@Injectable()
export class ItemsStore extends ComponentStore<ItemsState> {
  constructor(private itemsService: ItemsService) {
    super({ items: [] });
  }

  readonly items$ = this.select((state) => state.items);
  readonly selectedItem$ = this.select((state) => state.selectedItem);

  readonly loadItems = this.effect<void>((trigger$) => {
    console.log("loadItems");
    return trigger$.pipe(
      tap(() => {
        this.itemsService.getItems().subscribe((items) => {
          this.patchState({ items });
        });
      })
    );
  });

  readonly loadItem = this.effect<number>((id$) =>
    id$.pipe(
      tap((id) => {
        this.itemsService.getItem(id).subscribe((item) => {
          this.patchState({ selectedItem: item });
        });
      })
    )
  );
}
