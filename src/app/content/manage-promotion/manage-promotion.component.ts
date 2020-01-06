import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import { Promotion } from './../../shared/interfaces/promotion';
import { PromotionService } from './../../shared/services/promotion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-manage-promotion',
  templateUrl: './manage-promotion.component.html',
  styleUrls: ['./manage-promotion.component.css']
})
export class ManagePromotionComponent implements OnInit {
  public cols: any[];
  public pro: any[];
  public form: FormGroup;
  newPromotion: boolean;
  promotion: Promotion;
  promotions: Promotion[];
  public detail: string;
  public dateStart: Date;
  public dateEnd: Date;
  public discount: number;
  public msgs: Message[] = [];
  public displayDialog: boolean;
  constructor(
    private managePromotion: PromotionService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'detail', header: 'รายละเอียดโปรโมชั่น' },
      { field: 'date_start', header: 'วันที่เริ่มใช้' },
      { field: 'date_end', header: 'วันที่สิ้นสุดโปรโมชั่น' },
      { field: 'discount_percent', header: 'เปอร์เซนต์ลด' },
    ];
    this.getAllPromotion();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        detail: ['', Validators.required],
        date_start: ['', Validators.required],
        date_end: ['', Validators.required],
        discount_percent: ['', Validators.required],
      }
    );
  }
  getAllPromotion() {
    this.managePromotion.getPromotion().subscribe(res => {
      if (res['status'] === 'Success') {
        this.pro = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
  }
  showDialogToAdd() {
    this.newPromotion = true;
    this.promotion = {};
    this.displayDialog = true;
  }
  save() {
    this.msgs = [];
    this.promotion.detail = this.detail;
    this.promotion.date_start = this.dateStart;
    this.promotion.date_end = this.dateEnd;
    this.promotion.discount_percent = this.discount;
    this.managePromotion.createPromotion(this.promotion)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
          this.promotions = [
            ...this.promotions,
            res['data']
          ];
        }
      },
        (e) => {
          this.msgs.push({ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการไม่สำเร็จ' });
        }
      );
    this.clear();
  }
  showEdit(id) {
    this.newPromotion = false;
    this.promotion = this.pro.filter(e => e.promotion_id === id)[0];
    this.detail = this.promotion['detail'];
    this.dateStart = this.promotion['date_start'];
    this.dateEnd = this.promotion['date_end'];
    this.discount = this.promotion['discount_percent'];
    this.displayDialog = true;
  }
  update() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการแก้ไข',
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.promotion.detail = this.detail;
        this.promotion.date_start = this.dateStart;
        this.promotion.date_end = this.dateEnd;
        this.promotion.discount_percent = this.discount;
        this.managePromotion.updatePromotion(this.pro)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
              const index = this.pro.findIndex(e => e.promotion_id === res['data']['promotion_id']);
              this.pro[index] = res['data'];
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
        const index = this.pro.findIndex(e => e.promotion_id === id);
        this.managePromotion.deletePromotion(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบสำเร็จ' });
              this.pro = [
                ...this.pro.slice(0, index),
                ...this.pro.slice(index + 1)
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
    this.promotion = {};
    this.detail = '';
    this.dateStart = null;
    this.dateEnd = null;
    this.discount = null;
    this.displayDialog = false;
    this.form.reset();
  }
}
