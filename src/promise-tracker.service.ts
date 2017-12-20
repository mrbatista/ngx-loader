import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class PromiseTrackerService {
  promiseList: Array<Promise<any> | Subscription> = [];

  reset(options: IPromiseTrackerOptions) {

    this.promiseList = [];
    options.promiseList.forEach(promise => {
      if (!promise || promise['busyFulfilled']) {
        return;
      }
      this.addPromise(promise);
    });
  }

  private addPromise(promise: Promise<any> | Subscription) {
    if (this.promiseList.indexOf(promise) !== -1) {
      return;
    }

    this.promiseList.push(promise);

    if (promise instanceof Promise) {
      promise.then.call(
        promise,
        () => this.finishPromise(promise),
        () => this.finishPromise(promise)
      );
    } else if (promise instanceof Subscription) {
      promise.add(() => this.finishPromise(promise));
    }
  }

  private finishPromise(promise: Promise<any> | Subscription) {
    promise['busyFulfilled'] = true;
    const index = this.promiseList.indexOf(promise);
    if (index === -1) {
      return;
    }
    this.promiseList.splice(index, 1);
  }

  isActive() {
   return this.promiseList.length > 0;
  }
}

export interface IPromiseTrackerOptions {
  promiseList: Promise<any>[];
}
