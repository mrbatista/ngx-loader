import {
  Component, ComponentFactoryResolver, ComponentRef, DoCheck, Injector, Input,
  OnDestroy, OnInit,
  ViewContainerRef
} from '@angular/core';
import {NgxLoaderBackdropComponent} from './ngx-loader-backdrop.component';
import {INgxLoaderConfig, NgxLoaderConfig} from './ngx-loader.config';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'ngx-loader',
  template: `
    <div [class]="customClass">
      <mat-progress-bar class="ngx-loader-progress-bar" [mode]="this.active ? 'indeterminate' : 'determinate'"></mat-progress-bar>
    </div>
  `,
  styles: [`.ngx-loader-progress-bar {
      z-index: 1001;
  }`],
})
export class NgxLoaderComponent implements DoCheck, OnDestroy, OnInit {
  customClass: string;
  template: string;
  active = false;

  options: any;
  private backdropRef: ComponentRef<NgxLoaderBackdropComponent>;
  private optionsNorm: INgxLoaderConfig;
  private optionsTemp: INgxLoaderConfig;

  constructor(private cfResolver: ComponentFactoryResolver,
              private vcRef: ViewContainerRef,
              private injector: Injector) {
    this.optionsNorm = new NgxLoaderConfig();
  }

  @Input()
  set loader(passedValue: any) {
    let promise = null;
    this.options = {};
    const isSubscription: boolean = passedValue instanceof Subscription;
    const isPromise: boolean = passedValue instanceof Promise || (
      passedValue !== null &&
      typeof passedValue === 'object' &&
      typeof passedValue.then === 'function' &&
      typeof passedValue.catch === 'function'
    );

    if (isSubscription) {
      promise = new Promise((resolve) => {
        (passedValue as Subscription).add(resolve);
      });
      this.options = {subject: promise};
    } else if (isPromise) {
      this.options = {subject: passedValue};
    } else if (passedValue && passedValue.subject instanceof Promise) {
      this.options = Object.assign({}, NgxLoaderConfig, passedValue);
    } else if (passedValue && passedValue.subject instanceof Subscription) {
      passedValue.subject = new Promise((resolve) => {
        (passedValue.subject as Subscription).add(resolve);
      });
      this.options = Object.assign({}, NgxLoaderConfig, passedValue);
    }

    if (passedValue && passedValue.customClass) {
      this.options.customClass = passedValue.customClass;
    }
    if (passedValue && passedValue.template) {
      this.options.template = passedValue.template;
    }
    for (const property of Object.keys(this.optionsNorm)) {
      if (this.options && !this.options.hasOwnProperty(property)) {
        this.options[property] = this.optionsNorm[property];
      }
    }
    this.optionsTemp = this.optionsNorm;

    this.checkAndInitPromiseHandler();
  }

  ngDoCheck() {
    if (this.options !== this.optionsTemp) {
      this.destroyComponents();
      this.optionsTemp = this.options;
      this.prepare();
      this.checkAndInitPromiseHandler();
    }
  }

  ngOnInit() {
    this.prepare();
    this.checkAndInitPromiseHandler();
  }

  ngOnDestroy() {
    this.destroyComponents();
  }

  prepare() {
    this.setLoader();
    if (this.options.backdrop) {
      this.createBackdrop();
    }
  }

  checkAndInitPromiseHandler() {
    if (this.options.subject) {
      this.initPromiseHandler();
    }
  }

  initLoadingState() {
    this.active = true;
    if (this.backdropRef) {
      this.backdropRef.instance.active = true;
    }
  }

  cancelLoadingStateIfPromiseDone() {
    this.active = false;
    if (this.backdropRef) {
      this.backdropRef.instance.active = false;
    }

  }

  initPromiseHandler() {
    const promise = this.options.subject;

    const resolveLoadingState = () => {
      this.cancelLoadingStateIfPromiseDone();
    };

    this.initLoadingState();

    if (promise.finally) {
      promise.finally(resolveLoadingState);

    } else {
      promise
        .then(resolveLoadingState)
        .catch(resolveLoadingState);
    }

  }

  private destroyComponents() {
    this.backdropRef && this.backdropRef.destroy();
  }

  private createBackdrop() {
    const backdropFactory = this.cfResolver.resolveComponentFactory(NgxLoaderBackdropComponent);
    this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
  }

  private setLoader() {
    const {customClass, template} = this.options;
    this.customClass = customClass;
    this.template = template;
  }

}
