import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Employee } from './Models/employee.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
baseApiUrl:string =environment.baseApiUrl;
  constructor(private http:HttpClient) { }
  getAllEmployees(): Observable<Employee[]>{
  return this.http.get<Employee[]>(this.baseApiUrl+'/api/employees');
  }
  addemployee(addemployeerequest:Employee): Observable<Employee>{
    addemployeerequest.id='01234567-89ab-cdef-0123-456789abcdef';
     return this.http.post<Employee>(this.baseApiUrl+'/api/employees',addemployeerequest);
  }
  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/api/employees/${employeeId}`);
  }
  getemployee(id:string):Observable<Employee>{
    return this.http.get<Employee>(this.baseApiUrl+'/api/employees/'+id)
  }
  updateemployee(id:string, updateemployeereq:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.baseApiUrl+'/api/employees/'+id,updateemployeereq);
  }
}
