import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string) {
    alertify.set('notifier','position', 'top-center');
    alertify.success(message);
  }

  error(message: string) {
    alertify.set('notifier','position', 'top-center');
    alertify.error(message);
  }
}
