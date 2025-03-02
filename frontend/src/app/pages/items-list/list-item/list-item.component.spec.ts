import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListItemComponent } from "./list-item.component";
import { ItemsStore } from "../../../store/items.store";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe("ListItemComponent", () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
      providers: [
        ItemsStore,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;

    component.item = {
      id: "1",
      name: "Test Item",
      imageUrl: "http://example.com/image.jpg",
      description: "Test description",
      unitPrice: 100,
      quantity: 100,
    };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
