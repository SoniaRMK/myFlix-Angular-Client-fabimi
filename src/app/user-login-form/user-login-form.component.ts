import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  // This is the default value for the input fields
  @Input() userData = { Username: '', Password: '' };


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }


  //ngOnInit is a lifecycle hook that runs when the component initializes. Its main purpose is to fetch the list of movies from the API.
  ngOnInit(): void {
  }

  /**
    *@description This is the function responsible for sending the form inputs to the backend
    * @method loginUser
    * @returns confirmation of login success or failure
    * @memberof UserLoginFormComponent
  * */
  loginUser(): void {

    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        //
        this.dialogRef.close();
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        console.log(result);

        this.snackBar.open("User logged in successfully!", "OK", {
          duration: 2000,
        });
        this.router.navigate(['movies']);

      },
      error: (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 2000,
        });
      },
    });
  }


}
