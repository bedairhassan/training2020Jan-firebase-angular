import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { TaskService } from '../task.service';

// To Do: 
// select to input ! // ismodify input // submit input
// needs select dynamic // map all tasks to tasklist array and find Set
// (change)="this.input=event.target.value"

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  providers: [TaskService]
})


export class TasksComponent implements OnInit {

  form_name: string;
  form_description: string;

  docidtoEdit: number;
  idnext: string;

  tasksQ: any[];
  dbglobal: any;
  DisplayCondition: string = 'Submit';
  ttServiceTask: any;

  constructor(db: AngularFirestore, tServicetask: TaskService) {

    this.dbglobal = db;
    this.ttServiceTask = tServicetask
    this.idnext = tServicetask.generateRandomString()

    db.collection('tasks').valueChanges().subscribe(k => {
      this.tasksQ = k
    });
  }

  public form_submit() {

    // if Display Condition is Edit, firebaseEdit
    if (this.DisplayCondition === 'Edit') {
      this.ttServiceTask.Edit(this.dbglobal, this.docidtoEdit, { form_name: this.form_name, form_description: this.form_description })
      return;
    }

    // if Task.name has been added before, prohibit
    if (this.ttServiceTask.foundTaskName(this.tasksQ, this.form_name)) {
      alert('You can not enter the same task name twice')
      return;
    }

    // Add Task and Return New Id
    this.idnext = this.ttServiceTask.Add(this.dbglobal, this.idnext, { name: this.form_name, description: this.form_description, docid: this.idnext })
  }

  public form_remove(item) {this.ttServiceTask.Delete(this.dbglobal,item)}


  toggleEdit(task) {

    // Submit,Edit = Edit,Submit // Swap
    this.DisplayCondition = this.ttServiceTask.DisplayConditionToggle(this.DisplayCondition)

    // if Editing mode, save @docidtoEdit
    if (this.DisplayCondition === 'Edit') {
      this.docidtoEdit = task.docid
    }

    // update name and description fields based on (Editing,Submitting)
    let obj = this.ttServiceTask.DisplayConditionAct(this.DisplayCondition, task)
    this.form_name = obj.name
    this.form_description = obj.description
  }
}
