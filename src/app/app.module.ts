import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PeopleComponent } from './components/people/people.component';
import { SeeFormComponent } from './components/see-form/see-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    EditFormComponent,
    SeeFormComponent,
    PeopleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
