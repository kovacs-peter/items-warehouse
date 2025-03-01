import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable, map, filter } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ItemsStore } from "../../store/items.store";

@Component({
  selector: "app-item-details",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.scss"],
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    private itemsStore: ItemsStore,
    private route: ActivatedRoute
  ) {}
  private idObservable = new Observable<string>();
  item$ = this.itemsStore.selectedItem$;

  ngOnInit(): void {
    this.idObservable = this.route.paramMap.pipe(
      map((p) => p.get("id")),
      filter((id): id is string => id !== null)
    );
    if (this.idObservable) this.itemsStore.loadItem(this.idObservable);
  }

  onSubmit(): void {
    //TODO: Implement onSubmit method
    console.log("Form submitted");
  }
}
