import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent {
  movies: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.movies = data;

}
apiLoaded = false;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}