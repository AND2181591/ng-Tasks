import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { NewListComponent } from './new-list/new-list.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, 
  { path: 'welcome', component: WelcomeComponent }, 
  { path: 'new-list', component: NewListComponent },
  { path: 'list/:id', component: ListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
