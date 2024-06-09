import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-availability-dialog',
  templateUrl: './availability-dialog.component.html',
  styleUrls: ['./availability-dialog.component.css']
})
export class AvailabilityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
