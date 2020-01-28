import { BookingService } from 'src/app/shared/services/booking.service';
import { CleanService } from 'src/app/shared/interfaces/clean-service';
import { Car } from 'src/app/shared/interfaces/car';
import { TypeCar } from 'src/app/shared/interfaces/type-car';
import { Booking } from 'src/app/shared/interfaces/booking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Pipe } from '@angular/core';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})

export class BookingFormComponent implements OnInit {
  public form: FormGroup;
  public booking: Booking[];
  public type: Car[];
  public car: Car[];
  public model: Car[];
  public clean: CleanService[];
  public selectCar: any[];
  public sum_price: number;
  public sum_time: string;
  public bookingDate: string;
  public bookingTime: string;
  public urlback: string;
  Date: Date;
  constructor(
    private formBuilder: FormBuilder,
    private manageCar: ManageCarcareService,
    private router: Router,
    private manageBooking: BookingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getBrandCar();
  }
  createForm() {
    this.form = this.formBuilder.group(
      {
        reserv_date: ['', Validators.required],
        reserv_time: ['', Validators.required],
        name: ['', Validators.required],
        license: ['', Validators.required],
        size: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        service: ['', Validators.required],
        total_price: [''],
        duration: [''],
        end_date: ['']
      }
    );
  }

  getBrandCar() {
    this.manageCar.getBrand().subscribe(
      res => {
        if (res.status === 'Success') {
          this.car = res.data.map(res => {
            return {
              car_id: res.car_id,
              brand: res.brand,
            };
          });
        }
      },
      err => {
        console.log(err.error['message']);
      }
    );
  }
  getModelCar(data) {
    console.log(data);
    this.manageCar.getModel(data['value']['car_id']).subscribe(
      res => {
        if (res.status === 'Success') {
          this.model = res.data.map(res => {
            return {
              car_detail_id: res.car_detail_id,
              model: res.model,
              type_car_id: res.type_car_id,
              size: res.size
            };
          });
        }
      },
      err => {
        console.log(err.error['message']);
      }
    );
  }
  getModelById(id) {
    console.log(id);
    this.manageCar.getSizeById(id.value.car_detail_id).subscribe(
      res => {
        if (res.status === 'Success') {
          this.type = res.data.map(res => {
            return {
              type_car_id: res.type_car_id,
              size: res.size
            };
          });
        }
      },
      err => {
        console.log(err.error['message']);
      }
    );

    this.manageCar.getServiceId(id.value.type_car_id).subscribe(res => {
      if (res.status === 'Success') {
        this.clean = res.data.map(res => {
          console.log(res.data);
          return {
            clean_service_detail_id: res.clean_service_detail_id,
            service_name: res.service_name,
            service_price: res.service_price,
            service_duration: res.service_duration,
            data: res.service_name + '  ' + res.service_price + '  ' + 'บาท'
          };
        });
      }
      console.log(this.clean);
    },
      (e) => console.log(e.error['message'])
    );
  }
  showCar(e) {
    if (this.selectCar.length === 0 || this.selectCar === []) {
      return this.sum_price = null, this.sum_time = '';
    }
    let sum = this.selectCar.reduce((total, num) => {
      let s = moment.duration(num.service_duration).asSeconds();
      return {
        service_price: total.service_price + num.service_price,
        service_duration: moment(total.service_duration, 'HH:mm:ss').add(s, 'seconds').format('HH:mm:ss')
      };
    });
    this.sum_price = sum.service_price;
    this.sum_time = sum.service_duration;
  }
  save() {
    // วันที่จอง
    const start = moment(this.bookingDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    let date = this.form.get('reserv_date').value;;
    date = start;
    console.log(date);
    // เวลาที่จอง
    const t = moment(this.bookingTime, 'HH:mm:ss').format('HH:mm:ss');
    let time = this.form.get('reserv_time').value;
    time = t;
    console.log(time);
    // เวลาที่เสร็จ
    let s = moment.duration(this.sum_time).asSeconds();
    let end_time = moment(time, 'HH:mm:ss').add(s, 'seconds').format('HH:mm:ss');
    let duration = this.form.get('end_date').value;
    duration = end_time;
    console.log(duration);

    const total = this.sum_price;
    let price = this.form.get('total_price').value;
    price = total;

    const booking = {
      reserv_date: date,
      reserv_time: time,
      name: this.form.get('customer_name').value,
      license: this.form.get('license').value,
      total_price: price,
      duration: duration,
      size: this.form.get('size').value,
      brand: this.form.get('brand').value,
      model: this.form.get('model').value,
      service: this.form.get('service').value,
    };
    console.log(booking);

    this.manageBooking.booking(booking).subscribe(
      res => {
        if (res['status'] === 'Success') {
          this.showSuccess();
        } else {
          this.showError();
        }
      }
    )

  }
  cancel() {
    this.router.navigateByUrl('/manageBooking');
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'จองสำเร็จ' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'จองไม่สำเร็จ' });
  }

}
