import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ManageCarcareService {

  constructor(
    private http: HttpClient,
    private httpService: HttpClientService
  ) { }

  getCar() {
    return this.http.get(ApiConstants.baseURl + '/manageTypecar', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        console.log(res['data'])
        const data = res['data']
          .map(type_car => {
            return {
              type_car_id: type_car['type_car_id'],
              size: type_car['size'],
              brand: type_car['brand'],
              model: type_car['model'],
            };
          });
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }
  createCar(data) {
    return this.http.post(ApiConstants.baseURl + '/manageTypecar', data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  updateCar(data) {
    return this.http.put(ApiConstants.baseURl + `/manageTypecar`, data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  deleteCar(id) {
    return this.http.delete(ApiConstants.baseURl + `/manageTypecar/${id}`)
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }

  getTools() {
    return this.http.get(ApiConstants.baseURl + '/manageTool', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        const data = res['data']
          .map(wash_tool => {
            return {
              wash_tool_id: wash_tool['wash_tool_id'],
              tool_name: wash_tool['tool_name'],
              amount: wash_tool['amount'],
            };
          });
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }

  createTool(data) {
    return this.http.post(ApiConstants.baseURl + '/manageTool', data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }

  updateTool(data) {
    return this.http.put(ApiConstants.baseURl + `/manageTool`, data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  deleteTool(id) {
    return this.http.delete(ApiConstants.baseURl + `/manageTool/${id}`)
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
  getService() {
    return this.http.get(ApiConstants.baseURl + '/manageCleanservice', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(
      map((res) => {
        const data = res['data']
          .map(clean_service => {
            return {
              clean_service_id: clean_service['clean_service_id'],
              service_name: clean_service['service_name'],
              service_price: clean_service['service_price'],
              service_duration: clean_service['service_duration'],
              type_car_id: clean_service['type_car_id'],
            };
          });
        return {
          status: res['result'],
          data: data
        };
      })
    );
  }


  createService(data) {
    return this.http.post(ApiConstants.baseURl + '/manageCleanservice', data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
}
