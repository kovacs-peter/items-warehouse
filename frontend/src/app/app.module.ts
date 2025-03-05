import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsStore } from "./store/items.store";
import { HttpClientModule } from "@angular/common/http";
import { NavigationComponent } from "./core/components/navigation/navigation.component";
import { ShipmentCartComponent } from "./core/components/shipment-cart/shipment-cart.component";
import { ShipmentsStore } from "./store/shipments.store";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavigationComponent,
    ShipmentCartComponent,
  ],
  providers: [ItemsStore, ShipmentsStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
