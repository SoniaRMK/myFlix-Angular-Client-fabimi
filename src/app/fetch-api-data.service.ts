import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://fabian-movie-api.onrender.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * @description This is the class that makes the API call to the server
 * @class FetchApiDataService
 */
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  /**
   *@description This is the function that makes the API call for the user registration endpoint 
   *@param userDetails 
   **/
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    // post user details to the API
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @description This is the function that makes the API call for the user login endpoint
   * @param userDetails 
   **/
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);

    // post user details to the API
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  // Non-typed response extraction
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }


  /**
   *@description This is the function that fetches all movies from the API
    * @method getAllMovies
    * @returns list of movies
    * @memberof MovieCardComponent
    * @param token
  **/
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @description This is the function that fetches a single movie from the API
   * @param movieTitle 
   * @returns movie object
   **/
  getMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

/**
 * @description This is the function that fetches a single director from the API
 * @param directorName 
 * @returns director object
 * @method getDirector
 **/
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * @description This is the function that fetches a single genre from the API
   * @param genreName 
   * @returns  genre object
   * @method getGenre
   **/
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


/**
 * @description This is the function that adds a movie to the list of favourite movies
 * @param movieId 
 * @returns updated user object with new favourite movie
 * @method addFavMovie
 **/
  addFavMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   *@description This is the function hat asks the API if a movie is in the list of favourite movies
   * @param movieId 
   * @returns returns true or false
   * @method isFavMovie
   **/
  isFavMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

/**
 * @description This is the function that updates userdata in the database
 * @param updatedUser 
 * @returns updated user object
 * @method editUser
 **/
  // Making the api call for the edit user endpoint
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

 /**
  * @description This is the function that deletes a user from the database
  * @returns user object
  * @method deleteUser
  * 
  **/
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @description This is the function that deletes a movie from the list of favourite movies
   * @param movieId 
   * @returns  updated user object
   * @method deleteFavoriteMovie
   **/
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.FavoriteMovies.indexOf(movieId);
    console.log(index);
    if (index > -1) { // only splice array when item is found
      user.FavoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


}



