import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ItemsService } from "../services/items.service";
import { WarehouseItem } from "../core/models/warehouseItem";
import { tap } from "rxjs/operators";
import { switchMap } from "rxjs";

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

  readonly loadItems = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.itemsService.getItems()),
      tap((items) => {
        this.patchState({ items });
      })
    )
  );

  readonly loadItem = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) => this.itemsService.getItem(id)),
      tap((selectedItem) => this.patchState({ selectedItem }))
    )
  );
}
