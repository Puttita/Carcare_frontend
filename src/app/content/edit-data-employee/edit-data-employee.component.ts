import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';
import { ManagePositionService } from 'src/app/shared/services/manage-position.service';

@Component({
  selector: 'app-edit-data-employee',
  templateUrl: './edit-data-employee.component.html',
  styleUrls: ['./edit-data-employee.component.css']
})
export class EditDataEmployeeComponent implements OnInit {
  public formEdit: FormGroup;
  public personalId: string;
  public position: Position[];
  public role: any[];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private positionService: ManagePositionService,
    private manageUserService: ManageUserService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.settingForm();
    this.personalId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
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
    this.formEdit = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      tel: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      role: ['', Validators.required],
      work: ['']
    });
  }

  settingForm() {
    this.manageUserService.getUser(this.personalId).subscribe(res => {
      console.log(res);
      const position = {
        position_id: res['data']['position_id'],
      };
      console.log(res['position_id']);

      this.formEdit.controls['role'].patchValue(position);
      this.formEdit.controls['fname'].setValue(res['data']['employee_fname']);
      this.formEdit.controls['lname'].setValue(res['data']['employee_lname']);
      this.formEdit.controls['tel'].setValue(res['data']['employee_tel'])
    },
      err => console.log(err['error']['message'])
    );
  }
}
