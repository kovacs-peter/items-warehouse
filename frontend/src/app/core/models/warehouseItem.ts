export interface WarehouseItem {
  imageUrl?: string;
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type WarehouseItemAttrs = Omit<WarehouseItem, "id" | "imageUrl">;

export type UpdateWarehouseItem = Omit<WarehouseItem, "imageUrl">;

export type CreateWarehouseItem = Omit<WarehouseItem, "id" | "imageUrl">;
