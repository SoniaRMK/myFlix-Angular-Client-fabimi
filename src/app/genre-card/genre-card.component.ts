import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent {
  genre: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.genre = data;
   
  }
}
