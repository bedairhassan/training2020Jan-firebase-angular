import { Component, OnInit } from '@angular/core';


interface Task {

  name: string,
  description: string
}

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  
  //...
  private tasks: Task[]

  //...
  private form_name: string;
  private form_description: string;
  public form_submit() {

    // user data
    console.table({ form_name: this.form_name, form_description: this.form_description })

    // api call 

    if(this.DisplayCondition!=='Submit'){
      this.tasks = this.tasks.filter(guest => guest.name !== this.form_name) // #remove
    }

    this.tasks.push({ name: this.form_name, description: this.form_description })
  }
  public form_remove(item) {

    // user data
    console.table({ form_name: item.name, form_description: item.description })

    // api call 
    this.tasks = this.tasks.filter(guest => guest.name !== item.name) // #remove
  }

  //...
  private DisplayCondition: string = 'Submit';
  toggleEdit(task) {

    this.DisplayCondition = this.DisplayCondition === 'Submit' ? 'Edit' : 'Submit'
    console.table({ DisplayCondition: this.DisplayCondition })
    
    if(this.DisplayCondition==='Submit'){

      this.form_name=''
      this.form_description=''
    }else{
      this.form_name=task.name
      this.form_description=task.description
    }
  }

  ngOnInit() {

    // api call
    this.tasks = [
      { name: 'Do This', description: 'as early as possible' },
      { name: 'Do That', description: 'very soon' }
    ]

    // data return
    console.table(this.tasks)
  }
}
