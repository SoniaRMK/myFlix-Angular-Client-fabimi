import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent {
  directors: any[] = [];
  movies: any[] = [];
  constructor (public fetchApiData: FetchApiDataService){}
  
  
  
  /**
   * 
   * @method getMovies
   * @description gets the list of movies from the API
   * @returns list of movies
   * @memberof MovieCardComponent
   */
  getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe(
      (resp: any) => {
        this.directors = resp;
        console.log(this.directors);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }}