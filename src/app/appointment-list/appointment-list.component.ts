import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user'; 

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  patients: User[] = [];

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.showAllPatients();
  }

  showAllPatients() {
    this.userService.getUsers().subscribe(
      (patients) => {
        this.patients = patients;
      },
      (error) => {
        this.toastr.error('Failed to load patients');
      }
    );
  }

  showTodayPatients() {
    const today = new Date().toISOString().split('T')[0];  
    this.userService.getUsers().subscribe(
      (patients) => {
        this.patients = patients.filter(patient => {
          const appointmentDate = new Date(patient.appointment_date).toISOString().split('T')[0];
          return appointmentDate === today;
        });
      },
      (error) => {
        this.toastr.error('Failed to load today\'s patients');
      }
    );
  }  

  markAsDone(patientId: number) {
    this.userService.updateUserStatus(patientId, 'done').subscribe(
      () => {
        this.toastr.success('Done');
        this.patients = this.patients.map(patient => {
          if (patient.id === patientId) {
            patient.status = 'done';
          }
          return patient;
        });
      },
      (error) => {
        this.toastr.error('Failed to mark as done');
      }
    );
  }
}
