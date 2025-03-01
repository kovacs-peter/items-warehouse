import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable, BehaviorSubject, switchMap } from "rxjs";
import { WarehouseItem } from "../../core/models/warehouseItem";
import { ItemsMockService } from "../items-list/items.mock.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-item-details",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.scss"],
})
export class ItemDetailsComponent implements OnInit {
  private idSubject = new BehaviorSubject<string | null>(null);
  item$: Observable<WarehouseItem | undefined> = this.idSubject.pipe(
    switchMap((id) => this.itemsMockService.getItem(`${id}`))
  );

  constructor(
    private itemsMockService: ItemsMockService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idSubject.next(params.get("id"));
    });
  }

  onSubmit(): void {
    //TODO: Implement onSubmit method
    console.log("Form submitted");
  }
}
