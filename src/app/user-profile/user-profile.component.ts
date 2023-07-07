import { Component, OnInit, Input, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', favoriteMovies: [], };  // This is the default value for the input fields

  // These are public so they can be accessed from the template
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getProfile();
   }


getProfile(): void {
  const user = localStorage.getItem('user');
  this.fetchApiData.getUser(user).subscribe((resp: any) => {
    this.userData = resp;
    console.log(this.userData);
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: { _id: any; }) => this.user.Fav_Movies.indexOf(m._id) >= 0);
    });
  });
}


  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (result) => {

        console.log(result);
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
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigate(['welcome']);
        this.snackBar.open("User deleted successfully!", "OK", {
          duration: 2000
        });

      },
    });
  }
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }
}
