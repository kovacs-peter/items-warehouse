import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsStore } from "./store/items.store";
import { HttpClientModule } from "@angular/common/http";
import { ItemFormComponent } from "./core/components/navigation/navigation.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ItemFormComponent],
  providers: [ItemsStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
