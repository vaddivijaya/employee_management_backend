import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @Input() employee!: Employee; // Input property to receive the employee details
  @Output() update: EventEmitter<Employee> = new EventEmitter<Employee>(); // Output event to emit updated employee details
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(); // Output event to cancel modification
  employeedetails:Employee={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  };
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,private router: Router,private route:ActivatedRoute ,private es:EmployeeService) {
  
  }

  func(id:string){

    if(id){
      this.es.getemployee(id).subscribe({
        next:(response)=>{this.employeedetails=response;
        console.log("Hi");
        }
      }) 
    }
    
  }

  ngOnInit(): void {
    this.loadEmployees();
    
  }

  
  openEditEmployeePopup(id: string) {
    this.router.navigate(['/edit-employee', id]);
  }

  

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        this.employees = this.employees.filter(emp => emp !== employee);
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      }
    });
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