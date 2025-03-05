import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  navigationItems = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Add warehouse item",
      url: "/create",
    },
  ];
}
