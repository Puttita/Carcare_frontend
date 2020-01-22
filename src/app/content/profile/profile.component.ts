import { Position } from 'src/app/shared/interfaces/position';
import { Employee } from './../../shared/interfaces/employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData: any[];
  public userId: string;
  public form: FormGroup;
  public displayDialog: boolean;
  public employee: Employee;
  public msgs: Message[] = [];
  // NGModel
  public fname: string;
  public lname: string;
  public tel: string;
  public role: Position;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageUser: ManageUserService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getData();
    this.userId = localStorage.getItem('userId');
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        tel: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        role: ['', Validators.required],
      }
    );
  }
  getData() {
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getProfile(id).subscribe(
        res => {
          if (res['status'] === 'Success') {
            this.userData = res['data'][0];
            console.log(res['data'][0]);
          }
        },
        (err) => {
          console.log(err['error']['message']);
        }
      );
    });
  }
  showEdit(id) {
    console.log(id);

    this.employee = this.userData.filter(e => e.employee_id === id)[0];
    this.fname = this.employee['employee_fname'];
    this.lname = this.employee['employee_lname'];
    this.tel = this.employee['employee_tel']
    this.displayDialog = true;
  }
  update() {
    // this.msgs = [];
    // this.confirmationService.confirm({
    //   message: 'ยืนยันการแก้ไข',
    //   header: 'ข้อความจากระบบ',
    //   accept: () => {
    //     const time = formatDate(this.duration, 'h:mm:ss', 'en')
    //     const data = {
    //       clean_service_id: this.service['clean_service_id'],
    //       service_name: this.name,
    //       service_price: this.price,
    //       service_duration: time,
    //       type_car_id: this.size['type_car_id']
    //     };
    //     console.log(data);
    //     this.manageCar.updateService(data)
    //       .subscribe(res => {
    //         if (res['status'] === 'Success') {
    //           this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
    //           const index = this.clean.findIndex(e => e.clean_service_id === res['data']['clean_service_id']);
    //           // this.car[index].brand = res['data']['brand'];
    //         }
    //       },
    //         (e) => {
    //           console.log(e['error']['message']);
    //           this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการไม่สำเร็จ' });
    //         }
    //       );
    //     this.clear();
    //   },
    //   reject: () => {

    //   }
    // });
  }

  clear() {
    this.employee = {};
    this.displayDialog = false;
    this.form.reset();
  }
}
