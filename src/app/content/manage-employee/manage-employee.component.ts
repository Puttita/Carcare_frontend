import { Employee } from './../../shared/interfaces/employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  public personal: any[];
  public cols: any[];
  public form: FormGroup;
  public displayDialog: boolean;
  public newEmp: boolean;
  public employee: Employee;

  constructor(
    private manageUser: ManageUserService,
    private formBuilder: FormBuilder
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
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      tel: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      role: ['', Validators.required],
      work: [''],
    })
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

  addEmployee() {
    this.newEmp = true;
    this.employee = {},
      this.displayDialog = true;
  }
  onReset() {
    this.form.reset();
    this.displayDialog = false;
}
}
