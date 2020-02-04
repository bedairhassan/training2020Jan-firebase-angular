import { Component } from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  //...
  private browse:string='tasks'
  private browselist:string[]=['contact','tasks']
  private browsefun(event){this.browse = event.target.value;}

  constructor(){}
}