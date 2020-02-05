import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { TasksComponent } from './tasks/tasks.component';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
 

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase,'hassan'),
    FormsModule,
    CommonModule,AngularFireAnalyticsModule,AngularFirestoreModule,AngularFireStorageModule,AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
