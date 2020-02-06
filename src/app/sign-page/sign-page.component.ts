import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html'
})
export class SignPageComponent implements OnInit {

  username: string;
  password: string;

  // signup
  UserNameExistsBefore: boolean = false;
  // Sign Up
  allowSignIn: boolean = false;
  universalObj: any;
  // ...
  DisplayMessage: string;

  SignUp() {
    this.dbglobal.collection('users').valueChanges().subscribe(k => { // 

      // LISTEN : I have not stored cookie so I assumed that there will only be one online user !
      // under same EMAIL !

      let arr = []
      for (const kk of k) {
        arr.push(kk)
      }

      this.UserNameExistsBefore = arr.filter(it => it.username === this.username).length >= 1 ? true : false
    })
    if (this.UserNameExistsBefore) {
      alert(`username exists before ${this.username}`)
      return;
    }
    // console.log(this.UserNameExistsBefore)

    // .push()
    let usernameid = this.toolsService.generateRandomString()
    this.dbglobal.collection('users').doc(usernameid).set(
      {
        isOnline: false, // that is what we exactly want !
        password: this.password,
        username: this.username,
        usernameid
      }
    )

    this.DisplayMessage='Sign Up has been successful. Please Sign in'
  }

  SignIn() {
    // alert('SignIn   '+`${this.username} and ${this.password}`)
    console.table({ username: this.username, password: this.password })

    // if correct.username && correct.password, signin!
    this.dbglobal.collection('users').valueChanges().subscribe(users => { // 

      // LISTEN : I have not stored cookie so I assumed that there will only be one online user !
      // under same EMAIL !

      let arr = []
      for (const user of users) {
        arr.push(user)
      }

      for (const user of arr) {

        if (user.username === this.username && user.password === user.password) {

          this.universalObj = user
          this.allowSignIn=true
          break;
        }
      }
    })

    if (this.allowSignIn) { // firebase SignIn
      // Editing my username
      this.dbglobal.collection('users').doc(String(this.universalObj.usernameid)).delete()
      // this.dbglobal.collection('users').doc(String(usernameid)).set(obj)
      setTimeout(() => {
        // console.log('added record')
        this.universalObj.isOnline = true
        this.dbglobal.collection('users').doc(String(this.universalObj.usernameid)).set(this.universalObj)
        this.DisplayMessage = 'Sign in Successful'
      }, 1000);
    } else {
      this.DisplayMessage = 'Sign in FAILURE'
    }
  }

  constructor(public dbglobal: AngularFirestore, public toolsService: ToolsService) { this.DisplayMessage = '' }

  ngOnInit() {
  }

}
