import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
//import { taskService } from './task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  //providers:[taskService]
})


export class TasksComponent implements OnInit {

  form_name: string;
  form_description: string;
  docidtoEdit: number;
  tasksQ: any[];
  idnext: string;
  dbglobal: any;
  DisplayCondition: string = 'Submit';

  private makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  generateRandomString(){

    return String(this.makeid(10))
  }

  constructor(db: AngularFirestore) {

    this.dbglobal = db;

    this.dbglobal.collection('tasks').valueChanges().subscribe(k => {
      // console.log(k)
      this.tasksQ = k
      this.idnext = this.generateRandomString()
    });

    //tService.run();
  }

  public form_submit() {

    console.table({ name: this.form_name, description: this.form_description })


    if (this.DisplayCondition === 'Edit') {
      this.dbglobal.collection('tasks').doc(String(this.docidtoEdit)).set({
        name: this.form_name, description: this.form_description,
        docid: this.docidtoEdit
      })
      return;
    }

    let found = this.tasksQ.filter(task => task.name === this.form_name).length>=1 ? true:false
    if(found){
      alert('You can not enter the same task name twice')
      return;
    }

    this.dbglobal.collection('tasks').doc(String(this.idnext)).set({ name: this.form_name, description: this.form_description, docid: this.idnext })
    // this.idnext++; // update it !
    this.idnext = this.generateRandomString()
  }
  public form_remove(item) {

    console.log(`forthis the id is ${item.docid}`)
    this.dbglobal.collection('tasks').doc(String(item.docid)).delete()
  }

 
  toggleEdit(task) {

    console.log(`forthis the id is ${task.docid}`)

    this.DisplayCondition = this.DisplayCondition === 'Submit' ? 'Edit' : 'Submit'

    if (this.DisplayCondition === 'Submit') {

      this.form_name = ''
      this.form_description = ''
    } else {
      this.docidtoEdit = task.docid
      this.form_name = task.name
      this.form_description = task.description
    }
  }


  

  ngOnInit() {


  }
}
