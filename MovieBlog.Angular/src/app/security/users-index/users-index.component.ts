import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { userDTO } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
})
export class UsersIndexComponent implements OnInit {
  constructor(private securityService: SecurityService) {}

  users: userDTO[];
  currentPage: number = 1;
  pageSize: number = 10;
  totalAmountOfRecords;
  columnsToDisplay = ['email', 'claimValue', 'claimType', 'actions'];

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.securityService
      .getUsers(this.currentPage, this.pageSize)
      .subscribe((httpResponse: HttpResponse<any>) => {
        this.users = httpResponse.body.users;
        this.totalAmountOfRecords = httpResponse.headers.get(
          'totalAmountOfRecords'
        );
        console.log(this.users);
      });
  }

  makeAdmin(userId: string) {
    this.securityService.makeAdmin(userId).subscribe(() => {
      Swal.fire('Success', 'The operation was successful', 'success');
      this.loadUser();
    });
  }

  removeAdmin(userId: string) {
    this.securityService.removeAdmin(userId).subscribe(() => {
      Swal.fire('Success', 'The operation was successful', 'success');
      this.loadUser();
    });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUser();
  }
}
