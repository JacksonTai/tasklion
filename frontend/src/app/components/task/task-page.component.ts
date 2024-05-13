import {Component, OnInit} from '@angular/core';
import {TaskService} from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((response) => {
    });
  }

}
