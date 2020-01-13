import { Booking } from './../../shared/interfaces/booking';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Router } from '@angular/router';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  date: Date;
  public cols: any[];
  public book: any[];
  public form: FormGroup;
  public detail: Booking;
  constructor(
    private booking: BookingService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'ชื่อผู้จอง' },
      { field: 'reserv_date', header: 'วันที่จอง' },
      { field: 'dateTime', header: 'เวลาที่จอง' },
      { field: 'car', header: 'ข้อมูลรถ' },
      { field: 'service', header: 'บริการ' },
      { field: 'price', header: 'ค่าบริการ' },
      { field: 'duration', header: 'ระยะเวลาบริการ' },
    ];
    this.getAllBooking();
  }
  getAllBooking() {
    this.booking.getBooking().subscribe(res => {
      if (res['status'] === 'Success') {
        this.book = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
  }
  public onRowSelect(e) {
    const book: Booking = e.data;
    console.log(e.data);
    this.router.navigate(['/manageBooking/detail',book.reserv_id]);
  }


}
