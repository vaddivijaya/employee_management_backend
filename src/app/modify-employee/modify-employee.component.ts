import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrl: './modify-employee.component.css'
})
export class ModifyEmployeeComponent {
  employeedetails:Employee={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  };
  @Input() employee!: Employee; // Input property to receive the employee details
  @Output() update: EventEmitter<Employee> = new EventEmitter<Employee>(); // Output event to emit updated employee details
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(); // Output event to cancel modification
  constructor(private route:ActivatedRoute ,private es:EmployeeService,private router:Router){
    
  }
ngOnInit():void{
this.route.paramMap.subscribe({
  next:(params)=>{
    const id=params.get('id');

    if(id){
      this.es.getemployee(id).subscribe({
        next:(response)=>{this.employeedetails=response;

        }
      })
    }
  }
})
}
updateEmployee(){
  this.es.updateemployee(this.employeedetails.id,this.employeedetails).subscribe({
    next:(response)=>{
      this.router.navigate(['employees']);
    }
  });
}
closePopup() {
  // Logic to close the pop-up
}
}
