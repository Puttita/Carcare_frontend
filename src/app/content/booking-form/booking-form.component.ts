import { Car } from 'src/app/shared/interfaces/car';
import { TypeCar } from 'src/app/shared/interfaces/type-car';
import { Booking } from 'src/app/shared/interfaces/booking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private manageCar: ManageCarcareService,
  ) { }

  ngOnInit() {
    this.getSizeCar();
    this.createForm();

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
    )
  }
  getSizeCar() {
    this.manageCar.showTypeCar().subscribe(
      res => {
        console.log(res);
        if (res.status === 'Success') {
          this.type = res['data'].map(res => {
            return {
              type_car_id: res['type_car_id'],
              size: res['size']
            };
          });
        }
      },
      err => {
        console.log(err['error']['message']);
      }
    );
  }
  getBrandCar(id) {
    console.log(id);
    this.manageCar.getCarId(id.value.type_car_id).subscribe(
      res => {
        console.log(id.value.type_car_id);
        if (res['status'] === 'Success') {
          this.car = res['data'].map(res => {
            console.log(...res);
            return {
              car_id: res['car_id'],
              brand: res['brand']
            };
          });
        }
      },
      err => {
        console.log(err['error']['message']);
      }
    )
  }
}
