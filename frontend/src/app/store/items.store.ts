import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ItemsService } from "../services/items.service";
import {
  CreateWarehouseItem,
  UpdateWarehouseItem,
  WarehouseItem,
} from "../core/models/warehouseItem";
import { tap } from "rxjs/operators";
import { map, Observable, switchMap } from "rxjs";
import { Router } from "@angular/router";

interface ItemsState {
  items: WarehouseItem[];
  selectedItem?: WarehouseItem;
}

@Injectable()
export class ItemsStore extends ComponentStore<ItemsState> {
  constructor(
    private itemsService: ItemsService,
    private router: Router
  ) {
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

  readonly getItem = (id: string) => {
    return this.items$.pipe(
      map((items) =>
        items.find((item) => {
          return item.id === id;
        })
      )
    );
  };

  readonly createItem = this.effect<CreateWarehouseItem>(
    (payload: Observable<CreateWarehouseItem>) => {
      return payload.pipe(
        switchMap((item) => this.itemsService.createItem(item)),
        tap((createdItem) =>
          this.patchState((state) => ({
            items: [...state.items, createdItem],
          }))
        ),
        tap(() => this.router.navigate(["/"])),
        tap((response) => console.log("Item created successfully", response))
      );
    }
  );

  readonly updateItem = this.effect<UpdateWarehouseItem>(
    (payload: Observable<UpdateWarehouseItem>) => {
      return payload.pipe(
        switchMap((item) => this.itemsService.updateItem(item)),
        tap((updatedItem) =>
          this.patchState((state) => ({
            items: state.items.map((item) =>
              item.id === updatedItem.id ? { ...item, ...updatedItem } : item
            ),
          }))
        ),
        tap(({ unitPrice, description, quantity, name }) =>
          this.patchState((state): { selectedItem?: WarehouseItem } => {
            if (state.selectedItem?.id)
              return {
                selectedItem: { ...state.selectedItem, unitPrice, description, quantity, name },
              };
            return state;
          })
        ),
        tap((response) => console.log("Item updated successfully", response)),
        tap(() => this.router.navigate(["/"]))
      );
    }
  );

  readonly removeItem = this.effect<string>((id) => {
    return id.pipe(
      switchMap((id) => this.itemsService.deleteItem(id)),
      tap((deletedItem) =>
        this.patchState((state) => ({
          items: state.items.filter((item) => item.id !== deletedItem.id),
        }))
      ),
      tap(() => this.router.navigate(["/"])),
      tap((response) => console.log("Item deleted successfully", response))
    );
  });
}
