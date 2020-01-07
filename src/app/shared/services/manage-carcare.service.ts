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
  showTypeCar() {
    return this.http.get(ApiConstants.baseURl + '/manageTypecar')
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data']
          };
        })
      );
  }
  getCar() {
    return this.http.get(ApiConstants.baseURl + '/car', {
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
  createCar(data) {
    return this.http.post(ApiConstants.baseURl + '/car', data)
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
    return this.http.put(ApiConstants.baseURl + `/car`, data)
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
    return this.http.delete(ApiConstants.baseURl + `/car/${id}`)
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
      map(res => {
        return {
          status: res['result'],
          data: res['data'][0]
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
  updateService(data) {
    return this.http.put(ApiConstants.baseURl + `/manageCleanservice`, data)
      .pipe(
        map(res => {
          return {
            status: res['result'],
            data: res['data'][0]
          };
        })
      );
  }
  deleteService(id) {
    return this.http.delete(ApiConstants.baseURl + `/manageCleanservice/${id}`)
      .pipe(
        map(res => {
          return {
            status: res['result']
          };
        })
      );
  }
}
