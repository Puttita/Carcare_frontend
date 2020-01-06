import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageCarcareService } from './../../shared/services/manage-carcare.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, ConfirmationService, SelectItem } from 'primeng/api';
import { TypeCar } from 'src/app/shared/interfaces/type-car';

@Component({
  selector: 'app-manage-typecar',
  templateUrl: './manage-typecar.component.html',
  styleUrls: ['./manage-typecar.component.css']
})
export class ManageTypecarComponent implements OnInit {
  public cols: any[];
  public car: any[];
  public msgs: Message[] = [];
  newtypeCar: boolean;
  typecar: TypeCar;
  typecars: TypeCar[];
  public form: FormGroup;
  public displayDialog: boolean;
  public size: string;
  public brand: string;
  public model: string;
  Cartype: SelectItem[];
  constructor(
    private manageCar: ManageCarcareService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.Cartype = [
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
      { label: 'XL', value: 'XL' },
      { label: 'Van', value: 'Van' },
      { label: 'Motorcycle', value: 'Motorcycle' },
      { label: 'Bigbike', value: 'Bigbike' },
    ];
  }

  ngOnInit() {
    this.cols = [
      { field: 'size', header: 'ขนาดรถ' },
      { field: 'brand', header: 'ยี่ห้อรถ' },
      { field: 'model', header: 'รุ่นรถ' },
    ];
    this.getAllCar();
    this.createForm();
  }
  getAllCar() {
    this.manageCar.getCar().subscribe(res => {
      if (res['status'] === 'Success') {
        this.car = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
  }
  createForm() {
    this.form = this.formBuilder.group(
      {
        size: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
      }
    );
  }
  showDialogToAdd() {
    this.newtypeCar = true;
    this.typecar = {};
    this.displayDialog = true;
  }
  showEdit(id) {
    console.log(id);
    console.log(this.typecar)
    this.newtypeCar = false;
    this.typecar = this.car.filter(e => e.type_car_id === id)[0];
    this.brand = this.typecar['brand'];
    this.model = this.typecar['model'];
    this.size = this.typecar['size'];
    this.displayDialog = true;
  }

  save() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการบันทึกข้อมูล',
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.typecar.brand = this.brand;
        this.typecar.model = this.model;
        this.typecar.size = this.size;
        this.manageCar.createCar(this.typecar)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs = [{ severity: 'success', summary: 'เพิ่มสำเร็จ', detail: 'การดำเนินการสำเร็จ' }];
              this.typecars = [
                ...this.typecars,
                res['data']
              ];
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

  update() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการแก้ไข',
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.typecar.brand = this.brand;
        this.typecar.model = this.model;
        this.typecar.size = this.size;
        this.manageCar.updateCar(this.typecar)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
              const index = this.car.findIndex(e => e.type_car_id === res['data']['type_car_id']);
              this.car[index] = res['data'];
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
        const index = this.car.findIndex(e => e.type_car_id === id);
        this.manageCar.deleteCar(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบสำเร็จ' });
              this.car = [
                ...this.car.slice(0, index),
                ...this.car.slice(index + 1)
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
    this.typecar = {};
    this.brand = '';
    this.model = '';
    this.size = '';
    this.displayDialog = false;
    this.form.reset();
  }
}
