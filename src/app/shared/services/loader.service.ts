import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private counter: number = 0;

  public get isLoading$(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }

  showLoading(): void {
    if (this.counter === 0) {
      this.loaderSubject.next(true);
    }
    this.counter++;
  }

  hideLoading(): void {
    this.counter--;

    if (this.counter < 0) {
      this.counter = 0;
    }

    if (this.counter === 0) {
      this.loaderSubject.next(false);
    }
  }

  constructor() {}
}
