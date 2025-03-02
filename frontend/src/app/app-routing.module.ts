import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemsListComponent } from "./pages/items-list/items-list.component";
import { ItemDetailsComponent } from "./pages/item-details/item-details.component";
import { ItemCreateComponent } from "./pages/item-create/item-create.component";

const routes: Routes = [
  {
    path: "",
    component: ItemsListComponent,
  },
  {
    path: "items/:id",
    component: ItemDetailsComponent,
  },
  {
    path: "create",
    component: ItemCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
