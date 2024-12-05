import { MutableLiveData } from "../MutableLiveData.class.js";

var color: MutableLiveData<String>;
color = new MutableLiveData(String);
//color.postValue("yellow");

color.observe((value: String) => {
	//console.log("value1", value);
});

color.observe(new class <String> {
 
	onChange(value: String):any {

		console.log("value2", value, typeof value);
	}
});

color.postValue("red");
color.postValue("green");
color.postValue("blue");





