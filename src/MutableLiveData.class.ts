// https://dev.to/martinpersson/create-and-publish-your-first-npm-package-a-comprehensive-guide-3l0a


import { Observable, BehaviorSubject, filter, map, Subject } from 'rxjs';
import { Observer } from './Observer.class';

export class MutableLiveData<T> {

	private value: T;
	public observable;	
	//public observable: Observable<T>;

	constructor(TCreator: { new(): T; }) {
		this.value = new TCreator();
		this.observable = new BehaviorSubject<T>(this.value);
	}

	public create(): Observable<T> { 
		return this.observable;
	}

	public getValue(): T {
		return this.value; 
	}

	public postValue(value: T): any {
 
		console.log("......." ,value)
		this.value = value;
		this.observable.next(value);

		// const messages = new Subject<T>();
		// const newMessage = this.value;
		// messages.next(newMessage);
	}

	observe(param: (a: T) => any): Observable<T>;
	observe(param: Observer<T>): Observable<T>;
	observe(param: ((a: T) => any) | Observer<T>): Observable<T> {

		if (typeof param === "function") {
			this.observable.subscribe(param);
			return this.observable;

		} else {

			var p = param as Observer<T>;
			this.observable.subscribe(p.onChange);
			return this.observable;
		}
	}

}
