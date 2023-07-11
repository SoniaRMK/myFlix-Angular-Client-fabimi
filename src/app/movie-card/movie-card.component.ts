import { Component, OnInit } from '@angular/core';
import {FetchApiDataService} from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

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
  public snackBar: MatSnackBar,
 private sanitizer: DomSanitizer ){}


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


getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp.map((movie: any) => ({
      ...movie,
      imagePath: this.sanitizer.bypassSecurityTrustResourceUrl(movie.ImagePath),
    }));
    console.log(this.movies);
  });
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

addFavorite(_id: string): void {
  this.fetchApiData.addFavMovie(_id).subscribe((result) => {
    localStorage.setItem('user', JSON.stringify(result));
    this.snackBar.open('Movie added to favorites.', 'OK', {
      duration: 2000
    });
  });
}

/**
* Calls the check favorite movie method on the API.
* @param id The movie ID
*/
isFavorite(_id: string): boolean {
  return this.fetchApiData.isFavMovie(_id);
}

/**
 * Calls the delete favorite movie method on the API.
 * @param id The movie ID
 */
removeFavorite(movieId: string): void {
  this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((result) => {
    localStorage.setItem('user', JSON.stringify(result));
    this.snackBar.open('Movie removed from favorites.', 'OK', {
      duration: 2000
    });
  });
}

}