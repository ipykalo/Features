import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  private isOpened: boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(message: string, status?: number) {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message, status },
      maxHeight: '100%',
      width: '540px',
      maxWidth: '100%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isOpened = false;
    });
  }
}
