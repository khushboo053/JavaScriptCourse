'use strict';
//////////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR FUNCTIONS & NEW OPERATOR
// Class itself is not an object
// All of these instances, so these objects which has been created from class, of course can have different data in them, but they all share the same functionality

// Regular function & constructor function difference is that in constructor func, we use new operator
// COnstructor function name must start with a capital letter

// Arrow function will not work as a function constructor & that's becoz it doesn't have its own this keyword

const Person = function (firstName, birthYear) {
  // console.log(this);
  // now create a property on this keyword with the same name & set the value to it.

  // Properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Methods - never create a method inside a constructor
  // this.calcAge = function() {
  //     console.log(2024 - this.birthYear);
  // }
};
const khushboo = new Person('Khushboo', 2003);
console.log(khushboo);

// 1. A new empty object is created
// 2. function is called, this keyword will be set to the newly created object. this = {}
// 3. These newly created object is linked to a prototype
// 4. function automatically return empty obejct. An object no longer needs to be empty & so this is the trick of making the constructor function work

// Each of them is its own new object that we created programmatically, using a function constructor

// in OOP, object created from a class is called an instance

// We didn't technically created a class here, as JS doesn't really have classes in the sense of traditional OOP.
// We did create an object from constructor function.

const sam = new Person('Samridhi', 2002);
const tis = new Person('Tisha', 2003);
console.log(sam, tis);

// Here, khushboo, sam, tis is an instance of an object

console.log(khushboo instanceof Person); // true
// console.log(km instanceof Person); // not defined error

// NOTE- You should never create a method inside of a constructor function.That's because imagine we were gonna create a hundred or thousands or even tens of thousands of person objects using this constructor function. Then what would happen, is that each of these objects would carry around this function here. So if we had a thousand objects, we would essentially create a thousand copies of this function. And so that would be terrible for the performance of our code.  Again, don't do this. But instead to solve this problem, we are gonna use prototypes and prototype inheritance just like we discussed in the last video. All right, great.

// Function constructors are not really the feature of JS. Instead, they are simply a pattern that has been developed by other developers. And now everyone simply uses this.

////////////////////////////////////////////////////////////////////
// PROTOTYPES
// each and every function in JavaScript automatically has a property called prototype. And that includes, of course, constructor functions. Now every object that's created by a certain constructor function will get access to all the methods and properties that we define on the constructors prototype property.

// all the objects that are created through this constructor function here will inherit, so they will get access to all the methods and properties that are defined on this prototype property. And so let's no actually add a method to this prototype property. And so, this is actually an object.

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};
// this object does not contains a calcAge method but still we have access to it coz of prototypal inheritance
khushboo.calcAge();
tis.calcAge();
sam.calcAge();

// So above here, we have created a copy of this method here & attached it to every single object. & that's why we don't create methods inside the constructor

console.log(khushboo.__proto__);

// So person dot prototype here is actually not the prototype of person. But instead, it is what's gonna be used as the prototype of all the objects that are created with the person constructor function.

console.log(khushboo.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(khushboo));
console.log(Person.prototype.isPrototypeOf(sam));
console.log(Person.prototype.isPrototypeOf(Person));

// From where does this proto property of this khushboo object exactly comes from? - .prototyptOfLinkedObjects
// We can also set properties on prototypes, just as methods
Person.prototype.species = 'Homo Sapiens';
console.log(khushboo.species, sam.species);

console.log(khushboo.hasOwnProperty('species')); // this property is not inside khushboo object it simply has access to it coz of its prototytpe
console.log(khushboo.hasOwnProperty('firstName'));
console.log(khushboo.hasOwnProperty('birthYear'));

// The ability of looking up methods & properties in a prototype is called a prototype chain.

//////////////////////////////////////////////////////////////////
// PROTOTYPAL INHERITANCE ON IN-BUILT OBJECTS
console.log(
  'PROTOTYPAL INHERITANCE ON IN-BUILT OBJECTS=------------------------'
);
console.log(khushboo.__proto__);
// Object.prototype (top of prototype chain)
console.log(khushboo.__proto__.__proto__);
console.log(khushboo.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// prototype of an array
const arr = [1, 2, 3, 5, 7, 10, 5, 7, 10];
console.log(arr.__proto__);
console.log(arr.__proto__ == Array.prototype); // true
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);
// prototype of a function, every function is also an object

/////////////////////////////////////////////////////////
// ES6 CLASSES
// Classes in JS, do not work like traditional classes as in any other langugaes like Java, C++, etc.

// Class Expression
// const PersonCl = class {}

// Class Declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // All of these methods that we write in the class, so outside of the constructor will be on the prototype of the objects & not on the object themselves
//   Instance Methods
  // Methods will be added to the .prototype property so that all instances can have access to them & therefore the name instance methods
  calcAge() {
    console.log(2024 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // Getter is indeed just like any other regular method that we set on the prototype
  get age() {
    return 2024 - this.birthYear;
  }

  //   Here, both setter function & constructor function r trying to set the exact same property name which leads to a conflict. & so that give the origin to this weird error. So create a new property name from  'fullName' to '_fullName'
  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  // create a static method
  static hey() {
    console.log('Hey there...🙋‍♀️');
  }
}

// Instance
const jessica = new PersonCl('Jessica Davis', 2001);

console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.fullName);

console.log(jessica.__proto__ === PersonCl.prototype);

// This proofs that class really just hides the true nature of prototypal inheritance in JS
// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// }
jessica.greet();

// NOTE
// 1. Classes are not hoisted. And so even if they r class declarations. So function declarations are hoisted which means we can use them before they r declared in the code. But with classes that doesn't work

// 2. Just like fnctions, classes r also first-class citizens. That means we can pass them into functions & also return them from functions

// 3. Classes are executed in strict mode

//////////////////////////////////////////////////////////////////
// SETTERS & GETTERS
// Can be very useful for data validation
// We call these special properties - Assessor properties while normal properties r called data properties
// const walter = new PersonCl('Walter', 2000); // gives an alert of not a fullname
const walter = new PersonCl('Walter white', 2000);

PersonCl.hey(); // this time this keyword points to the entire class

const account = {
  owner: 'Khushboo',
  movements: [250, 340, 225, 377],

  // Getter
  get latest() {
    return this.movements.slice(-1).pop(); // shallow copy
  },

  // Setter
  // Any setter method needs to have exactky 1 parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};
// call this as a property & not as a method
// this is very useful when we have to read some property but still need to do some calculations before.
console.log(account.latest);

account.latest = 50;
console.log(account.movements);



////////////////////////////////////////////////////////////////////////
// STATIC METHODS
// In array we can't use from, from is not a function
// from method here 1:05 is really a method that is attached to the Array constructor. So we could not use the from method on an Array. So this is not gonna work.

// So from is not a function.And so that is because this from method here is really attached to the entire constructor, so the Array constructor 1:33 and not to the prototype property of the constructor.

// And so therefore all the Arrays do not inherit this method. Again because its not on their prototype.Its simply attached to the constructor itself. So Array.from here is basically just a simple function, but its a function that's attached to the Array constructor.

Person.hey = function() {
    console.log('Hey there...🙋‍♀️');

    // Whatever object i.e. Person is calling the method will be the this keyword inside of that function. So here this keyword is simply that entire constructor function
    console.log(this); // Person
}
Person.hey();

// Just like we cannot call a from method on an array, we cannot say khushboo.hey coz it simply is not IN THE PROTOTYPE OF the khushboo object
// khushboo.hey();



/////////////////////////////////////////////////////////////////////
// OBJECT.CREATE FUNCTION
// there are no prototype properties involved. 0:38 And also no constructor functions, and no new operator. 0:43 So instead, we can use Object.create 0:46 to essentially manually set the prototype of an object, 0:51 to any other object that we want.

// That's all the methods that we want the person objects to inherit. & so we put them in a prototype

// And now all we need to do is to actually create a person object with this object here as the prototype. And for that, we can use Object.create.
const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
};

// steven is an empty object & it will be  linked to this PersonProto obejct, which will be its prototype 
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2005;
steven.calcAge();

// We implemented a prototypal inheritance but just in a different way

// So when we use the new operator in constructor functions or classes, it automatically sets the prototype of the instances to the constructors, prototype property. So this happens automatically. And so that's nothing new at this point for you. 

// Now, on the other hand, with Object.create, we can set the prototype of objects manually to any object that we want. And in this case, we manually set the prototype of the Steven object to the person proto object. And that's it. Now the two objects are effectively linked through the proto property, just like before. So now looking at properties, or methods in a prototype chain, works just like it worked in function constructors, or classes. And so the prototype chain, in fact, looks exactly the same here.

// he big difference is that we didn't need any constructor function, and also no prototype property at all, to achieve the exact same thing.

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2000);
sarah.calcAge();


///////////////////
// INHERITANCE BETWEEN CLASSES_CONSTRUCTOR FUNCTIONS

const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  //   Person1(firstName, birthYear); //error as this is irregular function call and here this is undefined
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

// if we declare this introduce method before linking prototype as it was after then it could override the method

//Linking prototype
Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype; // not work

Student.prototype.introduce = function () {
  console.log(`Hi! I'm ${this.firstName}, studying ${this.course}`);
};

const mike = new Student('Mike', 2002, 'IT');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);



////////////////////////////////////////////////////////////
// INHERITANCE BETWEEN_CLASSES__ES6 CLASSES
// The class syntax hides a lot of the details that ractually happening behind the scenes. 
// Coz classes r really just a layer of abstraction over constructor functions
// We need extend keyword & super function in this topic

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // super is the constructor function of parent class
    // Always need to happen first coz this call to the super function is responsible for creating the this keyword in this subclass. So without this we can't access to this keyword. 
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`Hi! I'm ${this.fullName}, studying ${this.course}`);
  }

  // Lets override one of the method of parent class
  // This calcAge() method here is shadowing the one that is in the parent class
  calcAge() {
    console.log(`I'm ${2024 - this.birthYear} years old, but as a student I feel more like ${2024 - this.birthYear + 10}`);
  }
};

// This was just to demonstrate that if we do not need any new properties then u don't even need to bother writing a constructor method in the child class.
// const martha = new StudentCl('Martha Jones', 2000);
const martha = new StudentCl('Martha Jones', 2000, 'CS');
console.log(martha);

martha.introduce();
// Same should work with calcAge() method which is in parent class
martha.calcAge();




///////////////////////////////////////////////////////////////////
// INHERITANCE BETWEEN_CLASSES__OBJECT.CREATE
const emily = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
}

StudentProto.introduce = function() {
  console.log(`Hi! I'm ${this.firstName}, studying ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();


///////////////////////////////////////////
// CLASSES EXAMPLE
class Account {
  // 1) Public Fields r on instances & not added on to prototype
  // these fields r also referenceable via the this keyword
  locale = navigator.language;
  // _movements = [];

  // 2) Private fields - Really truely not accessible from the outside
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // using underscore it becomes protected & so developers will not use it as a public interface
    // this._movements = [];
    // this.locale = navigator.language;
  }

  // 3) Public Methods
  // Public Interface
  // These methods r interface to our objects & we also call it a API
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // make the method chainable
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved');
      return this;
    }
  }

  // 4) Private Methods
  // This is the internal method & only requestLoan() can use it & its not be used like this acc1.approveLoan()
  // #approveLoan(val) {
    //   return true;
    // }

    _approveLoan(val) {
      return true;
    }

  // There is also a static version
  static helper() {
    console.log('Helper method');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.movements.push(250);
// acc1.movements.push(-100);
// console.log(acc1.movements);
// here, we r using public interface that we build above
acc1.deposit(250);
acc1.withdrawal(-100);
// We r getting error coz its a private method & its giving private field error so its a bug in JS & so also its not supported by chrome & browser
// acc1.#approveLoan(1000);
acc1._approveLoan(1000);
acc1.requestLoan(1000);

console.log(acc1);
console.log(acc1.pin);
// console.log(acc1.#pin); // error

Account.helper(); //we can use by this only

/////////////////////////////////////////////////////////////////////////
// ENCAPSULATION: PROTECTED PROPERTIES & METHODS
// encapsulation basically means to keep some properties and methods private inside the class so that they are not accessible from outside of the class. Then the rest of the methods are basically exposed as a public interface, which we can also call API.

// Now, there are two big reasons why we need encapsulation and data privacy. So first it is to prevent code from outside of a class to accidentally manipulate or data inside the class.

// Now, the second reason is that when we expose only a small interface so a small API consisting only of a few public methods then we can change all the other internal methods with more confidence. Because in this case, we can be sure that external code does not rely on these private methods. And so therefore our code will not break when we do internal changes.

// if we use this underscore outside here as well but at least now everyone on your team and that includes yourself will know that this property is not supposed to be touched outside of the class.
// acc1._movements.push(250);
// acc1._movements.push(-100);

// If we still wanted to give access to the movements array from the outside then we would have to implement a public method for that.

// the correct way to get the movements, so get movements. And so this one everyone can still at least access the movements but they cannot override them.
console.log(acc1.getMovements());


/////////////////////////////////////////////////////////////////////////
// ENCAPSULATION: PRIVATE FIELDS & METHODS

// Public Fields
// Private Fields
// Public Methods
// Private Methods


/////////////////////////////////////////////////////////////////////
// CHAINING METHODS
// we could first filter an array, then map the result.And finally reduce the results of the map, all in one line of code. And we can actually implement the same ability of chaining methods in the methods of our class. 
// By adding 'return this' in methods it makes the method chainable
acc1.deposit(500).deposit(700).withdrawal(50).requestLoan(5000).withdrawal(100);
console.log(acc1.getMovements());