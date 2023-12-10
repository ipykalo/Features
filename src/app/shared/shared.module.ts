import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ErrorDialogService } from './services/error-dialog.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ErrorDialogComponent, SpinnerComponent],
  providers: [ErrorDialogService],
  exports: [SpinnerComponent],
})
export class SharedModule {}
