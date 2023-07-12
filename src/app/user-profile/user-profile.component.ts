import { Component, OnInit, Input, } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']

})
export class UserProfileComponent {

  user: any = {};
  favoriteMovies: any = [];
  movies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavMovies: [] };  // This is the default value for the input fields

  // These are public so they can be accessed from the template
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { if (!localStorage.getItem("token")) this.router.navigate(['welcome'])
   }

  ngOnInit(): void {
    this.getProfile();
    this.getMovies();
    
   }



/**
 * @description This method gets the user profile from the database
 * @method getProfile
 * @returns user profile
 */

getProfile(): void {
  this.userData = JSON.parse(localStorage.getItem('user') || "{}");
    console.log(this.userData);
   

}

/**
 * @description This method allows the user to edit their profile
 * @method editUser
 * @returns updated user profile
 */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log(this.userData);
        this.snackBar.open("User successfully updated", "OK", {
          duration: 2000,
        });
      },
      error: (result) => {
        console.log(result);
        this.snackBar.open('Error occurred during user update.', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  /**
   * @description This method allows the user to delete their profile
   * @method deleteUser
   * @returns confirmation of user profile deletion
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe({
      next: (result) => {
      localStorage.clear(),
      console.log(result);
        this.router.navigate(['welcome']);
        this.snackBar.open("User deleted successfully!", "OK", {
          duration: 2000
        });

      },
    });
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.favoriteMovies = this.userData.FavMovies.map((movieId: string) => {
        const movie = this.movies.find((m: any) => m._id === movieId);
        return {
          id: movie._id,
          name: movie.title
        };
      });
    });
  }

   
  }