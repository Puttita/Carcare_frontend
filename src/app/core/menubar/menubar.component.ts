import { ManagePositionService } from './../../shared/services/manage-position.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  items1: MenuItem[];
  items2: MenuItem[];
  items3: MenuItem[];

  public userId: string;
  public role: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.menubar();
    this.userId = localStorage.getItem('userId');
    this.authService.getRole().subscribe(res => this.role = res);
  }
  menubar() {
    this.items1 = [
      { label: 'จัดการเจ้าของร้าน', icon: 'pi pi-fw pi-users', routerLink: '/manageManager' },
    ];
    this.items2 = [
      { label: 'ข้อมูลส่วนตัว', icon: 'pi pi-fw pi-users', routerLink: 'profile' },
      { label: 'จัดการพนักงาน', icon: 'pi pi-fw pi-user-plus', routerLink: '/manageEmployee' },
      { label: 'จัดการประเภทรถ', icon: 'pi pi-fw pi-mobile', routerLink: '/manageTypecar' },
      { label: 'จัดการบริการรถ', icon: 'pi pi-fw pi-mobile', routerLink: '/manageCarservice' },
      { label: 'จัดการอุปการณ์ล้างรถ', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/manageTools' },
      { label: 'จัดการโปรโมชั่น', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/managePromotion' },
    ];
    this.items3 = [
      { label: 'จัดการการจองคิว', icon: 'pi pi-fw pi-users', routerLink: '/manageBooking' },
    ];
  }

  showHomeMenu(...role) {
    return role.includes(this.role);

  }
}
