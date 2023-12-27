import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserStorageService } from './services/browser-storage.service';
import { BrowserStorageServerService } from './services/browser-storage-server.service';

@NgModule({
  providers: [{
    provide: BrowserStorageService,
    useClass: BrowserStorageServerService,
  }],
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
