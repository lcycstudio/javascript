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

![The Starting Project](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/01-starting-setup>)

![CodeSandbox](https://codesandbox.io/s/cmp-basics-start-4959mq)

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

![Building a First Custom Component](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/02-building-a-first-custom-component>)

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

![Writing More Complex JSX Code](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/03-writing-more-complex-jsx-code>)

### Adding Basic CSS Styling

![Adding Basic CSS Styling](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/04-adding-basic-css-styling>)

### Outputting Dynamic Data & Working with Expressions in JSX

![Outputting Dynamic Data & Working with Expressions in JSX](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/05-outputting-dynamic-data>)

### Passing Data via "props"

Props are the "attributes" of your "custom HTML elements" (Components)

![Passing Data via "props"](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/06-passing-data-via-props>)

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

![Adding "normal" JavaScript Logic to Components](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/07-adding-normal-javascript-logic>)

### Splitting Components Into Multiple Components

![Splitting Components Into Multiple Components](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/08-splitting-components-into-multiple-components>)

### Assignment 1: Time to Practice: React & Component Basics

![Assignment 1: Time to Practice: React & Component Basics](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/09-assignment-1-solution>)

### The Concept of "Composition" ("children props")

![The Concept of "Composition" ("children props")](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/10-the-concept-of-composition>)

### Coding Exercise 6: Exercise: Component Composition

### A First Summary

![A First Summary](<https://github.com/lcycstudio/javascript/tree/master/React%20-%20The%20Complete%20Guide%202023%20(incl.%20React%20Router%20%26%20Redux)/03_react_basics_%26_working_with_components/code/11-finished>)

### A Closer Look At JSX

### Organizing Component Files

### An Alternative Function Syntax

### Quiz 1: Learning Check: React Basics, Components, Props & JSX

### Module Resources
