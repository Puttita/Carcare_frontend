import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
  ) { }

  getPromotion() {
    return this.http.get(ApiConstants.baseURl + '/managePromotion', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        const data = res['data']
          .map(promotion => {
            return {
              promotion_id: promotion['promotion_id'],
              detail: promotion['detail'],
              date_start: promotion['date_start'],
              date_end: promotion['date_end'],
              discount_percent: promotion['discount_percent']
            };
          });
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }
  createPromotion(data) {
    return this.http.post(ApiConstants.baseURl + '/managePromotion', data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  updatePromotion(data) {
    return this.http.put(ApiConstants.baseURl + `/managePromotion`, data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  deletePromotion(id) {
    return this.http.delete(ApiConstants.baseURl + `/managePromotion/${id}`)
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
}
