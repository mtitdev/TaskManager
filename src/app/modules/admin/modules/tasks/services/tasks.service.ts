import { Injectable } from '@angular/core';
import { TasksList, TaskItem, UserTasks, TasksArray } from '../models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  private tasks: TasksList = [
    {position: 1, task: 'Watch film', plannedDate: '01.07.2020', id:'1' },
    {position: 2, task: 'Visit dentist', plannedDate: '01.15.2020', id:'2'},
    {position: 3, task: 'Finish book', plannedDate: 'Wed Jan 14 2020', id:'3'},
  ];

  private usersTasks: TasksArray = [
    { userId: '1', tasks: this.tasks },
    { userId: '2', tasks: this.tasks }
  ]

  private task: UserTasks;

  get getTasks() {
    return this.tasks;
  }

  get allTasks() {
    return this.usersTasks;
  }
  
  createNewTasks(id: string) {
    this.task = {
      userId: id,
      tasks: this.tasks
    }
    this.usersTasks.push(this.task);
  }

  createNewTask(task: TaskItem) {
    task.completedDate = '';
    task.id =  `f${(+new Date()).toString(16)}`;
    this.tasks.push(task);
    this.positionTask();
  }
  removeTask(id: string) {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
    return this.tasks;
  }
  editTask(newTask: TaskItem) {
    const index = this.tasks.findIndex(task => task.id === newTask.id);
    this.tasks.splice(index, 1, newTask);
    return this.tasks;
  }
  positionTask() {
    this.tasks.forEach( (element,pos) => {
      element.position = pos + 1;
    });
  }
}
