import {
  AfterViewInit,
  Component
} from '@angular/core';


@Component({
  selector: 'ng-busy',
  template: `
    <div [class]="customClass">
      <mat-progress-bar [mode]="isActive()"></mat-progress-bar>
    </div>
  `
})
export class NgxLoaderComponent {
  customClass: string;
  template: string;
  active: boolean = false;

  constructor() {
  }

  isActive(): string {
    return this.active ? 'indeterminate' : 'determinate';
  }
}
