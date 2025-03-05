import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ShipmentPayload } from "../core/models/shipment";

@Injectable({
  providedIn: "root",
})
export class ShipmentsService {
  private baseUrl = "http://127.0.0.1:3000";

  constructor(private http: HttpClient) {}

  createShipment(shipmentItems: ShipmentPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/shipments`, shipmentItems);
  }
}
