import {Subscription} from 'rxjs/Subscription';

export class NgxLoaderConfig implements INgxLoaderConfig {
  template: string;
  backdrop: boolean;
  customClass: string;

  constructor(config: INgxLoaderConfig = {}) {
    for (const option in BUSY_CONFIG_DEFAULTS) {
      this[option] = config[option] != null ? config[option] : BUSY_CONFIG_DEFAULTS[option];
    }
  }
}

export interface INgxLoaderConfig {
  template?: string;
  backdrop?: boolean;
  customClass?: string;
  busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}

export const BUSY_CONFIG_DEFAULTS = {
  template: `
        <div class="ng-busy-default-wrapper"></div>
    `,
  backdrop: true,
  customClass: 'ng-busy'
};
