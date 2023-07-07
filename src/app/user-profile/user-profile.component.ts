import { Component, OnInit, Input, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };  // This is the default value for the input fields

  // These are public so they can be accessed from the template
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar){}

ngOnInit(): void{}

 updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
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
      }
});

}}
