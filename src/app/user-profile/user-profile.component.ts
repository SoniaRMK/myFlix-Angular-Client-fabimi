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

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };  // This is the default value for the input fields

  // These are public so they can be accessed from the template
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getProfile();
   }


getProfile(): void {
  this.userData = JSON.parse(localStorage.getItem('user') || "{}");
    console.log(this.userData);
   

}


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
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }
}
