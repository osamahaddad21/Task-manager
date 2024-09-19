import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.getTasksFromLocalStorage());
  private nextId: number = this.getTasksFromLocalStorage().length + 1;

  constructor() { }

  private getTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.getValue();
    task.id = this.nextId++;
    tasks.push(task);
    this.saveTasksToLocalStorage(tasks);
    this.tasksSubject.next(tasks);
  }

  editTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      this.saveTasksToLocalStorage(tasks);
      this.tasksSubject.next(tasks);
    }
  }

  deleteTask(id: number): void {
    const tasks = this.tasksSubject.getValue().filter(task => task.id !== id);
    this.saveTasksToLocalStorage(tasks);
    this.tasksSubject.next(tasks);
  }

  markTaskAsCompleted(id: number): void {
    const tasks = this.tasksSubject.getValue();
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasksToLocalStorage(tasks);
      this.tasksSubject.next(tasks);
    }
  }

}
