import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Booking } from 'src/app/shared/interfaces/booking';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  public book: Booking;
  public bookId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.getData();
    this.initBooking();
    console.log(this.bookId);

  }
  private getData() {
    this.route.params.pipe(switchMap(param =>
      this.bookingService.getBookingDetail(param.id)
    )).subscribe(res => {
      console.log(res);
      if (res.status === 'Success') {
        this.book = res['data'];
      }
    });
  }

  private initBooking() {
    this.book = {
      booking_detail_id: null,
      customer_name: '',
      license: '',
      total_price: null,
      reserv_date: null,
      start_date: null,
      end_date: null,
      reserv_status: null,
      employee_id: null,
      members_id: null,
      car_wash_id: null,
      promotion_id: null,
      employee_fname: '',
      employee_lname: '',
      car_wash_name: '',
      total: null,
      time_duration: null,
      clean_service_id: null,
      service_name: '',
      service_price: null,
      service_duration: null,
    };
  }
}
