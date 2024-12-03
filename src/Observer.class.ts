export abstract class Observer<T>  {

	constructor() { };
	abstract onChange(a:T):any;
}
