import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WarehouseItem } from "../core/models/warehouseItem";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  private baseUrl = "http://127.0.0.1:3000/items";

  constructor(private http: HttpClient) {}

  getItems(): Observable<WarehouseItem[]> {
    console.log("getItems");
    return this.http.get<WarehouseItem[]>(this.baseUrl);
  }

  getItem(id: number): Observable<WarehouseItem> {
    return this.http.get<WarehouseItem>(`${this.baseUrl}/${id}`);
  }
}
