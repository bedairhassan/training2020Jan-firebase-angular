import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {ToolsService} from './tools.service'

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(public dbglobal: AngularFirestore,public toolsService:ToolsService) { }

  public Edit(docid, { name, description, tasklist, username }) {
    this.dbglobal.collection('tasks').doc(String(docid)).set({
      name,
      description,
      tasklist,
      username,
      docid
    })
  }

 

  public foundTaskName(tasksQ: any[], form_name: string) {
    return tasksQ.filter(task => task.name === form_name).length >= 1 ? true : false
  }

  public DisplayConditionAct(DisplayCondition:string, task:any) {

    return DisplayCondition === 'Submit' ? { name: '', description: '', tasklist: '' }
      : { name: task.name, description: task.description, tasklist: task.tasklist }

  }

  public DisplayConditionToggle(DisplayCondition) {
    return DisplayCondition === 'Submit' ? 'Edit' : 'Submit'
  }

  public Delete(docid) {
    this.dbglobal.collection('tasks').doc(String(docid)).delete()
  }

  public Add({ name, description, docid, tasklist, username }) {
    this.dbglobal.collection('tasks').doc(String(docid)).set({ name, description, docid, tasklist, username })
    return this.toolsService.generateRandomString() // idnext
  }
}
