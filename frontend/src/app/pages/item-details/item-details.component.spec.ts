import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { ItemDetailsComponent } from "./item-details.component";
import { ItemsStore } from "../../store/items.store";

describe("ItemDetailsComponent", () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let itemsStore: ItemsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailsComponent, HttpClientTestingModule],
      providers: [
        ItemsStore,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (_: string) => "1",
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    itemsStore = TestBed.inject(ItemsStore);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call updateItem on onUpdate", () => {
    const updateSpy = spyOn(itemsStore, "updateItem").and.callThrough();
    const itemAttrs = {
      name: "Test name",
      description: "Test description",
      quantity: 1,
      unitPrice: 1,
    };
    component.onUpdate(itemAttrs);
    expect(updateSpy).toHaveBeenCalled();
  });

  it("should call removeItem on onDelete", () => {
    const deleteSpy = spyOn(itemsStore, "removeItem").and.callThrough();
    component.onDelete();
    expect(deleteSpy).toHaveBeenCalledWith("1");
  });
});
