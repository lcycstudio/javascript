## Section 06: Painting

#### Table of Contents

- The paint operations. `<paint>` values. SVG color units
- Fill properties
- Stroke properties [stroke, stroke-width, stroke-opacity, paint order]
- Stroke properties: stroke-linecup, stroke-linejoin
- Stroke properties [stroke-dasharray & stroke-dashoffset]
- Markers
- Bounding box

### The paint operations. `<paint>` values. SVG color units

- fill: fill the area
- stroke: draw the line
- Supports:
  - 1 colour
  - gradient
  - pattern
  - pattern
  - gradient
  - 1 colour
- `<paint>` value:
  - none
  - `<color>`
  - url()
  - child
  - nth-of-child
  - context-fill
  - context-stroke

#### Color Color Module Level 3

- basic color keywords
- numerical color values
  - RGB color values
  - RGBA color values
  - "transparent" color keyword
  - HSL color values
  - HSLA color values
- extended color keywords
- "currentColor" color keyword
- CSS system colors

### Fill properties

#### fill-rule property

- nonezero rule
- evenodd rule

### Stroke properties [stroke, stroke-width, stroke-opacity, paint order]

#### Controlling

- color
- width
- line-join
- caps of an open shape
- dashing strokes

#### Use case

- path
- rect
- ellipse
- circle
- line
- polyline
- polygon

#### Stroke properties

- color
- gradient
- pattern
- opacity 50%
- stroke opacity 50%
- fill opacity 50%

#### Paint Order

- opacity=50%, fill, stroke
- opacity=50%, stroke, fill
- fill-opacity=50%, fill, stroke, stroke-opacity=50%
- fill-opacity=50%, stroke, fill, stroke-opacity=50%

### Stroke properties: stroke-linecup, stroke-linejoin

#### stroke-linecap

**values**

- butt
- round: (stroke-width / 2 )
- square: (stroke-width / 2 )

#### stroke-linejoin

**values**

- bevel
- round
- miter
- arcs
- miter-clip

#### miter length calculation

$$\text{miter-length}=\frac{\text{stroke-width}}{\sin(\theta/2)}$$

### Stroke properties [stroke-dasharray & stroke-dashoffset]

#### Properties

- none
- `<dasharray>` example:
  - stroke-dasharray: 4 2 2;
  - stroke-dasharray: 4,2,2;
  - stroke-dasharray: 5% 30% 50%;
  - stroke-dasharray: 5%,30%,50%;

circumference = 2 x Pi x circle radius

#### Circle Example:

- circle radius = 150px
- stroke-width = 20px
- amount of dash = 10
- gap = dash
- way 1:
  - dash = 5% x normalized diagonal
- way 2:
  - dash = 5% of circumference
  - dash = 0, 05 x 2 x 3.14 x 150 = 47,12

#### Rectangle Example

rect:

- perimeter = 2 x (height + width)
- example:
  - dash = gap = 2, 5% x perimter

### Markers

| Attributes & Properties | marker             | symbol             |
| ----------------------- | ------------------ | ------------------ |
| viewBox                 | :white_check_mark: | :white_check_mark: |
| preserveAspectRatio     | :white_check_mark: | :white_check_mark: |
| refX                    | :white_check_mark: | :white_check_mark: |
| refY                    | :white_check_mark: | :white_check_mark: |
| markerWidth             | :white_check_mark: | :x:                |
| markerHeight            | :white_check_mark: | :x:                |

#### Marker Attributes

- viewBox
- preserveAspectRatio
- refX
- refY
- orient
- markerUnits
- markerWidth
- markerHeight

##### Marker Creation

```html
<svg>
  <defs>
    <marker
      id="circle-marker"
      viewBox="0 0 10 10"
      markerWidth="4"
      markerHeight="4"
      refX="5"
      refY="5"
    >
      <circle cx="5" cy="5" r="5" />
    </marker>
  </defs>
  <polyline
    points="20 20, 200 20, 20 100, 200 100"
    fill="none"
    stroke="green"
    stroke-width="5"
    marker-start="url(#circle-marker)"
    marker-end="url(#circle-marker)"
    marker-mid="url(#circle-marker)"
  />
</svg>
```

### Bounding box

#### Three kinds of bounding boxes

- the object bounding box
- the stroke bounding box
- the decorated bounding box

Note:

- element ('display:none') within a "defs" element still have a bounding box
- element that is not in the rendering tree does not contribute to the bounding
  box of any ancestor element

#### Bouding Box Example

```html
<svg>
  <defs id="defs-1">
    <rect id="rect-1" x="20" y="20" width="40" height="40" fill="green" />
  </defs>
  <g id="group-1">
    <use id="use-1" href="rect-1" x="10" y="10" />
    <g id="group-2" display="none">
      <rect id="rect-2" x="10" y="10" width="100" height="100" fill="red" />
    </g>
  </g>
</svg>
```

| Element ID | Bounding Box Result |
| ---------- | ------------------- |
| "defs-1"   | {0, 0, 0, 0}        |
| "rect-1"   | {20, 20, 40, 40}    |
| "use-1"    | {30, 30, 40, 40}    |
| "group-1"  | {30, 30, 40, 40}    |
| "rect-2"   | {10, 10, 100, 100}  |
| "group-2"  | {10, 10 , 100, 100} |
