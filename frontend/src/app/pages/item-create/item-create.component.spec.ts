import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ItemCreateComponent } from "./item-create.component";
import { ItemsStore } from "../../store/items.store";
import { ItemFormComponent } from "../../core/components/item-form/item-form.component";
import { CreateWarehouseItem } from "../../core/models/warehouseItem";
import { Observable } from "rxjs";

describe("ItemCreateComponent", () => {
  let component: ItemCreateComponent;
  let fixture: ComponentFixture<ItemCreateComponent>;
  let itemsStore: ItemsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCreateComponent, HttpClientTestingModule, ItemFormComponent],
      providers: [ItemsStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCreateComponent);
    component = fixture.componentInstance;
    itemsStore = TestBed.inject(ItemsStore);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call createItem on onCreate", () => {
    const createSpy = spyOn(itemsStore, "createItem").and.callThrough();
    const newItem: CreateWarehouseItem = {
      name: "New Item",
      description: "New description",
      quantity: 10,
      unitPrice: 20,
    };
    component.onCreate(newItem);
    expect(createSpy).toHaveBeenCalledWith(jasmine.any(Observable));
  });
});
