import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { ManagePositionService } from './../../shared/services/manage-position.service';
import { Employee } from './../../shared/interfaces/employee';

import { Component, OnInit } from '@angular/core';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { Position } from 'src/app/shared/interfaces/position';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  public personal: any[];
  public cols: any[];
  public position: Position[];
  public msgs: Message[] = [];
  public employee: Employee;
  public employees: Employee[];
  public type: any[];
  constructor(
    private manageUser: ManageUserService,
    private confirmationService: ConfirmationService,
    private managerole: ManagePositionService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'employee_fname', header: 'ชื่อ-นามสุกล' },
      { field: 'employee_tel', header: 'เบอร์โทร' },
      { field: 'position_role', header: 'ตำแหน่ง' },
      { field: 'position_work', header: 'การทำงาน' },
      { field: 'create_datetime', header: 'วันที่สร้าง' },
    ];
    this.getAllEmployee();
    this.managerole.showPosition().subscribe(
      res => {
        console.log(res);
        if (res.status === 'Success') {
          this.type = res.data;
        }
      },
      err => {
        console.log(err['error']['message']);
      }
    )
  }

  getAllEmployee() {
    this.manageUser.getAllUsers().subscribe(res => {
      if (res['status'] === 'Success') {
        this.personal = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
  }
  delete(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการลบ',
      header: 'ข้อความจากระบบ',
      accept: () => {
        const index = this.personal.findIndex(e => e.employee_id === id);
        this.manageUser.deleteEmployee(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'Success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบสำเร็จ' });
              this.employees = [
                ...this.employees.slice(0, index),
                ...this.employees.slice(index + 1)
              ];
            }
          },
            (e) => {
              console.log(e['error']['message']);
              this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบไม่สำเร็จ' });
            }
          );
      },
      reject: () => {

      }
    });
  }
}
