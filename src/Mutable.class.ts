// https://dev.to/martinpersson/create-and-publish-your-first-npm-package-a-comprehensive-guide-3l0a


import { Observable, BehaviorSubject, filter, map } from 'rxjs';
import { Observer } from './Observer.class';

export class Mutable<T> {

	private value: T;
	public observable: Observable<T>;

	constructor(TCreator: { new(): T; }) {
		this.value = new TCreator();
		this.observable = new BehaviorSubject<T>(this.value);
	}

	public create(): Observable<T> {
		return this.observable;
	}

	public observe(observer: Observer<T>): Observable<T> {
		//this.observable.subscribe(observer.onChange);
		this.observable.pipe(
			filter(data => {
				console.log("data", data)
				return false;
			}),
			map((val) => {return val as number * 2}),    //map operator
		)
		this.observable.subscribe(observer.onChange);
		return this.observable;
	}

	public getValue(): T {
		return this.value;
	}

	public postValue(value: T): any {
		this.value = value;
		this.observable.next(value);
	}
}
