import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: "app-director-card",
  templateUrl: "./director-card.component.html",
  styleUrls: ["./director-card.component.scss"],
})

/**
 * This component renders the director card component.
 */
export class DirectorCardComponent {
  director: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.director = data;
  }
}
