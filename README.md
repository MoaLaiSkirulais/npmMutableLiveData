# Example

## Animal class
```typescript
/* nosense class just for the next example */
export class Animal {

	 name: string;
	 race: string;
	  age: number;
	 
	constructor() {

		this.name = "Tom";
		this.race = "Cat";
		this.age = 10;
	}
}
```

## AppComponent
```typescript
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Animal } from '../class/Animal.class';
import {MutableLiveData} from 'mutable-live-data'

@Component({
	selector: 'app-root',
	imports: [NgFor],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})

export class AppComponent {

	animalA: MutableLiveData<Animal>;
	animalB: Animal;

	animalsA: MutableLiveData<Array<Animal>>;
	animalsB: Array<Animal>;

	constructor() {

		/* observing a plain class */
		this.animalA = new MutableLiveData(Animal);
		this.animalB = new Animal();

		this.animalA.observe(() => { 
			this.animalB = this.animalA.getValue();
		});

		/* observing array of same plain class */
		this.animalsA = new MutableLiveData(Array<Animal>);
		this.animalsB = new Array<Animal>();

		this.animalsA.observe(() => { 
			this.animalsB = this.animalsA.getValue();
		});		
	}

	changeAnimal() {

		var animal: Animal = this.animalA.getValue();
		animal.name = "Tim";
		animal.race = "Horse";
		animal.age = 25;
		this.animalA.postValue(animal);

		var animals : Array<Animal> = this.animalsA.getValue();
		animals.push(animal)
		this.animalsA.postValue(animals)
	}
}
```

## html
```html
<h1>Angular Mutable LiveData</h1>

<h2>Animal</h2>
<p>Name: {{animalB.name}}</p>
<p>Race: {{animalB.race}}</p>
<p>Age: {{animalB.age}}</p>

<h2>Animals</h2>
<p>{{animalsB}}</p>

<li>
	<ul *ngFor="let animal of animalsB">

		{{animal.name}}
	</ul>
</li>

<button (click)="changeAnimal()">Change Animal</button>
```