import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogData } from '../../../tasks/components/tasks/tasks.component'
import { TasksService } from '../../../tasks/services/tasks.service';
import { TaskItem } from '../../../tasks/models/tasks.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  minDate = new Date();
  isDisabled: boolean;
  isEdit: boolean;

  task: TaskItem;

  taskForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    plannedDate: new FormControl('', [Validators.required])
  })

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private tasksService: TasksService) {}

  ngOnInit() {
    this.isEdit = this.data.isEdit;
    this.isDisabled = this.data.task.completedDate ? true : false;
    if (this.isEdit) {
      if (this.data.task.status === 'expired') {
        this.taskForm.setValue({text: this.data.task.task, plannedDate: new Date()});
      } else {this.taskForm.setValue({text: this.data.task.task, plannedDate: new Date(this.data.task.plannedDate)});}
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTask() {
    this.task = {
      task: this.taskForm.controls['text'].value,
      plannedDate: this.taskForm.controls['plannedDate'].value.toDateString(),
    }
    this.dialogRef.close(this.task);
  }

  editTask() {
    this.data.task.task = this.taskForm.controls['text'].value;
    this.data.task.plannedDate = this.taskForm.controls['plannedDate'].value.toDateString();
    this.dialogRef.close(this.data.task);
  }
}
