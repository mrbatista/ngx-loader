import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent{
  busyP: Promise<any>;
  busyS: Subscription;
  activeBackdrop: boolean = false;

  returnPromise() {
    this.busyP = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        }, 2000);
    });
  }

  returnSubscription() {
    this.busyS = Observable.of('string').delay(2000).subscribe();
  }
}
