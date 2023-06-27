import { Component, OnInit, Input, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };  // This is the default value for the input fields

  // These are public so they can be accessed from the template
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar){}

ngOnInit(): void{
}

/**
 *@description This is the function responsible for sending the form inputs to the backend
  * @method registerUser
  * @returns confirmation of user registration
  * @memberof UserRegistrationFormComponent
**/
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe({
    next: (result) => {
      // Logic for a successful user Registation goes here! (To be implemented)
      this.dialogRef.close();
      console.log(result);
      console.log(this.userData);
      this.snackBar.open("User registered in successfully!", "OK", {
        duration: 2000,
      });
    },
    error: (result) => {
      console.log(result);
      this.snackBar.open('Error occurred during user registration.', 'OK', {
        duration: 2000,
      });
    },
  });
}

};


