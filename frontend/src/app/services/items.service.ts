import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  CreateWarehouseItem,
  UpdateWarehouseItem,
  WarehouseItem,
} from "../core/models/warehouseItem";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  private baseUrl = "http://127.0.0.1:3000";

  constructor(private http: HttpClient) {}

  getItems(): Observable<WarehouseItem[]> {
    return this.http.get<WarehouseItem[]>(`${this.baseUrl}/items`);
  }

  getItem(id: string): Observable<WarehouseItem> {
    return this.http.get<WarehouseItem>(`${this.baseUrl}/items/${id}`);
  }

  updateItem(item: UpdateWarehouseItem): Observable<UpdateWarehouseItem> {
    return this.http.put<UpdateWarehouseItem>(`${this.baseUrl}/items/${item.id}`, item);
  }

  createItem(item: CreateWarehouseItem): Observable<WarehouseItem> {
    return this.http.post<WarehouseItem>(`${this.baseUrl}/items`, item);
  }

  deleteItem(id: string): Observable<WarehouseItem> {
    return this.http.delete<WarehouseItem>(`${this.baseUrl}/items/${id}`);
  }
}
