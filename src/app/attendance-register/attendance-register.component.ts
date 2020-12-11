import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
declare var $:any;
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-attendance-register',
  templateUrl: './attendance-register.component.html',
  styleUrls: ['./attendance-register.component.css']
})
export class AttendanceRegisterComponent implements OnInit {
  @ViewChild('employeeaddForm', { static: false }) employeeaddForm: NgForm;
  public employeeData = {startDate:"",endDate:"",empName:""}
  fromDate:any;
  toDate:any;
  finalTodate:any;
  test:any
  employeeNamesArray: any =[];
  today: Date;
  constructor(private _snackBar: MatSnackBar, private common_service: CommonService, private route: Router,private spinner:NgxSpinnerService) { }
  ngOnInit() {
    this.getAllEmployee();
    this.today = new Date()
  }

  saveSlot(){
  if(this.employeeaddForm.invalid){
    this._snackBar.open('Please fill all the fields!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }else{
    this.spinner.show();
    this.common_service.saveSlot(this.employeeData).subscribe(data => {
      if (data.statusCode == 200) {
        this.spinner.hide();
        Swal.fire(
          'Done!',
          data.msg,
          'success'
        )
        this.route.navigateByUrl('/dashboard', { skipLocationChange: true });
        setTimeout(() => this.route.navigate(['/attendance']), 100);
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

  getAllEmployee(){
    this.spinner.show()
    this.common_service.getEmployees().subscribe(data => {
      if (data.statusCode == 200) {
        this.spinner.hide();
        for (let index = 0; index < data.data.length; index++) {
          this.employeeNamesArray.push(data.data[index]._id)
        }

      } else {
       console.log(data.msg)
      }
      err => {
        console.log(err)
      }
    });
  }
}