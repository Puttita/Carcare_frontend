import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagePositionService {

  constructor(
    private authservice: AuthService
  ) { }

  getPosition() {
    if (this.authservice.getRole().getValue() === 'admin') {
      return [
        {
          position_id: 4,
          position_role: 'cleaner'
        },
        {
          position_id: 3,
          position_role: 'cashier'
        },
        {
          position_id: 2,
          position_role: 'manager'
        },
        {
          position_id: 1,
          position_role: 'admin'
        },
      ];
    } else {
      return [
        {
          postition_id: null,
          position_role: ''
        }
      ]
    }
  }
}
