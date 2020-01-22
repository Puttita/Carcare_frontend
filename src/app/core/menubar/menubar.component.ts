import { Router, ActivatedRoute } from '@angular/router';
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
  public personalId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.personalId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId');
    this.menubar();
    console.log(this.userId);

    this.authService.getRole().subscribe(res => this.role = res);
  }
  menubar() {
    this.items1 = [
      { label: 'จัดการเจ้าของร้าน', icon: 'pi pi-fw pi-users', routerLink: '/manageManager' },
    ];
    this.items2 = [
      { label: 'ข้อมูลส่วนตัว', icon: 'pi pi-fw pi-users', routerLink: ['/manageEmployee', this.userId]},
      { label: 'จัดการพนักงาน', icon: 'pi pi-fw pi-user-plus', routerLink: '/manageEmployee' },
      { label: 'จัดการประเภทรถ', icon: 'pi pi-fw pi-mobile', routerLink: '/car' },
      { label: 'จัดการบริการรถ', icon: 'pi pi-fw pi-mobile', routerLink: '/manageCarservice' },
      { label: 'จัดการอุปการณ์ล้างรถ', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/manageTool' },
      { label: 'จัดการโปรโมชั่น', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/managePromotion' },
      { label: 'จัดการการจองคิว', icon: 'pi pi-fw pi-users', routerLink: '/manageBooking' },
      { label: 'เบิกคืนอุปกรณ์ล้างรถ', icon: 'pi pi-fw pi-users', routerLink: '/withdraw' },
      { label: 'จัดการเบิกคืนอุปกรณ์ล้างรถ', icon: 'pi pi-fw pi-users', routerLink: '/manageWithdraw' },
      { label: 'ตารางคิว', icon: 'pi pi-fw pi-users', routerLink: '/schedule' },
      { label: 'จัดการพนักงานล้างรถ', icon: 'pi pi-fw pi-users', routerLink: '/manageChannel' },
    ];
    this.items3 = [
      { label: 'จัดการการจองคิว', icon: 'pi pi-fw pi-users', routerLink: '/manageBooking' },
    ];
  }

  showHomeMenu(...role) {
    return role.includes(this.role);

  }
}
