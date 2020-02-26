import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../shared/components/popup/popup.component';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';

export interface Users {
  user: string;
  position: number;
}

export interface DialogData {
  isEdit: boolean;
  text?: string;
  date?: string;
}

const ELEMENT_DATA: Users[] = [
  {position: 1, user: 'John' },
  {position: 2, user: 'Adam' },
  {position: 3, user: 'Lorens' }
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users;

  displayedColumns: string[] = ['position', 'login', 'actions'];
  dataSource;
  activeUser;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.users = this.authorizationService.getUsers;
    this.users.forEach( (element, index) => {
      element.position = index + 1;
    });
    this.dataSource =  new MatTableDataSource(this.users);
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.activeUser);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {isEdit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
