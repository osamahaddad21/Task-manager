import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { TaskService } from './task.service';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add', component: AddEditTaskComponent },
  { path: 'edit/:id', component: AddEditTaskComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddEditTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule
    
    
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
