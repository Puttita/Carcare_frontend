import { Time } from '@angular/common';
export interface Booking {
  reserv_id?: number;
  customer_name?: string;
  license?: string;
  total_price?: number;
  reserv_date?: Date;
  start_date?: Date;
  end_date?: Date;
  reserv_status?: number;
  employee_id?: number;
  members_id?: number;
  car_wash_id?: number;
  promotion_id?: number;
  employee_fname?: string;
  employee_lname?: string;
  car_wash_name?: string;
  booking_detail_id?: number;
  total?: number;
  time_duration?: Time;
  clean_service_id?: number;
  service_name?: string;
  service_price?: number;
  service_duration?: Time;
}
