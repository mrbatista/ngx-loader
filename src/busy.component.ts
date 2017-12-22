import {
  Component
} from '@angular/core';

import {PromiseTrackerService} from './promise-tracker.service';

@Component({
  selector: 'ng-busy',
  template: `
    <div [class]="customClass">
      <mat-progress-bar [mode]="isActive()"></mat-progress-bar>
    </div>
  `
})
export class BusyComponent {
  customClass: string;
  template: string;

  constructor(private tracker: PromiseTrackerService) {
  }

  isActive(): string {
    return this.tracker.isActive() ? 'indeterminate' : 'determinate';
  }
}
