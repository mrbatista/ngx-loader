import {
  OnInit, ComponentFactoryResolver, ComponentRef,
  Directive, DoCheck,
  Injector, Input, OnDestroy, ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NgxLoaderConfig, INgxLoaderConfig} from './ngx-loader.config';
import {NgxLoaderComponent} from './ngx-loader.component';
import {NgxLoaderBackdropComponent} from './ngx-loader-backdrop.component';

@Directive({
  selector: '[ngxLoader]'
})

export class NgxLoaderDirective implements OnDestroy, OnInit, DoCheck {

  options: any;
  private busyRef: ComponentRef<NgxLoaderComponent>;
  private backdropRef: ComponentRef<NgxLoaderBackdropComponent>;
  private optionsNorm: INgxLoaderConfig;
  private optionsTemp: INgxLoaderConfig;

  constructor(private cfResolver: ComponentFactoryResolver,
              private vcRef: ViewContainerRef,
              private injector: Injector) {
    this.optionsNorm = new NgxLoaderConfig();
  }

  @Input()
  set ngxLoader(passedValue: any) {
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
      this.options = {busy: promise};
    } else if (isPromise) {
      this.options = {busy: passedValue};
    } else if (passedValue && passedValue.busy instanceof Promise) {
      this.options = Object.assign({}, NgxLoaderConfig, passedValue);
    } else if (passedValue && passedValue.busy instanceof Subscription) {
      passedValue.busy = new Promise((resolve) => {
        (passedValue.busy as Subscription).add(resolve);
      });
      this.options = Object.assign({}, NgxLoaderConfig, passedValue);
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
    if (this.busyRef && this.options !== this.optionsTemp) {
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
    this.createBusy();
    if (this.options.backdrop) {
      this.createBackdrop();
    }
  }

  checkAndInitPromiseHandler() {
    if (this.options.busy) {
      this.initPromiseHandler();
    }
  }

  initLoadingState() {
    this.busyRef.instance.active = true;
    if (this.backdropRef) {
      this.backdropRef.instance.active = true;
    }
  }

  cancelLoadingStateIfPromiseDone() {
    this.busyRef.instance.active = false;
      if (this.backdropRef) {
        this.backdropRef.instance.active = false;
      }

  }

  initPromiseHandler() {
    const promise = this.options.busy;


    // create timeout if option is set


    const resolveLoadingState = () => {
      this.cancelLoadingStateIfPromiseDone();
    };


    this.initLoadingState();

    // native Promise doesn't have finally
    if (promise.finally) {
      promise.finally(resolveLoadingState);

    } else {
      promise
        .then(resolveLoadingState)
        .catch(resolveLoadingState);
    }

  }

  private destroyComponents() {
    this.busyRef && this.busyRef.destroy();
    this.backdropRef && this.backdropRef.destroy();
  }

  private createBackdrop() {
    const backdropFactory = this.cfResolver.resolveComponentFactory(NgxLoaderBackdropComponent);
    this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
  }

  private createBusy() {
    const busyFactory = this.cfResolver.resolveComponentFactory(NgxLoaderComponent);
    this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);
    const {customClass, template} = this.options;
    const instance = this.busyRef.instance;
    instance.customClass = customClass;
    instance.template = template;
  }
}
