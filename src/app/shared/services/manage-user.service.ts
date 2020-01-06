import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpClientService
  ) { }

  getUser(id) {
    return this.http.get(ApiConstants.baseURl + `/manageEmployee/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        return {
          status: res['result'],
          data: res['data'][0]
        };
      })
    );
  }
  createEmployee(dataUser) {
    return this.http.post(ApiConstants.baseURl + '/manageEmployee',
      dataUser, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
        };
      }
      )
    );

  }
  getAllUsers() {
    return this.http.get(ApiConstants.baseURl + '/manageEmployee', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        const data = res['data']
          .map(employee => {
            return {
              employee_id: employee['employee_id'],
              employee_fname: employee['employee_fname'],
              employee_lname: employee['employee_lname'],
              employee_tel: employee['employee_tel'],
              position_id: employee['position_id'],
              position_role: employee['position_role'],
              position_work: employee['position_work'],
              create_datetime: employee['create_datetime']
            };
          });
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }
  deleteEmployee(id) {
    return this.http.delete(ApiConstants.baseURl + `/manageEmployee/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result']
        };
      })
    );
  }
}
