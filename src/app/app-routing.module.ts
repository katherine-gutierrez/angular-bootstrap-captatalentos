import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  {path: 'agenda-virtual', component: PeopleComponent },
  {path:'', redirectTo: '/agenda-virtual', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
