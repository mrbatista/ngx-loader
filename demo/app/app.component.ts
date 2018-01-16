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
  busySelected: any;
  activeBackdrop: boolean = false;

  returnPromise() {
    this.busySelected = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        }, 2000);
    });
  }

  returnSubscription() {
    this.busySelected = Observable.of('string').delay(2000).subscribe();
  }
}
