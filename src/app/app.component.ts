import { Component } from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';
import { NgModel } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  //...
  private browse:string='tasks'
  private browselist:string[]=['contact','tasks']
  private browsefun(event){this.browse = event.target.value;}
  //...
  SignedIn:boolean

  constructor(public dbglobal:AngularFirestore){

    dbglobal.collection('users').valueChanges().subscribe(k=>{

      // LISTEN : I have not stored cookie so I assumed that there will only be one online user !
      // under same EMAIL !

      let arr=[]
      for(const kk of k){
        arr.push(kk)
      }
      
      arr=arr.filter(it=>it.isOnline===true)
      console.log(arr)
      
      if(arr[0].isOnline){
        this.SignedIn=true
      }
    })
  }
}