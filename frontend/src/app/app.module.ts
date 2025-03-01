import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsListComponent } from "./pages/items-list/items-list.component";
import { ItemsStore } from "./store/items.store";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ItemsListComponent, HttpClientModule],
  providers: [ItemsStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
