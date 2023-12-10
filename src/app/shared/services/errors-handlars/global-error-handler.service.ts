import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../dialogs/error-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private errorDialogService: ErrorDialogService
  ) {}

  handleError(error: any): void {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() =>
      this.errorDialogService.openDialog(
        error?.message || 'Undefined client error'
      )
    );

    console.error('Error from global error handler', error);
  }
}
