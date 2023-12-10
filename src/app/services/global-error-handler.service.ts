import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../shared/services/error-dialog.service';
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
    const message: string = this.extractMessage(error);
    const status = error.status ?? '';

    this.zone.run(() =>
      this.errorDialogService.openDialog(
        message || 'Undefined client error',
        status
      )
    );

    console.error('Error from global error handler', error);
  }

  private extractMessage(error: any): string {
    const err = error.error ?? error;
    let message = '';

    if (Array.isArray(err.message)) {
      message = err.message.join(';');
    } else {
      message = err.message;
    }
    return message;
  }
}
