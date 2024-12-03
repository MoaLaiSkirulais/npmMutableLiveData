import { MutableLiveData } from "../index.js";
import { Mutable } from "../Mutable.class.js";

var m: MutableLiveData<String>;
m = new MutableLiveData(String);

m.postValue("hola");
m.observe((a: String) => {
	console.log("m", a)
	return "a";
});

/* number */
var age = new Mutable(Number);
age.observe(new class Observer<Number> {
 
	onChange(value: Number):any {
		console.log("value", value, typeof value);
	}
});

age.postValue(23);

