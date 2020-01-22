import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagePositionService {

  constructor(
    private authservice: AuthService,
    private http: HttpClientService
  ) { }

  getRoleStatus() {
    return this.authservice.getRole().getValue() === 'manager' ? true : false;
  }

  getPosition() {
    if (this.authservice.getRole().getValue() === 'manager') {
      return [
        {
          position_id: 4,
          position_role: 'cleaner'
        },
        {
          position_id: 3,
          position_role: 'cashier'
        },
        {
          position_id: 2,
          position_role: 'manager'
        },
        {
          position_id: 1,
          position_role: 'admin'
        },
      ];
    } else {
      return [
        {
          postition_id: null,
          position_role: ''
        }
      ]
    }
  }
  showPosition() {
    return this.http.get(ApiConstants.baseURl + '/position')
      .pipe(
        map((res: any[]) => {
          return res['data'].map(data => {
            console.log(res['data']);
            return {
              position_id: data['position_id'],
              position_role: data['position_role'],
              position_work: data['position_work'],
              role: data['position_role'] + ' ' + data['position_work']
            };
          });
        })
      );
  }

}
