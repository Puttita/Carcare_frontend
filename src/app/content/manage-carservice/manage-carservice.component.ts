import { Component, OnInit } from '@angular/core';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-carservice',
  templateUrl: './manage-carservice.component.html',
  styleUrls: ['./manage-carservice.component.css']
})
export class ManageCarserviceComponent implements OnInit {
  public cols: any[];
  public clean: any[];
  public form: FormGroup;
  constructor(
    private manageCar: ManageCarcareService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'service_name', header: 'บริการล้างรถ' },
      { field: 'service_price', header: 'ราคา' },
      { field: 'service_duration', header: 'ระยะเวลาล้าง' },
      { field: 'size', header: 'ขนาดรถ' },
    ];
    this.getAllService();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        service_name: ['', Validators.required],
        service_price: ['', Validators.required],
        service_duration: ['', Validators.required],
        size: ['', Validators.required],
      }
    );
  }
  getAllService() {
    this.manageCar.getService().subscribe(res => {
      if (res['status'] === 'Success') {
        this.clean = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
  }
}
