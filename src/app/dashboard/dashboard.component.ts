import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('employeeaddForm', { static: false }) employeeaddForm: NgForm;
  public employeeData: any = {}
  userRole:any;

  constructor(private spinner: NgxSpinnerService
,    private _snackBar: MatSnackBar, private common_service: CommonService,private route:Router) { 
}

  ngOnInit() {
    this.userRole = localStorage.getItem('role')
  }



  saveEmployee() {
    if (this.employeeaddForm.invalid) {
      this._snackBar.open('Please fill all the fields!', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    } else {
      this.spinner.show();
      this.common_service.registerEmployee(this.employeeData).subscribe(data => {
        if (data.statusCode == 200) {
          this.spinner.hide();
          Swal.fire(
            'Done!',
            data.msg,
            'success'
          )
          this.route.navigateByUrl('/login', { skipLocationChange: true });
          setTimeout(() => this.route.navigate(['/dashboard']), 100);
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:data.msg,
          })
        }
        err => {
          console.log(err)
        }
      });
    }
  }

}
