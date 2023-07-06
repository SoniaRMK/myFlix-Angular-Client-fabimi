import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent {
  movie: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.movie = data;
}
}