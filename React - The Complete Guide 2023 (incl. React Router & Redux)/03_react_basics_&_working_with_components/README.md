## Section 03: React Basics & Working with Components

#### Table of Contents

- Module Introduction
- What Are Components? And Why Is React All About Them?
- React Code Is Written In A "Declarative Way"!
- Creating a new React Project
- The Starting Project
- Analyzing a Standard React Project
- Introducing JSX
- How React Works
- Coding Exercise 3: Exercise: Working with JSX Code
- Building a First Custom Component
- Coding Exercise 4: Exercise: Building a First Component
- Writing More Complex JSX Code
- Adding Basic CSS Styling
- Outputting Dynamic Data & Working with Expressions in JSX
- Passing Data via "props"
- Coding Exercise 5: Exercise: Passing Data via "props"
- Alternative Ways of Passing & Receiving / Handling "props"
- Adding "normal" JavaScript Logic to Components
- Splitting Components Into Multiple Components
- Assignment 1: Time to Practice: React & Component Basics
- The Concept of "Composition" ("children props")
- Coding Exercise 6: Exercise: Component Composition
- A First Summary
- A Closer Look At JSX
- Organizing Component Files
- An Alternative Function Syntax
- Quiz 1: Learning Check: React Basics, Components, Props & JSX
- Module Resources

### Module Introduction

### What Are Components? And Why Is React All About Them?

#### Component-Driven User Interfaces

- Building interactive & scalable UIs
- React Core Syntax & JSX
- Working with Components
- Working with Data

HTML, CSS & JavaScript are about building user interfaces as well

React makes building complex, interactive and reactive user interfaces simpler.

#### React is all about Components

All user interfaces in the end are made up of components

#### Why Components?

- Reusability
  - Don't repeat yourself
- Separation of Concerns
  - Don't do too many things in one and the same place

### React Code Is Written In A "Declarative Way"!

![React Component](<https://github.com/lcycstudio/javascript/blob/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/react.png>)

#### React & Components

- React allows you to create **re-usable** and **reactive** components consisting of HTML, CSS and JavaScript
- React uses the **declarative approach** where we define the desired target state(s) and let React figure
  out the actual JavaScript DOM instructions

### Creating a new React Project

### The Starting Project

[The Starting Project](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/01-starting-setup>)

[CodeSandbox](https://codesandbox.io/s/cmp-basics-start-4959mq)

### Analyzing a Standard React Project

### Introducing JSX

JSX = "HTML in JavaScript"

#### Understanding JSX

![JSX](<https://github.com/lcycstudio/javascript/blob/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/jsx.png>)

### How React Works

#### Imperative Approach (Not React)

```js
const paragraph = document.createElement("p");
paragraph.textContent = "This is also visible";
document.getElementById("root").append(paragraph);
```

### Coding Exercise 3: Exercise: Working with JSX Code

#### Exercise: Working with JSX Code

This is a quick exercise to get started with React and JSX code: Your task is to edit the JSX code of a
provided React component such that it displays a `h1` element with the text "Exercise done!" on the page.

Important: The custom JSX code must be added inside the existing `<div>` element.

```js
import React from "react";

export default function App() {
  return (
    <div>
      <p>Practicing React...</p>
      <h1>Exercise done!</h1>
    </div>
  );
}
```

### Building a First Custom Component

[Building a First Custom Component](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/02-building-a-first-custom-component>)

### Coding Exercise 4: Exercise: Building a First Component

#### Exercise: Building a First Component

Practice what you learned about components and **build a new React component on your own!**

Your task is to build a custom `<ExerciseComponent />` that outputs the text "First exercise - done!"
on the screen.

Use the empty `ExerciseComponent.js` file for your new component code and output this component inside
the already existing App component thereafter (replace the existing JSX code in App with your own component).

The final app should display this basic output:

```html
First exercise - done!
```

`App.js`

```js
import React from "react";
import ExerciseComponent from "./ExerciseComponent'";

export default function App() {
  return <ExerciseComponent></ExerciseComponent>;
}
```

`ExerciseComponent.js`

```js
import React from "react";

export default function ExerciseComponent() {
  return <p>First exercise - done!</p>;
}
```

### Writing More Complex JSX Code

[Writing More Complex JSX Code](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/03-writing-more-complex-jsx-code>)

### Adding Basic CSS Styling

[Adding Basic CSS Styling](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/04-adding-basic-css-styling>)

### Outputting Dynamic Data & Working with Expressions in JSX

[Outputting Dynamic Data & Working with Expressions in JSX](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/05-outputting-dynamic-data>)

### Passing Data via "props"

Props are the "attributes" of your "custom HTML elements" (Components)

[Passing Data via "props"](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/06-passing-data-via-props>)

### Coding Exercise 5: Exercise: Passing Data via "props"

#### Exercise: Passing Data via "props"

You're working on the UI prototype for an online shop and your task is to output **two product items**
(via the `<Product />` component you find in the `Product.js` file) below the main page title
(`"My Demo Shop"`) in the App component.

The final UI should look like this:

```html
My Demo Shop Product 1
```

The **two product items** should use the **same component** (`<Product />`) but output **different data**
(`title`, `price` & `description`). Data should be passed to the components (and output there) via `props`.

The **first product item** is expected to display the following information:

- Title: `Product 1`
- Price: `10`
- Description: `First product`

The **second product item** is expected to display the following information:

- Title: `Product 2`
- Price: `20`
- Description: `Second product`

`App.js`

```js
import React from "react";

import Product from "./Product";
import "./styles.css";

// don't change the Component name "App"
export default function App() {
  const products = [
    {
      title: "Product 1",
      price: 10,
      description: "First product",
    },
    {
      title: "Product 2",
      price: 20,
      description: "Second product",
    },
  ];
  return (
    <div>
      <h1>My Demo Shop</h1>
      <Product
        title={products[0].title}
        price={products[0].price}
        description={products[0].description}
      ></Product>
      <Product
        title={products[1].title}
        price={products[1].price}
        description={products[1].description}
      ></Product>
    </div>
  );
}
```

`Product.js`

```js
import React from "react";

export default function Product(props) {
  return (
    <article className="product">
      <h2>{props.title}</h2>
      <p className="price">${props.price}</p>
      <p>{props.description}</p>
    </article>
  );
}
```

`styles.css`

```css
body {
  font-family: sans-serif;
  margin: 0;
  padding: 3rem;
  background-color: #2d2c2c;
  color: #959090;
}

.product {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #373535;
  color: #e7e4e4;
  border-radius: 8px;
}

.product h2,
.product p {
  margin: 0.5rem 0;
}

.price {
  font-size: 0.75rem;
  color: #bab6b6;
}
```

### Alternative Ways of Passing & Receiving / Handling "props"

### Adding "normal" JavaScript Logic to Components

[Adding "normal" JavaScript Logic to Components](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/07-adding-normal-javascript-logic>)

`07-adding-normal-javascript-logic/src/components/ExpenseItem.js`

### Splitting Components Into Multiple Components

[Splitting Components Into Multiple Components](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/08-splitting-components-into-multiple-components>)

`08-splitting-components-into-multiple-components/components/ExpenseDate.js`

### Assignment 1: Time to Practice: React & Component Basics

[Assignment 1: Time to Practice: React & Component Basics](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/09-assignment-1-solution>)

### The Concept of "Composition" ("children props")

[The Concept of "Composition" ("children props")](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/10-the-concept-of-composition>)

```js
import "./Card.css";

function Card(props) {
  // Add "card" to whatever classes are passed from the parent component
  // Notice the whitespace " " after card. This is to ensure that the children css
  // is on the same level as the parent css, e.g., class="card expense-item" is the
  // combination of two classes ".card" and ".expense-item". ".card" reads the css
  // file "./Card.css" whereas ".expense-item" reads the css file "./ExpenseItem.css"
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
}

export default Card;
```

`Card.css`

```css
.card {
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}
```

`ExpenseItem.css`

```css
.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: #4b4b4b;
}
...
```

### Coding Exercise 6: Exercise: Component Composition

#### Exercise: Component Composition

You are working on a UI prototype for a "Todos" application. At the moment, the prototype displays some
basic todos for learning React and a short info message.

Your task is to **optimize the code** and use React **component composition** to create a re-usable
`<Card />` component that can be wrapped around different content (e.g., todo markup, info message markup).

The final UI should look like the initial UI - i.e., no styling changes are required. But the code should
change and **embraces React's composability**.

Create the `<Card />` component in the already existing `Card.js` file and use a `<div>` as a main element
in that component.

`App.js`

```js
import React from "react";
import Card from "./Card";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Todos</h1>

      <Card>
        <p>
          Please note: Below are just the most important todos - feel free to
          add more.
        </p>
      </Card>

      <ul>
        <li className="todo">
          <Card>
            <h2>Learn React</h2>
            <p>Learn React fundamentals & explore core concepts</p>
          </Card>
        </li>
        <li className="todo">
          <Card>
            <h2>Practice React</h2>
            <p>Apply your knowledge & build demo projects</p>
          </Card>
        </li>
      </ul>
    </div>
  );
}
```

`Card.js`

```js
import React from "react";

export default function Card(props) {
  return <div className="card">{props.children}</div>;
}
```

`styles.css`

```css
body {
  font-family: sans-serif;
  margin: 0;
  padding: 3rem;
  background-color: #2d2c2c;
  color: #959090;
}

ul {
  list-style: none;
  margin: 2rem 0;
  padding: 0;
}

li {
  margin: 1rem 0;
}

.card {
  padding: 1rem;
  background-color: #1d1c2c;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.todo h2 {
  margin: 0;
  text-transform: uppercase;
  font-size: 1.25rem;
  color: #eee;
}

.todo p {
  margin: 0.5rem 0 0 0;
  color: #999;
}
```

### A First Summary

[A First Summary](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/11-finished>)

![Finished Project](<https://github.com/lcycstudio/javascript/blob/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/done.png>)

### A Closer Look At JSX

- Open the browser and go to Developer Tool (Ctrl + Shift + I)
- Click "Sources" tab
- Top -> localhost:3000 -> `static/js` -> `main.chunk.js`

#### Alternative React Coding

```js
React.createElement(
  "div",
  {},
  React.createElement("h2", {}, "Let's get started!"),
  React.createElement(Expenses, { items: expenses })
);
```

The above is equivalent to the following

```js
<div>
  <h2>Let's get started!</h2>
  <Expenses items={expenses} />
</div>
```

### Organizing Component Files

```
|-- public
|-- src
    |-- components
        |-- Expenses
            |-- ...
        |-- UI
            |-- ...
    |-- App.js
    |-- index.css
    |-- index.js
|-- package-lock.json
|-- package.json
```

### An Alternative Function Syntax

```js
const ExpenseDate = (props) => {
  ....
  return <div></div>
}
```

### Quiz 1: Learning Check: React Basics, Components, Props & JSX

#### Question 1: Which kind of code do you write when using React.js?

Declarative JavaScript Code. With React.js, you define the "goal" (i.e. what should be shown on the
screen) and let React figure out how to get there.

#### Question 2: What is "JSX"?

It's a special, non-standard syntax which is enabled in React projects. React projects like the ones
we create via "create-react-app" support JSX syntax. It gets compiled to standard JS code behind the
scenes.

#### Question 3: Why is React all about "Components"?

Every UI in the end is made up of multiple building blocks, called components, hence it makes sense
to think about their user interfaces as "combinations of components". "Components" are really just a
way of thinking about user interfaces. React embraces that concept and gives you tools to build
components that you can then combine.

#### Question 4: What does "declarative" mean?

You define the desired outcome (e.g., a target state or UI) and React figures out which JS commands
need to be executed to bring that result to life.

#### Question 5: What is a "React Component"?

It's a JavaScript function which typically returns HTML (JSX) code that should be displayed.
It is a JS function that typically returns some HTML (or, to be precise: JSX) code which will be
shown on the screen when that component is used.

#### Question 6: How many custom React components must a React app have?

That's totally up to you. You can have as many React components as you want / need.

#### Question 7: Which statement is correct?

With React, you build a component tree with one root component that's mounted into a DOM node.

#### Question 8: What does "component tree" mean?

It means that you have a root node which then has more components nested beneath it. You build a
tree by nesting components into each other - just as you build a HTML tree when building a standard
HTML document.

#### Question 9: How do you pass data between components?

Via "custom HTML attributes" (known as "props"). You build your own "HTML elements" in the end,
hence you can also define your own attributes (called "props" in React's world)

#### Question 10: How can you output dynamic data in React components (i.e. in the returned JSX code)?

You can use single curly braces (opeing & closing) with any JS expression between them. You can't
put block statements (e.g. if statements) between those curly braces but you can output any result
of any JS expression by using this special feature.

### Module Resources
