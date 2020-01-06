import { Time } from '@angular/common';

export interface CleanService {
  clean_service_id?: number;
  service_name?: string;
  service_price?: number;
  service_duration?: Time;
  type_car_id?: number;
  size?: string;
}
