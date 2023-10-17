## Section 01: The Simple Concepts

#### Table of Contents

- [`<svg>` element](#svg-element)
- [`<rect>` geometry](#rect-geometry)
- [`<circle>`, `<ellipse>`, `<line>` elements](#circle-ellipse-line-elements)
- [`<polyline>` and `<polygon>` element](#polyline-and-polygon-element)

### `<svg>` element

#### Example

```html
<svg width="800" height="600">
  <!-- Graphic code here -->
</svg>
```

### `<rect>` geometry

#### Types of basic shapes

- rectangle
- circle
- ellipse
- line
- polyline
- polygon

They are elements of the **PATH** tag.

#### Application of basic shapes

- painting
  - fill
  - stroke
  - markers
- Clipping mas

#### Example

```html
<rect x="5" y="2" width="150" height="100" />
```

#### Geometric properties

- x
- y
- width
- height
- rx: radius of the corner on the x axis
- ry: radius of the corner on the y axis

### `<circle>`, `<ellipse>`, `<line>` elements

#### Circle

```html
<circle cx="100" cy="80" r="40" />
```

#### Geometric properties

- cx: x value for the center
- cy: y value for the center
- r: radius

#### Ellipse

```html
<ellipse cx="100" cy="50" rx="70" ry="40" />
```

#### Geometric properties

- cx
- cy
- rx: radius on the x axis
- ry: radius on the y axis

#### Line

```html
<line x1="50" y1="70" x2="150" y2="20" stroke="red" />
```

#### Geometric properties

- x1: initial x point
- y1: initial y point
- x2: final x point
- y2: final y point
- stroke

### `<polyline>` and `<polygon>` element

#### Polyline

<polyline points="50,80,140,80,80,100,180,100" stroke="red" stroke-width="5"/>

#### Geometric properties

- points: x1, y1, x2, y2, x3, y3, ...

#### Polygon

<polygon points="50,80,140,80,80,100,180,100" stroke="red" stroke-width="5"/>

#### Geometric properties

- points: x1, y1, x2, y2, x3, y3, ...
