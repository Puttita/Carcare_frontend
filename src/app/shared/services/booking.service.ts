import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
    private httpService: HttpClientService
  ) { }

  getBooking() {
    return this.http.get(ApiConstants.baseURl + '/booking', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map(res => {
        return {
          status: res['result'],
          data: res['data'][0]
        };
      })
    );
  }

  getBookingDetail(id) {
    return this.http.get(ApiConstants.baseURl + `/booking/detail/${id}`).pipe(
      map(res => ({
        status: res['result'],
        data: res['data'][0]
      })
      ));
  }

}
