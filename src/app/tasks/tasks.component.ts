import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { TaskService } from '../task.service';
import {ToolsService} from '../tools.service'
import { VirtualTimeScheduler } from 'rxjs';

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

  ngOnInit(){}

  form_name: string;
  form_description: string;
  form_tasklist:string;

  docidtoEdit: number;
  idnext: string;

  tasksQ: any[];
  // dbglobal: any;
  DisplayCondition: string = 'Submit';
  // ttServiceTask: any;

  usernameid:string;
  universalobj:any;

  uniqueTaskList:any[]
  //
  DisplayMessage:string;

  constructor(public dbglobal: AngularFirestore, public ttServiceTask: TaskService, public toolsService:ToolsService) {

    this.DisplayMessage=''

    // this.dbglobal = db;
    // this.ttServiceTask = tServicetask
    this.idnext = toolsService.generateRandomString()

    // get username via firebase
    // this.username = 'admin' // find online user out of all users !

    dbglobal.collection('users').valueChanges().subscribe(k=>{

      // LISTEN : I have not stored cookie so I assumed that there will only be one online user !
      // under same EMAIL !

      let arr=[]
      for(const kk of k){
        arr.push(kk)
      }
      
      arr=arr.filter(it=>it.isOnline===true)
      console.log(arr)
      
      this.universalobj=arr[0]
      // console.log(this.universalobj)
    })

    // let obj:any = this.GETALLRECORDS()
    // this.tasksQ=obj.obj[0]
    // this.uniqueTaskList=obj[1]

    this.dbglobal.collection('tasks').valueChanges().subscribe(k => { //k is [object Object],[object Object]
      
      let arr=[]
      for(const kk of k){
        arr.push(kk)
      }
      arr=arr.filter(it=>it.username===this.universalobj.username)
     
      // submit
      this.tasksQ=arr
      this.uniqueTaskList = this.acquireUniquetasklist(arr)
    }); 
    
  }

  addrecord(){

    this.dbglobal.collection('users').doc(String('12')).set(
      {
        isOnline:true, // that is what we exactly want !
        password:'admin',
        username:'admin',
        usernameid:'12'
      }
    )
  }

  SignOut(){
    // alert('signs out')
    // console.log('signout called')

    let usernameid = this.universalobj.usernameid

    let obj = {
      isOnline:false, // that is what we exactly want !
      password:this.universalobj.password,
      username:this.universalobj.username,
      usernameid
    }

    // Editing my username
    this.dbglobal.collection('users').doc(String(usernameid)).delete()
    // this.dbglobal.collection('users').doc(String(usernameid)).set(obj)
    setTimeout(()=>{
      // console.log('added record')
      this.dbglobal.collection('users').doc(String(usernameid)).set(obj)
      this.DisplayMessage='Sign Out Successful'
    },1000);
  }

  submitToField(event){
    this.form_tasklist=event.target.value
  }

  acquireUniquetasklist(tasks){

    let arr = tasks.map(it=>it.tasklist)
    let myset=new Set()
    arr.map(it=>myset.add(it))
    arr = [...myset]
    return arr
  }
  

  public Add() {

    let name = this.form_name
    let description = this.form_description
    let tasklist = this.form_tasklist
    let username = this.universalobj.username

    // if Display Condition is Edit, firebaseEdit
    if (this.DisplayCondition === 'Edit') {
      this.ttServiceTask.Edit(this.docidtoEdit, { name, description,tasklist,username })
      return;
    }

    // if Task.name has been added before, prohibit
    if (this.ttServiceTask.foundTaskName(this.tasksQ, this.form_name)) {
      alert('You can not enter the same task name twice')
      return;
    }

    // Add Task and Return New Id
    this.idnext = this.ttServiceTask.Add({ name, description,tasklist,username,docid: this.idnext })
  }

  public Delete(item) {this.ttServiceTask.Delete(item.docid)}

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
    this.form_tasklist = obj.tasklist
  }
}
