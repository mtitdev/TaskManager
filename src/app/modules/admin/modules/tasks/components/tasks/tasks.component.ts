import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../shared/components/popup/popup.component';
import { TasksList, TaskItem } from '../../models/tasks.model';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';

export interface DialogData {
  isEdit: boolean;
  task: TaskItem;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  isEdit: boolean;
  tasks: TasksList;
  id: string;
  
  displayedColumns: string[] = ['select' ,'position', 'task', 'plannedDate', 'completedDate', 'status', 'actions'];
  dataSource: MatTableDataSource<TaskItem>;
  selection = new SelectionModel<TaskItem>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private tasksService: TasksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tasksService.getTasks);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data.forEach(item => this.checkStatus(item));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: TaskItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  openAddDialog(): void {
    this.isEdit = false;
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {isEdit: this.isEdit}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.checkStatus(result);
        this.tasksService.createNewTask(result);
        this.dataSource.data = this.tasksService.getTasks;
      }
      console.log('The dialog was closed');
    });
  }

  openEditDialog(element): void {
    this.isEdit = true;

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {isEdit: this.isEdit, task: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.checkStatus(result);
        this.tasksService.editTask(result);
      }
      console.log('The dialog was closed');
    });
  }

  changeStatus(item) {
    if (item.status !== 'completed') { 
      item.status = 'completed';
      item.completedDate = new Date().toDateString();
    }
    else {
      if (item.completedDate) { item.completedDate = null };
      this.checkStatus(item);
    }
    // Send new item data to service
  }

  checkStatus(item) {
    if (item.completedDate) {
      item.status = 'completed';
    } else if (new Date(item.plannedDate).setHours(23, 59, 59, 999) >= new Date().setHours(23, 59, 59, 999)) {
      item.status = 'planned';
    } else item.status = 'expired';
  }

  globalChangeStatus($event) {
    this.dataSource.data.forEach(item => {
      if ($event.checked) {
        item.status = 'completed';
        item.completedDate = new Date().toDateString();
      } else {
        item.completedDate = null;
        this.checkStatus(item);
      }
    })
  }

  removeTask(id: string) {
    this.tasksService.removeTask(id);
    this.tasksService.positionTask();
    this.dataSource.data = this.tasksService.getTasks;
  }
}