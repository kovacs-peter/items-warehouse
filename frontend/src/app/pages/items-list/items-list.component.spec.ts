import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ItemsListComponent } from "./items-list.component";
import { ItemsStore } from "../../store/items.store";

describe("ItemsListComponent", () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListComponent, HttpClientTestingModule],
      providers: [ItemsStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
