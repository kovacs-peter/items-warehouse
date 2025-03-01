import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemsListComponent } from "./pages/items-list/items-list.component";
import { ItemDetailsComponent } from "./pages/item-details/item-details.component";

const routes: Routes = [
  {
    path: "",
    component: ItemsListComponent,
  },
  { path: "items/:id", component: ItemDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
