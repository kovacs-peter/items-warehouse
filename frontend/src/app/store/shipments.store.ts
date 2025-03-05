import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

import { filter, map, switchMap } from "rxjs";
import { ShipmentItem, ShipmentPayload } from "../core/models/shipment";
import { ItemsStore } from "./items.store";
import { ShipmentsService } from "../services/shipments.service";

interface ShipmentsState {
  shipmentCartItems: Record<ShipmentItem["id"], ShipmentItem>;
}

@Injectable()
export class ShipmentsStore extends ComponentStore<ShipmentsState> {
  constructor(
    private itemsStore: ItemsStore,
    private shipmentsService: ShipmentsService
  ) {
    super({ shipmentCartItems: {} });
  }

  readonly shipmentCartItems$ = this.select((state) => Object.values(state.shipmentCartItems));

  readonly addToCart = this.effect<string>((id$) => {
    return id$.pipe(
      switchMap((id) => this.itemsStore.getItem(id)),
      filter((item) => !!item),
      map((item) => {
        const { id, name, quantity } = item!;
        return this.patchState((state) => {
          const shipmentQuantity = state.shipmentCartItems[id]?.quantity || 0;
          return {
            ...state,
            shipmentCartItems: {
              ...state.shipmentCartItems,
              [id]: { id, name, quantity: Math.min(shipmentQuantity + 1, quantity) },
            },
          };
        });
      })
    );
  });

  readonly clearCart = () => {
    this.patchState({ shipmentCartItems: {} });
  };

  readonly createShipment = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => {
        const shipmentItems: ShipmentPayload = Object.values(this.get().shipmentCartItems).map(
          ({ id, quantity }) => ({ itemId: id, quantity })
        );
        return this.shipmentsService.createShipment(shipmentItems).pipe(
          map(() => {
            this.clearCart();
            this.itemsStore.loadItems();
          })
        );
      })
    )
  );
}
