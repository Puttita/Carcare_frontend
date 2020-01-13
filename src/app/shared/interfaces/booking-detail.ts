import { Time } from '@angular/common';
export interface BookingDetail {
  booking_detail_id?: number;
  total?: number;
  time_duration?: Time;
  clean_service_id?: number;
  reserv_id?: number;
  service_name?: string;
  service_price?: number;
  service_duration?: Time;

}

