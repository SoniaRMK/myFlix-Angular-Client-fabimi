import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';




@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent  implements OnInit{

  // This is the default value for the input fields
  @Input() userData = { Username: '', Password: '' };

  // These are public so they can be accessed from the template
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

    //ngOnInit is a lifecycle hook that runs when the component initializes. Its main purpose is to fetch the list of movies from the API.
  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)
      //
      this.dialogRef.close();
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      console.log(result);
      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
  

}
