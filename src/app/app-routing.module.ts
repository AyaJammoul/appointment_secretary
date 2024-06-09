import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { listenerCount } from 'process';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path: 'new', component : NewAppointmentComponent},
  {path: 'list', component : AppointmentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }