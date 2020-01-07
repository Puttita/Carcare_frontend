import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageCarcareService } from './../../shared/services/manage-carcare.service';
import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, SelectItem } from 'primeng/api';
import { TypeCar } from 'src/app/shared/interfaces/type-car';
import { Car } from 'src/app/shared/interfaces/car';

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
  typecar: Car;
  typecars: Car[];
  public form: FormGroup;
  public displayDialog: boolean;
  public size: TypeCar;
  public brand: string;
  public model: string;
  Cartype: SelectItem[];
  public type: any[];
  typeId: TypeCar;
  public filteredTypeCar: any[];
  constructor(
    private manageCar: ManageCarcareService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'size', header: 'ขนาดรถ' },
      { field: 'brand', header: 'ยี่ห้อรถ' },
      { field: 'model', header: 'รุ่นรถ' },
    ];
    this.getAllCar();
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
  getAllCar() {
    this.manageCar.getCar().subscribe(res => {
      if (res['status'] === 'Success') {
        this.car = res['data'];
        console.log(res.data);
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
    this.typecar = this.car.filter(e => e.car_id === id)[0];
    this.brand = this.typecar['brand'];
    this.model = this.typecar['model'];
    this.size = {
      type_car_id: +this.typecar['type_car_id'],
      size: this.typecar['size']
    };
    console.log(this.size);

    this.displayDialog = true;
  }

  save() {
    this.msgs = [];
    const data = {
      brand: this.brand,
      model: this.model,
      type_car_id: this.size['type_car_id']
    };
    console.log(data);
    this.manageCar.createCar(data)
      .toPromise().then(res => {
        if (res['status'] === 'Success') {
          this.msgs = [{ severity: 'success', summary: 'เพิ่มสำเร็จ', detail: 'การดำเนินการสำเร็จ' }];
          this.car = [
            ...this.car,
            res['data'][0]
          ];
        } else {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มตู้สัมภาระไม่สำเร็จ' }];
        }
      }).catch((e) => console.log(e['error']['message']));
    this.clear();
  }

  update() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการแก้ไข',
      header: 'ข้อความจากระบบ',
      accept: () => {
        const data = {
          car_id: this.typecar['car_id'],
          brand: this.brand,
          model: this.model,
          type_car_id: this.size['type_car_id']
        };
        this.manageCar.updateCar(data)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
              const index = this.car.findIndex(e => e.type_car_id === res['data']['type_car_id']);
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
        const index = this.car.findIndex(e => e.car_id === id);
        console.log(index);
        console.log(id);

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
