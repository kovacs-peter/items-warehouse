import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { WarehouseItemAttrs } from "../../models/warehouseItem";

@Component({
  selector: "app-item-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./item-form.component.html",
  styleUrls: ["./item-form.component.scss"],
})
export class ItemFormComponent implements OnInit {
  @Input() item: WarehouseItemAttrs | null = null;
  @Output() onSubmit = new EventEmitter<WarehouseItemAttrs>();
  formItem: WarehouseItemAttrs = {
    name: "",
    description: "",
    quantity: 0,
    unitPrice: 0,
  };
  onSubmitForm(): void {
    this.onSubmit.emit(this.formItem);
  }
  ngOnInit(): void {
    if (this.item) {
      this.formItem = { ...this.item };
    }
  }
}
