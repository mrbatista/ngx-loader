import {
  Directive,
  Input,
  DoCheck,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector, OnDestroy, Output, EventEmitter
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {equals} from './util';
import {PromiseTrackerService} from './promise-tracker.service';
import {BusyService} from './busy.service';
import {IBusyConfig} from './busy.config';
import {BusyComponent} from './busy.component';
import {BusyBackdropComponent} from './busy-backdrop.component';

@Directive({
  selector: '[ngBusy]',
  providers: [PromiseTrackerService]
})
export class BusyDirective implements DoCheck, OnDestroy {
  @Input('ngBusy') options: any;
  private optionsRecord: any;
  private optionsNorm: IBusyConfig;
  template: string;
  backdrop: boolean;
  private busyRef: ComponentRef<BusyComponent>;
  private backdropRef: ComponentRef<BusyBackdropComponent>;

  constructor(
    private service: BusyService,
    private tracker: PromiseTrackerService,
    private cfResolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
    private injector: Injector
  ) {}

  private normalizeOptions(options: any) {
    if (!options) {
      options = {busy: null};
    } else if (Array.isArray(options)
      || options instanceof Promise
      || options instanceof Subscription
    ) {
      options = {busy: options};
    }
    options = Object.assign({}, this.service.config, options);
    if (!Array.isArray(options.busy)) {
      options.busy = [options.busy];
    }

    return options;
  }

  private dectectOptionsChange() {
    if (equals(this.optionsNorm, this.optionsRecord)) {
      return false;
    }
    this.optionsRecord = this.optionsNorm;
    return true;
  }

  // As ngOnChanges does not work on Object detection, ngDoCheck is using
  ngDoCheck() {

    const options = this.optionsNorm = this.normalizeOptions(this.options);

    if (!this.dectectOptionsChange()) {
      return;
    }
    !equals(options.busy, this.tracker.promiseList)
    && this.tracker.reset({
      promiseList: options.busy,
    });
    if (!this.busyRef
      || this.template !== options.template
      || this.backdrop !== options.backdrop
    ) {
      this.destroyComponents();

      this.template = options.template;
      this.backdrop = options.backdrop;

      options.backdrop && this.createBackdrop();

      this.createBusy();
    }
  }

  ngOnDestroy() {
    this.destroyComponents();
  }

  private destroyComponents() {
    this.busyRef && this.busyRef.destroy();
    this.backdropRef && this.backdropRef.destroy();
  }

  private createBackdrop() {
    const backdropFactory = this.cfResolver.resolveComponentFactory(BusyBackdropComponent);
    this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
  }

  private createBusy() {
    const busyFactory = this.cfResolver.resolveComponentFactory(BusyComponent);
    this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);
    const {customClass, template} = this.optionsNorm;
    const instance = this.busyRef.instance;
    instance.customClass = customClass;
    instance.template = template;
  }
}