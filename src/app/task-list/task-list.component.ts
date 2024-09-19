import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: string = 'all';
  dataSource: MatTableDataSource<Task>;
  displayedTasks: Task[] = []; // Store currently displayed tasks
  pageSize: number = 3; // Default page size

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService, private router: Router) {
    this.dataSource = new MatTableDataSource<Task>();
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filteredTasks = this.getFilteredTasks();
    this.dataSource.data = filteredTasks; // Update dataSource with filtered tasks
    this.updateDisplayedTasks(); // Update displayed tasks based on pagination
  }

  getFilteredTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks; 
  }

  updateDisplayedTasks(): void {
    const startIndex = this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
    const endIndex = startIndex + (this.paginator ? this.paginator.pageSize : this.pageSize);
    this.displayedTasks = this.dataSource.data.slice(startIndex, endIndex);
    
    // Set paginator length
    if (this.paginator) {
      this.paginator.length = this.dataSource.data.length;
    }
  }

  editTask(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id); 
    this.applyFilter(); // Reapply filter after deletion
  }

  toggleTaskCompletion(id: number): void {
    this.taskService.markTaskAsCompleted(id);
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed; 
    }
    this.applyFilter(); // Reapply filter after toggle
  }

  onPageChange(event: PageEvent): void {
    this.updateDisplayedTasks(); // Update displayed tasks on page change
  }
}
