import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShipmentsStore } from "../../../store/shipments.store";

@Component({
  selector: "app-shipment-cart",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./shipment-cart.component.html",
  styleUrls: ["./shipment-cart.component.scss"],
})
export class ShipmentCartComponent {
  constructor(readonly shipmentsStore: ShipmentsStore) {}
  shipmentItems$ = this.shipmentsStore.shipmentCartItems$;
  onShipmentClear(): void {
    this.shipmentsStore.clearCart();
  }
  onShipmentCreate(): void {
    this.shipmentsStore.createShipment();
  }
}
