## Section 06: Working with Dynamic Content & Adding Templating Engines

#### Table of Contents

- Module Introduction
- Sharing Data Across Requests & Users
- Templating Engines - An Overview
- Installing & Implementing Pug
- Outputting Dynamic Content
- Official Pug Docs
- Converting HTML Files to Pug
- Adding a Layout
- Finishing the Pug Template
- Avoiding an Error
- Working with Handlebars
- Converting our Project to Handlebars
- Adding the Layout to Handlebars
- Working with EJS
- Working on the Layout with Partials
- Wrap Up
- Assignment 1: Time to Practice - Templating Engines
- Useful Resources & Links

### Module Introduction

- Managing Data (without a Database)
- Render Dynamic Content in our Views
- Understanding Templating Engines

### Sharing Data Across Requests & Users

[admin.js](/NodeJS_The_Complete_Guide/06_working_with_dynamic_content_&_adding_templating_engines/code/routes/admin.js)

```js
// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
```

[shop.js](/NodeJS_The_Complete_Guide/06_working_with_dynamic_content_&_adding_templating_engines/code/routes/shop.js)

```js
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('shop.js', adminData.products);
});

module.exports = router;
```

Sharing data across all users and requests is something you don't want to do.

### Templating Engines - An Overview

[Templating Engines](/NodeJS_The_Complete_Guide/06_working_with_dynamic_content_&_adding_templating_engines/images/templating_engines.png)

#### EJS

- `<p><% =name %></p>`
- Use normal HTML and plain JavaScript in your templates

#### Pug (Jade)

- `p #{name}`
- Use minimal HTML and custom template language

#### Handlebars

- `<p>{{ name }}</p>`
- Use normal HTML and custom template language

### Installing & Implementing Pug

```bash
npm install --save ejs pug express-handlebars
```

**app.set(name, value)**

Assigns setting name to value. You may store any value that you want, but
certain names can be used to configure the behavior of the server. These special
names are listed in the app settings table.

- views
- view engine

[app.js](/NodeJS_The_Complete_Guide/06_working_with_dynamic_content_&_adding_templating_engines/code/app.js)

```js
app.set('view engine', 'pug');
app.set('views', 'views');
```

[shop.pug](/NodeJS_The_Complete_Guide/06_working_with_dynamic_content_&_adding_templating_engines/code/views/shop.pug)

```pug
extends layouts/main-layout.pug

block styles
    link(rel="stylesheet", href="/css/product.css")

block content
    main
        if prods.length > 0
            .grid
                each product in prods
                    article.card.product-item
                        header.card__header
                            h1.product__title #{product.title}
                        div.card__image
                            img(src="", alt="A Book")
                        div.card__content
                            h2.product__price $19.99
                            p.product__description A very interesting book about so many even more interesting things!
                        .card__actions
                            button.btn Add to Cart
        else
            h1 No Products
```

### Outputting Dynamic Content

### Official Pug Docs

### Converting HTML Files to Pug

### Adding a Layout

### Finishing the Pug Template

### Avoiding an Error

### Working with Handlebars

### Converting our Project to Handlebars

### Adding the Layout to Handlebars

### Working with EJS

### Working on the Layout with Partials

### Wrap Up

### Assignment 1: Time to Practice - Templating Engines

### Useful Resources & Links
