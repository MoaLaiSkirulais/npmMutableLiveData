// https://dev.to/martinpersson/create-and-publish-your-first-npm-package-a-comprehensive-guide-3l0a


import { Observable, BehaviorSubject, filter, map } from 'rxjs';
import { Observer } from './Observer.class';

export class MutableLiveData<T> {

	private value: T;
	public observable;

	constructor(TCreator: { new(): T; }) {
		this.value = new TCreator();
		this.observable = new BehaviorSubject<T>(this.value);
	}

	public create(): Observable<T> {
		return this.observable;
	}

	public observe(fn: (a: T) => any): Observable<T> {
		this.observable.subscribe(fn);
		return this.observable;
	}

	public getValue(): T {
		return this.value;
	}

	public postValue(value: T): any {
		this.value = value;
		this.observable.next(value);
	}

	observe2(param: (a: T) => any): Observable<T>;
	observe2(param: Observer<T>): Observable<T>;
	observe2(param: unknown): Observable<T> {
		console.log("typeof param", typeof param);

		if (typeof param === "function") {
			this.observable.subscribe(param);
			return this.observable;

		} else  {
			this.observable.pipe(
				filter(data => {
					console.log("data", data)
					return false;
				}),
				map((val) => {return val as number * 2}),    //map operator
			)
			var p = param as Observer<T>;
			this.observable.subscribe(p.onChange);
			return this.observable;
		}

		return this.observable;
	}

}
