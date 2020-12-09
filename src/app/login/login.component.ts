import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  public loginData : any = {}
  constructor(private _snackBar: MatSnackBar, private route : Router) { }

  ngOnInit() {
  }

  login() {
    if(this.loginForm.invalid){
      this._snackBar.open('Please fill all the fields!', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }else{
      if(this.loginData.userName == 'admin' && this.loginData.userPassword == 'admin'){
        this.route.navigate(['/dashboard'])
      }else{
        this._snackBar.open('Invalid Credentials', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    }
  }

}
