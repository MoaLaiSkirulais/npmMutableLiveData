// https://dev.to/martinpersson/create-and-publish-your-first-npm-package-a-comprehensive-guide-3l0a


import { Observable, BehaviorSubject } from 'rxjs';

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

	//public observe(fn: GreetingFunction):Observable<string> {
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

}
