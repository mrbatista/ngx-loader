import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  subjectSelected: any;
  activeBackdrop = false;

  returnPromise() {
    this.subjectSelected = new Promise(resolve => {
      setTimeout(() => {
        resolve();
        }, 2000);
    });
  }

  returnSubscription() {
    this.subjectSelected = Observable.of('string').delay(2000).subscribe();
  }
}
