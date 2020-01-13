import { Employee } from './../../shared/interfaces/employee';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData: Employee;
  public userId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageUser: ManageUserService,
  ) { }

  ngOnInit() {
    this.getData();
    this.userId = localStorage.getItem('userId');
  }

  getData() {
    this.route.params.pipe(map(res => res.id)).subscribe(id => {
      this.manageUser.getProfile(id).subscribe(
        res => {
          if (res['status'] === 'Success') {
            this.userData = res.data;
            console.log(this.userData);
          }
        },
        (err) => {
          console.log(err['error']['message']);
        }
      );
    });
  }

}
