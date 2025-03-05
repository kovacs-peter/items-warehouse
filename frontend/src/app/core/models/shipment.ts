import { WarehouseItem } from "./warehouseItem";

export interface ShipmentItem {
  id: WarehouseItem["id"];
  name: string;
  quantity: number;
}
