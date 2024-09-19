import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  editMode = false;
  taskId?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.taskId = +id;
        this.taskService.getTasks().subscribe(tasks => {
          const foundTask = tasks.find(t => t.id === this.taskId);
          if (foundTask) {
            this.taskForm.patchValue(foundTask);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        id: this.taskId ?? 0,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false
      };

      if (this.editMode) {
        this.taskService.editTask(task);
      } else {
        this.taskService.addTask(task);
      }

      this.router.navigate(['/']);
    }
  }
}
