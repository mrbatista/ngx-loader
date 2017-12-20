import {Subscription} from 'rxjs/Subscription';

export class BusyConfig implements IBusyConfig {
  template: string;
  backdrop: boolean;
  wrapperClass: string;

  constructor(config: IBusyConfig = {}) {
    for (const option in BUSY_CONFIG_DEFAULTS) {
      this[option] = config[option] != null ? config[option] : BUSY_CONFIG_DEFAULTS[option];
    }
  }
}

export interface IBusyConfig {
  template?: string;
  backdrop?: boolean;
  wrapperClass?: string;
  busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}

export const BUSY_CONFIG_DEFAULTS = {
  template: `
        <div class="ng-busy-default-wrapper"></div>
    `,
  backdrop: true,
  wrapperClass: 'ng-busy'
};
