import {Subscription} from 'rxjs/Subscription';

export class NgxLoaderConfig implements INgxLoaderConfig {
  template: string;
  backdrop: boolean;
  customClass: string;

  constructor(config: INgxLoaderConfig = {}) {
    for (const option in SUBJECT_CONFIG_DEFAULTS) {
      this[option] = config[option] != null ? config[option] : SUBJECT_CONFIG_DEFAULTS[option];
    }
  }
}

export interface INgxLoaderConfig {
  template?: string;
  backdrop?: boolean;
  customClass?: string;
  subject?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}

export const SUBJECT_CONFIG_DEFAULTS = {
  template: `
        <div class="ng-subject-default-wrapper"></div>
    `,
  backdrop: false,
  customClass: 'ng-subject'
};
