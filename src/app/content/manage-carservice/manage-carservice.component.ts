import { Component, OnInit } from '@angular/core';
import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';
import { CleanService } from 'src/app/shared/interfaces/clean-service';
import { Time, formatDate } from '@angular/common';
import { TypeCar } from 'src/app/shared/interfaces/type-car';

@Component({
  selector: 'app-manage-carservice',
  templateUrl: './manage-carservice.component.html',
  styleUrls: ['./manage-carservice.component.css']
})
export class ManageCarserviceComponent implements OnInit {
  public cols: any[];
  public clean: any[];
  public form: FormGroup;
  public type: any[];
  public filteredTypeCar: any[];
  public newService: boolean;
  public displayDialog: boolean;
  service: CleanService;
  services: CleanService[];
  public msgs: Message[] = [];
  // NgModel
  public name: string;
  public price: number;
  public duration: Date;
  public size: TypeCar;
  constructor(
    private manageCar: ManageCarcareService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'service_name', header: 'บริการล้างรถ' },
      { field: 'service_price', header: 'ราคา' },
      { field: 'service_duration', header: 'ระยะเวลาล้าง' },
      { field: 'size', header: 'ขนาดรถ' },
    ];
    this.getAllService();
    this.createForm();
    this.manageCar.showTypeCar().subscribe(
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
  showDialogToAdd() {
    this.newService = true;
    this.service = {};
    this.displayDialog = true;
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

  save() {
    this.msgs = [];
    const time = formatDate(this.duration, 'h:mm:ss', 'en')
    const data = {
      service_name: this.name,
      service_price: this.price,
      service_duration: time,
      type_car_id: this.size['type_car_id']
    };
    console.log(data);
    this.manageCar.createService(data)
      .toPromise().then(res => {
        if (res['status'] === 'Success') {
          this.msgs = [{ severity: 'success', summary: 'เพิ่มสำเร็จ', detail: 'การดำเนินการสำเร็จ' }];
          this.clean = [
            ...this.clean,
            res['data'][0]
          ];
        } else {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มตู้สัมภาระไม่สำเร็จ' }];
        }
      }).catch((e) => console.log(e['error']['message']));
    this.clear();
  }
  showEdit(id) {
    console.log(id);
    this.newService = false;
    // const time = formatDate(this.duration, 'h:mm:ss', 'en')
    this.service = this.clean.filter(e => e.clean_service_id === id)[0];
    this.name = this.service['service_name'];
    this.price = this.service['service_price'];
    this.duration = this.service['service_duration']
    this.size = {
      type_car_id: this.service['type_car_id'],
      size: this.service['size']
    };
    console.log(this.size);
    console.log(this.service)
    this.displayDialog = true;
  }
  update() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการแก้ไข',
      header: 'ข้อความจากระบบ',
      accept: () => {
        const time = formatDate(this.duration, 'h:mm:ss', 'en')
        const data = {
          clean_service_id: this.service['clean_service_id'],
          service_name: this.name,
          service_price: this.price,
          service_duration: time,
          type_car_id: this.size['type_car_id']
        };
        console.log(data);
        this.manageCar.updateService(data)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
              const index = this.clean.findIndex(e => e.clean_service_id === res['data']['clean_service_id']);
              // this.car[index].brand = res['data']['brand'];
            }
          },
            (e) => {
              console.log(e['error']['message']);
              this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการไม่สำเร็จ' });
            }
          );
        this.clear();
      },
      reject: () => {

      }
    });
  }
  delete(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการลบ',
      header: 'ข้อความจากระบบ',
      accept: () => {
        const index = this.clean.findIndex(e => e.clean_service_id === id);
        console.log(index);
        console.log(id);

        this.manageCar.deleteService(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบสำเร็จ' });
              this.clean = [
                ...this.clean.slice(0, index),
                ...this.clean.slice(index + 1)
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
  clear() {
    this.service = {};
    this.name = '';
    this.price = null;
    this.duration = null;
    // this.size = '';
    this.displayDialog = false;
    this.form.reset();
  }
  filterTypecarMultiple(event) {
    const query = event.query;
    console.log(query);
    this.filteredTypeCar = this.filterTypecar(query, this.type);
  }
  filterTypecar(query, type: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < type.length; i++) {
      const types = type[i];
      if ((types.size).indexOf(query) === 0) {
        filtered.push(types);
      }
    }
    return filtered;
  }

}
