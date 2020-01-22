import { CleanService } from 'src/app/shared/interfaces/clean-service';
import { Car } from 'src/app/shared/interfaces/car';
import { TypeCar } from 'src/app/shared/interfaces/type-car';
import { Booking } from 'src/app/shared/interfaces/booking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Pipe } from '@angular/core';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})

export class BookingFormComponent implements OnInit {
  public form: FormGroup;
  public booking: Booking[];
  public type: TypeCar[];
  public car: Car[];
  public model: Car[];
  public detail: boolean;
  public clean: CleanService[];
  public selectCar: any[];
  public sum_price: number;
  public sum_time: string;
  public bookingDate: string;
  public urlback: string;
  Date: Date;
  constructor(
    private formBuilder: FormBuilder,
    private manageCar: ManageCarcareService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getSizeCar();
    this.createForm();
    this.getBrandCar();
    this.getAllService();

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
        total: [''],
        duration: ['']
      }
    );
  }

  getSizeCar() {
    this.manageCar.showTypeCar().subscribe(
      res => {
        console.log(res);
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
  }
  checkDate() {
    this.detail = false;
  }

  getBrandCar() {
    this.manageCar.getBrand().subscribe(
      res => {
        if (res.status === 'Success') {
          this.car = res.data.map(res => {
            console.log(res);
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
    this.manageCar.getModel(data.value.brand).subscribe(
      res => {
        if (res.status === 'Success') {
          this.car = res.data.map(res => {
            console.log(res.data);
            return {
              car_id: res.car_id,
              model: res.model,
            };
          });
        }
      },
      err => {
        console.log(err.error['message']);
      }
    );
  }

  getAllService() {
    this.manageCar.getService().subscribe(res => {
      if (res.status === 'Success') {
        this.clean = res.data.map(res => {
          console.log(res.service_price);
          return {
            clean_service_id: res.clean_service_id,
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
    console.log(this.bookingDate);

    const start_time = this.form.get('reserv_date').value;
    const end_time = this.form.get('duration').value;
    let s = moment.duration(end_time).asSeconds();
    const time = moment(start_time, 'HH:mm:ss').add(this.sum_time, 'seconds').format('HH:mm:ss');
    console.log(time);

    const booking = {
      reserv_date: this.form.get('reserv_date').value,
      reserv_time: this.form.get('start_date').value,
      name: this.form.get('customer_name').value,
      license: this.form.get('license').value,
      total: this.form.get('total_price').value,
      duration: this.form.get('end_date').value
    }
  }
  cancel() {
    this.router.navigateByUrl('/manageBooking');
  }
}
