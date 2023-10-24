## Section 02: JavaScript Refresher

#### Table of Contents

- Module Introduction
- Starting Project
- Adding JavaScript To A Page & How React Projects Differ
- React Projects Use a Build Process
- "import" & "export"
- Revisiting Variables & Values
- Revisiting Operators
- Revisiting Functions & Parameters
- Coding Exercise 1: Exercise: Working with Functions
- Arrow Functions
- More on the Arrow Function Syntax
- Revisiting Objects & Classes
- Arrays & Array Methods like map()
- Coding Exercise 2: Exercise: Array Methods
- Destructuring
- Destructuring in Function Parameter Lists
- The Spread Operator
- Revisiting Control Structures
- Manipulating the DOM - Not With React!
- Using Functions as Values
- Defining Functions Inside Of Functions
- Reference vs Primitive Values
- Next-Gen JavaScript - Summary
- JS Array Functions
- Module Resources

### Module Introduction

### Starting Project

[JavaScript Code](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/02_javascript_refresher/js-code>)

[React Code](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/02_javascript_refresher/react-code>)

### Adding JavaScript To A Page & How React Projects Differ

### React Projects Use a Build Process

The code you write is not the code that gets executed in the browser

Your code is transformed before it's handed off to the browser

#### React Projects Use a Build Process

1. Raw, unprocessed React code won’t execute in the browser
   - JSX -- JSX is not a default JavaScript feature
2. In addition, the code would not be optimized for production (e.g., not
   minified)

React projects require a **build process** that transforms your code.

`create-reat-app`, `vite`, etc. give you such a build process (no custom setup
or tweaking needed)

### "import" & "export"

```js
import { apiKey } from "./util.js";
import apiKey from "./util.js";
import { apiKey, abc as content } from "./util.js";
import * as util from "./util.js";
```

### Revisiting Variables & Values

#### There are Different Types of Premitive Values

- String
- Number
- Boolean
- Null & undefined

#### String

- Text values
- Wrapped with single or double quotes
- Can also be created with backsticks (`)
- Examples:
  - `"Hello World"`
  - `'Max'`
  - `Hi there`

#### Number

- Positive or negative
- With decimal point (float) or without it (integer)
- Examples:
  - `5`
  - `-23`
  - `3.14`
  - `-8.12`

#### Boolean

- True or false
- A simple "Yes" or "No" value type
- Typically used in conditions
- Examples:
  - `true`
  - `false`

#### Null & undefined

- "There is no value"
- undefined: Default if no value was assigned yet
- null: Explicitly assigned by developer (reset value)
- Examples:
  - `undefined`
  - `null`

#### Variables store Values

Variables are data containers

![Variables](/React%20-%20The%20Complete%20Guide%202023/02_javascript_refresher/variables.png)

#### Why Use Variables?

**Reusability**

Store a value in a variable once and use it as often and in as many places as
needed

**Readability**

Organize your code over several lines rather than cramming everything into a
single line

#### Variables vs Constants

**Variables**

- Defined via `let`
- Can be re-assigned (i.e., the stored value can be "overwritten")

```js
let age = 34;
age = 29;
```

**Constants**

- Defined via `const`
- Cannot be re-assigned

```js
const age = 34;
age = 29; // error
```

#### Values can be hardcoded

They can also be derived via **Expressions & Operators**

### Revisiting Operators

There are different types of JavaScript operators:

- Arithmetic Operators
- Assignment Operators
- Comparison Operators
- String Operators
- Logical Operators
- Bitwise Operators
- Ternary Operators
- Type Operators

[W3 Schools JavaScript Operators](https://www.w3schools.com/js/js_operators.asp)

### Revisiting Functions & Parameters

JavaScript code is **case-sensitive**!

#### Identifiers Must Follow Certain Rules & Recommendations

1. Must not contain whitespace or special characters (except $ and \_)

   Valid: `$userName`, age, user_name, data$, …

   Invalid: %userName, age/, user name, …

2. May contain numbers but must not start with a number

   Valid: user3, us3r, …

   Invalid: 3user, 11players, …

3. Must not clash with reserved keywords

   Valid: user, age, data, …

   Invalid: let, const, if, …

4. Should use camelCasing

   Recommended: userName, isCorrect, …

   Uncommon: user_name, iscorrect, …

5. Should describe what the “thing” it identifies contains or does

   Recommended: userName, isCorrect, loadData, …

   Uncommon: userDataPoint, correctness, dataLoader, …

#### Semicolons are optional (in moset cases)!

#### Whitespace is ignored in many cases!

Use it to format your code & improve readability

But avoid adding too much whitespace

### Coding Exercise 1: Exercise: Working with Functions

#### Exercise: Working with Functions

Your task is to write a new function that should be named `combine` and have the
following characteristics:

- Accept three input values
- Calculate a new value based on the three input values: `a \* b / c` (if a, b &
  c are the input values)
- Return the calculated result

```js
function combine(a, b, c) {
  return (a * b) / c;
}
```

### Arrow Functions

```js
function handleTimeout() {
  console.log("Timed out!");
}

const handleTimeout2 = () => {
  console.log("Timed out ... again!");
};
```

### More on the Arrow Function Syntax

### Revisiting Objects & Classes

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hi!");
  }
}

const user1 = new User("Manuel", 35);
console.log(user1);
user1.greet();
```

### Arrays & Array Methods like map()

```js
const hobbies = ["Sports", "Cooking"];
hobbies.push("Working");
console.log(hobbies);

const index = hobbies.findIndex((item) => item === "Sports");
console.log(index);

const editedHobbies = hobbies.map((item) => ({ text: item }));
console.log(editedHobbies);
```

### Coding Exercise 2: Exercise: Array Methods

#### Exercise: Array Methods

Your task is to add the missing logic to a transformToObjects() function that
should transform a list of numbers into a list of JavaScript objects.

In the newly returned array, every object must have a val key and the input
array's number as a value.

For example, for the provided input `[1, 2, 3]` the
`transformToObjects([1, 2, 3])` function should return
`[{val: 1}, {val: 2}, {val: 3}]`.

```js
function transformToObjects(numberArray) {
  return numberArray.map((item) => ({
    val: item,
  }));
}
```

### Destructuring

```js
const userNameData = ["Max", "Schwarzmüller"];
const firstName = userNameData[0];
const lastName = userNameData[1];

const { name: userName, age } = {
  name: "Max",
  age: 34,
};

console.log(userName);
console.log(age);
```

### Destructuring in Function Parameter Lists

The destructuring syntax explained in the previous lecture can also be used in
**function parameter lists**.

For example, if a function accepts a parameter that will **contain an object**
it can be destructured to "pull out" the object properties and make them
available as **locally scoped variables** (i.e., variables only available inside
the function body).

Here's an example:

```js
function storeOrder(order) {
  localStorage.setItem("id", order.id);
  localStorage.setItem("currency", order.currency);
}
```

Instead of accessing the `order` properties via the "dot notation" inside the
`storeOrder` function body, you could use destructuring like this:

```js
function storeOrder({ id, currency }) {
  // destructuring
  localStorage.setItem("id", id);
  localStorage.setItem("currency", currency);
}
```

The destructuring syntax is the same as taught in the previous lecture - just
without creating a constant or variable manually.

Instead, `id` and `currency` are _"pulled out"_ of the incoming object (i.e.,
the object passed as an argument to `storeOrder`).

It's very important to understand, that storeOrder **still only takes one
parameter** in this example! It does **not** accept two parameters. Instead,
it's one single parameter - an **object** which then just is destructured
internally.

The function would still be called like this:

```js
storeOrder({ id: 5, currency: "USD", amount: 15.99 }); // one argument / value!
```

### The Spread Operator

```js
const hobbies = ["Sports", "Cooking"];
const user = {
  name: "Max",
  age: 34,
};

const newHobbies = ["Reading"];

const mergedHobbies = [...hobbies, ...newHobbies];
console.log(mergedHobbies);

const extendedUser = {
  isAdmin: true,
  ...user,
};
console.log(extendedUser);
```

### Revisiting Control Structures

```js
const password = prompt("Your password");

if (password === "Hello") {
  console.log("Hello works");
} else if (password === "hello") {
  console.log("hello works");
} else {
  console.log("Access not granted.");
}

const hobbies = ["Sports", "Cooking"];

for (const hobby of hobbies) {
  console.log(hobby);
}
```

### Manipulating the DOM - Not With React!

```js
const list = document.querySelector("ul");
list.remove();
```

We will use React DOM in this course.

### Using Functions as Values

```js
function handleTimeout() {
  console.log("Timed out!");
}

const handleTimeout2 = () => {
  console.log("Timed out ... again!");
};

setTimeout(handleTimeout, 2000);
setTimeout(handleTimeout2, 3000);
setTimeout(() => {
  console.log("More timing out...");
}, 4000);
```

### Defining Functions Inside Of Functions

```js
function init() {
  function greet() {
    console.log(“Hi!“);
  }

  greet();
}

init();
```

### Reference vs Primitive Values

#### Reference values

**Your Code**

| **Your Code**                            | **Computer Memory**              |
| ---------------------------------------- | -------------------------------- |
| `const hobbies = ["Sports", "Cooking"];` | 1034 ["Sports", "Cooking"];      |
|                                          | 1034 {content: "Other data"...}; |
|                                          | ...                              |

- Objects = Reference Values
- For objects (and array), the memory address is stored in the variable
- The underlying value (i.e., the object / array) can be edited without changing
  that address
- The value can therefore be edited without reassigning the variable
- `["Sports", "Cooking"]` gets stored in the variable / constant in the memory

### Next-Gen JavaScript - Summary

#### let & const

Read more about `let`:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

Read more about `const`:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

#### ES6 Arrow Functions

Read more:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

Arrow functions are a different way of creating functions in JavaScript.

Arrow function syntax may look strange but it's actually simple.

```js
function callMe(name) {
  console.log(name);
}
```

which you could also write as:

```js
const callMe = function (name) {
  console.log(name);
};
```

becomes:

```js
const callMe = (name) => {
  console.log(name);
};
```

**Important:**

When having **no arguments**, you have to use empty parentheses in the function
declaration:

```js
const callMe = () => {
  console.log("Max!");
};
```

When having exactly **one argument**, you may omit the parentheses:

```js
const callMe = (name) => {
  console.log(name);
};
```

When just returning **a value**, you can use the following shortcut:

```js
const returnMe = (name) => name;
```

That's equal to:

```js
const returnMe = (name) => {
  return name;
};
```

#### Exports & Imports

In React projects (and actually in all modern JavaScript projects), you split
your code across multiple JavaScript files - so-called modules. You do this, to
keep each file/ module focused and manageable.

To still access functionality in another file, you need `export` (to make it
available) and `import` (to get access) statements.

You got two different types of exports: **default** (unnamed) and **named**
exports:

**default** => `export default ...;`

**named** => `export const someData = ...;`

You can import **default exports** like this:

`import someNameOfYourChoice from './path/to/file.js';`

Surprisingly, `someNameOfYourChoice` is totally up to you.

**Named exports** have to be imported by their name:

`import { someData } from './path/to/file.js';`

A file can only contain one default and an unlimited amount of named exports.
You can also mix the one default with any amount of named exports in one and the
same file.

When importing **named exports**, you can also import all named exports at once
with the following syntax:

`import \* as upToYou from './path/to/file.js';`

`upToYou` is - well - up to you and simply bundles all exported
variables/functions in one JavaScript object. For example, if you
`export const someData = ... (/path/to/file.js )` you can access it on `upToYou`
like this: `upToYou.someData`.

#### Classes

Classes are a feature which basically replace constructor functions and
prototypes. You can define blueprints for JavaScript objects with them.

Like this:

```js
class Person {
  constructor() {
    this.name = "Max";
  }
}

const person = new Person();
console.log(person.name); // prints 'Max'
```

In the above example, not only the class but also a property of that class (=>
`name`) is defined. The syntax you see there, is the "old" syntax for defining
properties. In modern JavaScript projects (as the one used in this course), you
can use the following, more convenient way of defining class properties:

```js
class Person {
  name = "Max";
}

const person = new Person();
console.log(person.name); // prints 'Max'
```

You can also define methods. Either like this:

```js
class Person {
  name = "Max";
  printMyName() {
    console.log(this.name); // this is required to refer to the class!
  }
}

const person = new Person();
person.printMyName();
```

Or like this:

```js
class Person {
  name = "Max";
  printMyName = () => {
    console.log(this.name);
  };
}

const person = new Person();
person.printMyName();
```

The second approach has the same advantage as all arrow functions have: The this
keyword doesn't change its reference.

You can also use **inheritance** when using classes:

```js
class Human {
  species = "human";
}

class Person extends Human {
  name = "Max";
  printMyName = () => {
    console.log(this.name);
  };
}

const person = new Person();
person.printMyName();
console.log(person.species); // prints 'human'
```

#### Spread & Rest Operator

The spread and rest operators actually use the same syntax: `...`

Yes, that is the operator - just three dots. It's usage determines whether
you're using it as the spread or rest operator.

**Using the Spread Operator:**

The spread operator allows you to pull elements out of an array (=> split the
array into a list of its elements) or pull the properties out of an object. Here
are two examples:

```js
const oldArray = [1, 2, 3];
const newArray = [...oldArray, 4, 5]; // This now is [1, 2, 3, 4, 5];
```

Here's the spread operator used on an object:

```js
const oldObject = {
  name: "Max",
};
const newObject = {
  ...oldObject,
  age: 28,
};
```

`newObject` would then be

```js
{
name: 'Max',
age: 28
}
```

The spread operator is extremely useful for cloning arrays and objects. Since
both are **reference types (and not primitives)**, copying them safely (i.e.
preventing future mutation of the copied original) can be tricky. With the
spread operator you have an easy way of creating a (shallow!) clone of the
object or array.

#### Destructuring

Destructuring allows you to easily access the values of arrays or objects and
assign them to variables.

Here's an example for an array:

```js
const array = [1, 2, 3];
const [a, b] = array;
console.log(a); // prints 1
console.log(b); // prints 2
console.log(array); // prints [1, 2, 3]
```

And here for an object:

```js
const myObj = {
  name: "Max",
  age: 28,
};
const { name } = myObj;
console.log(name); // prints 'Max'
console.log(age); // prints undefined
console.log(myObj); // prints {name: 'Max', age: 28}
```

Destructuring is very useful when working with function arguments. Consider this
example:

```js
const printName = (personObj) => {
  console.log(personObj.name);
};
printName({ name: "Max", age: 28 }); // prints 'Max'
```

Here, we only want to print the name in the function but we pass a complete
person object to the function. Of course this is no issue but it forces us to
call personObj.name inside of our function. We can condense this code with
destructuring:

```js
const printName = ({ name }) => {
  console.log(name);
};
printName({ name: "Max", age: 28 }); // prints 'Max')
```

We get the same result as above but we save some code. By destructuring, we
simply pull out the `name` property and store it in a variable/ argument named
`name` which we then can use in the function body.

### JS Array Functions

JavaScript array functions like `map()`, `filter()`, `reduce()`, etc.

You'll see me use them quite a bit since a lot of React concepts rely on working
with arrays (in immutable ways).

The following page gives a good overview over the various methods you can use on
the array prototype
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

Particularly important in this course are:

- `map()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- `find()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
- `findIndex()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
- `filter()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- `reduce()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
- `concat()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b
- `slice()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
- `splice()` =>
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

### Module Resources
