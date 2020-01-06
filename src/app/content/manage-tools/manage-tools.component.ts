import { WashTools } from './../../shared/interfaces/wash-tools';
import { ManageCarcareService } from './../../shared/services/manage-carcare.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-tools',
  templateUrl: './manage-tools.component.html',
  styleUrls: ['./manage-tools.component.css']
})
export class ManageToolsComponent implements OnInit {
  public cols: any[];
  public tool: any[];
  public form: FormGroup;
  public toolname: string;
  public amount: number;
  washtool: WashTools;
  washtools: WashTools[];
  public displayDialog: boolean;
  newwashtool: boolean;
  public msgs: Message[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private manageCar: ManageCarcareService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'tool_name', header: 'ชื่ออุปกรณ์' },
      { field: 'amount', header: 'จำนวน' },
    ];
    this.getAllTool();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        tool_name: ['', Validators.required],
        amount: ['', Validators.required],
      }
    );
  }

  getAllTool() {
    this.manageCar.getTools().subscribe(res => {
      if (res['status'] === 'Success') {
        this.tool = res.data;
      }
    },
      (e) => console.log(e['error']['message'])
    );
  }
  showDialogToAdd() {
    this.newwashtool = true;
    this.washtool = {};
    this.displayDialog = true;
  }
  showEdit(id) {
    console.log(id);
    console.log(this.washtool)
    this.newwashtool = false;
    this.washtool = this.tool.filter(e => e.wash_tool_id === id)[0];
    this.toolname = this.washtool['tool_name'];
    this.amount = this.washtool['amount'];
    this.displayDialog = true;
  }
  save() {
    this.msgs = [];
    this.washtool.tool_name = this.toolname;
    this.washtool.amount = this.amount;
    this.manageCar.createTool(this.washtool)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
          this.washtools = [
            ...this.washtools,
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

  update() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ยืนยันการแก้ไข',
      header: 'ข้อความจากระบบ',
      accept: () => {
        this.washtool.tool_name = this.toolname;
        this.washtool.amount = this.amount;
        this.manageCar.updateTool(this.washtool)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการสำเร็จ' });
              const index = this.tool.findIndex(e => e.wash_tool_id === res['data']['wash_tool_id']);
              this.tool[index] = res['data'];
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
        const index = this.tool.findIndex(e => e.wash_tool_id === id);
        this.manageCar.deleteTool(id)
          .subscribe(res => {
            if (res['status'] === 'Success') {
              this.msgs.push({ severity: 'success', summary: 'ข้อความจากระบบ', detail: 'การดำเนินการลบสำเร็จ' });
              this.tool = [
                ...this.tool.slice(0, index),
                ...this.tool.slice(index + 1)
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
    this.washtool = {};
    this.toolname = '';
    this.displayDialog = false;
    this.form.reset();
  }
}
