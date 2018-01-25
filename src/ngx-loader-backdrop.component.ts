import {Component} from '@angular/core';
import {trigger, style, transition, animate} from '@angular/animations';

const inactiveStyle = style({
  opacity: 0,
});
const timing = '.3s ease';

@Component({
  selector: 'ngx-loader-backdrop',
  template: `
    <div class="ngx-loader-backdrop"
         @fadeInOut
         *ngIf="active">
    </div>
  `,
  styles: [`.ngx-loader-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      background: #fff;
      opacity: .7;
  }`],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        inactiveStyle,
        animate(timing)
      ]),
      transition('* => void', [
        animate(timing, inactiveStyle)
      ])
    ])
  ]
})

export class NgxLoaderBackdropComponent {
  active: boolean;
  constructor() {
  }
}
