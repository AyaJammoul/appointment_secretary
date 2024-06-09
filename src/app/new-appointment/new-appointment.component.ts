import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AvailabilityDialogComponent } from '../availability-dialog/availability-dialog.component';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent {
  user: User = {
    name: '',
    mobile: 0,
    city: '',
    age: 0,
    is_first_time: true,
    gender: '',
    appointment_date: new Date(),
    appointment_time: '',
    narration: '',
    status: 'pending'
  };
  private timeCheckSubject = new Subject<void>();

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.timeCheckSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.userService.checkTimeAvailability(this.user.appointment_date.toISOString().split('T')[0], this.user.appointment_time))
    ).subscribe(result => {
      if (result.count > 0) {
        this.openDialog('This time slot is already taken.');
      }
    });
  }

  addUser(): void {
    this.userService.addUser(this.user).subscribe({
      next: () => {
        this.resetUser();
        this.toastr.success('Appointment booked successfully');
      },
      error: (error) => {
        if (error.status === 409) {
          this.openDialog('Appointment time conflict');
        } else {
          this.toastr.error('Failed to book appointment');
        }
      }
    });
  }

  resetUser(): void {
    this.user = {
      name: '',
      mobile: 0,
      city: '',
      age: 0,
      is_first_time: true,
      gender: '',
      appointment_date: new Date(),
      appointment_time: '',
      narration: '',
      status: 'pending'
    };
  }

  checkTimeAvailability(): void {
    this.timeCheckSubject.next();
  }

  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = { message };
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog.open(AvailabilityDialogComponent, dialogConfig);
  }
}
