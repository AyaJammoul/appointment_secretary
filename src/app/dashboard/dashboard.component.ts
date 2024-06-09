import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';  
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  appointmentsToday: User[] = [];
  totalUsers: number = 0;
  totalAppointmentsToday: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.totalUsers = data.length;
    });

    this.userService.getTodayAppointments().subscribe(data => {
      this.appointmentsToday = data.sort((a, b) => {
        return this.compareTime(a.appointment_time, b.appointment_time);
      });
      this.totalAppointmentsToday = data.length;
    });
  }

  compareTime(time1: string, time2: string): number {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    if (hours1 === hours2) {
      return minutes1 - minutes2;
    }
    return hours1 - hours2;
  }
}
