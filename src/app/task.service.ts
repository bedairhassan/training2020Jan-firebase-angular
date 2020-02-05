import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public Edit(dbglobal, docidtoEdit, { form_name, form_description }) {
    dbglobal.collection('tasks').doc(String(docidtoEdit)).set({
      name: form_name, description: form_description,
      docid: docidtoEdit
    })
  }

  private makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public generateRandomString() {

    return String(this.makeid(10))
  }

  public foundTaskName(tasksQ: any[], form_name: string) {
    return tasksQ.filter(task => task.name === form_name).length >= 1 ? true : false
  }

  public DisplayConditionAct(DisplayCondition,task){

    return DisplayCondition === 'Submit'? {name:'',description:''}
    :{name:task.name,description:task.description}

  }

public DisplayConditionToggle(DisplayCondition){
return DisplayCondition === 'Submit' ? 'Edit' : 'Submit'
}

  public Delete(dbglobal,item){
    dbglobal.collection('tasks').doc(String(item.docid)).delete()
  }

  public Add(dbglobal, idnext, { name, description, docid }) {
    dbglobal.collection('tasks').doc(String(idnext)).set({ name, description, docid })
    return this.generateRandomString()
  }

  public run() {
    console.log('hi')
  }
}
