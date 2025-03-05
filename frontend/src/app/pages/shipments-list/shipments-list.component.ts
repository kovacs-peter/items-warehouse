import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShipmentsStore } from "../../store/shipments.store";
import { ItemsStore } from "../../store/items.store";
import { map } from "rxjs";

@Component({
  selector: "app-shipments-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./shipments-list.component.html",
  styleUrls: ["./shipments-list.component.scss"],
})
export class ShipmentsListComponent implements OnInit {
  constructor(
    private shipmentsStore: ShipmentsStore,
    private itemsStore: ItemsStore
  ) {}
  shipments$ = this.shipmentsStore.shipments$.pipe(
    map((shipments) => {
      const items$ = this.itemsStore.items$;
      return shipments.map((shipment) => {
        return {
          ...shipment,
          items: shipment.items.map(({ item_id }) => {
            return items$.pipe(map((items) => items.find((item) => item.id === item_id)));
          }),
        };
      });
    })
  );

  ngOnInit(): void {
    this.shipmentsStore.loadShipments();
    this.itemsStore.loadItems();
  }

  protected readonly JSON = JSON;
}
