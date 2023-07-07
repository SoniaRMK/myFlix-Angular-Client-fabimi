import { Component, OnInit } from '@angular/core';
import {FetchApiDataService} from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
movies: any[] = [];
constructor (
  public fetchApiData: FetchApiDataService,
  public dialog: MatDialog,
  private router : Router ){}


ngOnInit (): void {
  this.getMovies();

}

/**
 * 
 * @method getMovies
 * @description gets the list of movies from the API
 * @returns list of movies
 * @memberof MovieCardComponent
 */


getMovies() : void {
this.fetchApiData.getAllMovies().subscribe((resp : any) => {
this.movies = resp; 
console.log(this.movies);
return this.movies})
}

openDirectorDialog(director: any): void {
  this.dialog.open(DirectorCardComponent, {
    width: '500px',
    data: director,
  });
}

openGenreDialog(genre: any): void {
  this.dialog.open(GenreCardComponent, {
    width: '500px',
    data: genre,
  });
} 

gotoUser() {
  this.router.navigate(['profile']);
}
}