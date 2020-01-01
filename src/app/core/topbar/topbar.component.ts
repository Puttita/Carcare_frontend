import { Employee } from './../../shared/interfaces/employee';
import { AuthGuard } from './../../shared/guard/auth.guard';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn: boolean;
    public userData: Employee;
    public userDisplayName1 = '';

    public userDisplayName = new Subject<any>();
    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private manageUser: ManageUserService,
        private authGuard: AuthGuard
    ) {
    }

    ngOnInit() {
        this.authService.isLoggedIn().subscribe(res => this.isLoggedIn = res);
        this.authService.isLoggedIn().subscribe(res => this.getData());
    }

    logout() {
        this.authService.logout();
    }

     getData() {
        this.userDisplayName1 = localStorage.getItem('username');

    }
}
