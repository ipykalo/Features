import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageServerService extends BrowserStorageService {
  /**
   * server don't have any global variables like localStorage 
   * and hence it fails when it runs the application with BrowserStorageService
   * The idea is to provide an implementation to server-side code, so that it works without breaking.
   */

  constructor() {
    super({
      clear: () => {},
      getItem: (key: string) => JSON.stringify({ key }),
      setItem: (key: string, value: string) => JSON.stringify({ [key]: value }),
      key: (index: number) => index.toString(),
      length: 0,
      removeItem: (key: string) => JSON.stringify({ key }),
    });
  }
}
