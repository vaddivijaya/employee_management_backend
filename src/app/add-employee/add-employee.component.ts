import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  addemployeerequest:Employee={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  }
constructor(private employeeservice:EmployeeService,private router:Router){}
ngOnInit(){
console.log("HI");
}
addEmployee(){
  console.log(this.addemployeerequest);
this.employeeservice.addemployee(this.addemployeerequest).subscribe({
  next:(employee)=>{
    this.router.navigate(['employees']);

}})

}

}
