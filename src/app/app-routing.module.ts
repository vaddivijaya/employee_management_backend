import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ModifyEmployeeComponent } from './modify-employee/modify-employee.component';


const routes: Routes = [
  {
    path:'',component:EmployeesComponent
  },
  {
    path:'employees',component:EmployeesComponent
  },
  {
    path:'employees/add',component:AddEmployeeComponent
  },
  {
    path:'employees/edit/:id',component:ModifyEmployeeComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
