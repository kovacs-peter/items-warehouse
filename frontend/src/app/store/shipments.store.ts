import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

import { filter, map } from "rxjs";
import { ShipmentItem } from "../core/models/shipment";
import { ItemsStore } from "./items.store";

interface ShipmentsState {
  shipmentCartItems: Record<ShipmentItem["id"], ShipmentItem>;
}

@Injectable()
export class ShipmentsStore extends ComponentStore<ShipmentsState> {
  constructor(private itemsStore: ItemsStore) {
    super({ shipmentCartItems: {} });
  }

  readonly shipmentCartItems$ = this.select((state) => Object.values(state.shipmentCartItems));

  readonly addToCart = (id: string) => {
    const item$ = this.itemsStore.getItem(id);
    return item$
      .pipe(
        filter((item) => !!item),
        map((item) => {
          const { id, name, quantity } = item!;
          return this.patchState((state) => {
            const shipmentQuantity = state.shipmentCartItems[id]?.quantity || 0;
            return {
              ...state,
              shipmentCartItems: {
                ...state.shipmentCartItems,
                [id]: { id, name, quantity: Math.max(shipmentQuantity + 1, quantity) },
              },
            };
          });
        })
      )
      .subscribe();
  };

  readonly clearCart = () => {
    this.patchState({ shipmentCartItems: {} });
  };
}
