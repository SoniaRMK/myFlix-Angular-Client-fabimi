import { Component, OnInit } from '@angular/core';
import {FetchApiDataService} from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public router : Router,
  public snackbar: MatSnackBar ){}


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
  this.router.navigate(['users/:Username']);
}


addFavorite(movieId: string): void {
  this.fetchApiData.addFavMovie(movieId).subscribe((resp: any) => {
    console.log(resp);
    let favs = resp.FavoriteMovies;
    localStorage.setItem('FavoriteMovies', favs);
    this.snackbar.open('Added to favorites!', 'OK', {
      duration: 2000
    });
  });




}}