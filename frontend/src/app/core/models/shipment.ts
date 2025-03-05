import { WarehouseItem } from "./warehouseItem";

export interface ShipmentItem {
  id: WarehouseItem["id"];
  name: string;
  quantity: number;
}

export type ShipmentPayload = {
  itemId: WarehouseItem["id"];
  quantity: number;
}[];

export interface Shipment {
  id: string;
  created_at: string;
  items: {
    shipment_id: string;
    item_id: string;
    quantity: number;
  }[];
}
