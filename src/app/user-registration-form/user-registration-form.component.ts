import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import userRegistartionService, { FetchApiDataService } from '../fetch-api-data.service';
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
registerUser(): void {
this.fetchApiData.userRegistration(this.userData).subscribe((response) =>  {
  
  this.dialogRef.close(); // This will close the modal on success!
  this.snackBar.open(response,'OK', {
    duration: 2000
  });
}, (response) => {
  this.snackBar.open(response ,'OK', {
    duration: 2000
  });
});
}
}
