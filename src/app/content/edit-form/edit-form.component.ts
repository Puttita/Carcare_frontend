import { ConfirmationService, MessageService } from 'primeng/api';
import { Position } from 'src/app/shared/interfaces/position';
import { ManagePositionService } from './../../shared/services/manage-position.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  public form: FormGroup;
  public displayDialog: boolean;
  public urlback: string;
  public messageback: string;
  public showRole: boolean;
  public position: Position[];
  public role: any[];
  public registerSuccess: boolean;
  public showCancelMessage: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private positionService: ManagePositionService,
    private confirmationService: ConfirmationService,
    private manageUserService: ManageUserService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.showRole = this.positionService.getRoleStatus();
    this.position = this.positionService.getPosition();
    this.urlback = this.route.snapshot.data.urlback;
    this.positionService.showPosition().subscribe(
      res => {
        this.role = res;
      },
      err => {
        console.log(err['error']['message']);
      }
    )
  }
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      tel: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      role: ['', Validators.required],
      work: ['']
    })
  }

  onReset() {
    this.form.reset();
    this.displayDialog = false;
    this.router.navigateByUrl(`/manageEmployee`);
  }
  // url กลับหน้าจัดการ
  setBack() {
    this.urlback = this.route.snapshot.data.urlback;
    this.messageback = this.route.snapshot.data.messageback;
  }

  onSubmit(e) {
    e.preventDefault();
    this.confirmationService.confirm({
      message: 'ยืนยันการเพิ่มพนักงาน',
      header: 'ข้อความจากระบบ',
      accept: () => {
        const positionCode = this.form.get('role').value;
        const dataEmp = {
          employee_username: this.form.get('username').value,
          employee_password: this.form.get('password').value,
          employee_fname: this.form.get('fname').value,
          employee_lname: this.form.get('lname').value,
          employee_tel: this.form.get('tel').value,
          create_datetime: new Date(Date.now()),
          position_id: parseInt(positionCode.position_id),
        };
        this.manageUserService.createEmployee(dataEmp).subscribe(
          res => {
            if (res['status'] === 'Success') {
              this.showToast('alertMessage', 'เพิ่มพนักงานสำเร็จ');
              this.router.navigateByUrl(this.urlback);
            } else {
              this.showToast('alertMessage', 'เพิ่มพนักงานไม่สำเร็จ');
            }
          },
          err => {
            this.showToast('alertMessage', err.error['errorMessage']);
          }
        );
      }
    });
  }
  showToast(key, detail) {
    this.messageService.clear();
    this.messageService.add(
      {
        key: key,
        sticky: true,
        summary: 'ข้อความจากระบบ',
        detail: detail
      }
    );
  }
  onReject() {
    if (this.registerSuccess) {
      this.router.navigateByUrl(this.urlback);
    }
    this.messageService.clear('systemMessage');
    this.showCancelMessage = false;
  }
}
