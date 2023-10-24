## Section 07: Paint Servers

#### Table of Contents

- Paint Servers
- Gradients [types, vector, normal, color stops, color transitions]
- linear Gradient: the vector attributes [x1,x2,x3,x4]
- linear Gradient other Attributes[gradientUnits, gradientTransform,
  spreadMethod]
- Radial gradient [vector, inner & outer circumference,- stop color]
- patterns [tile concept, types, attributes]

### Paint Servers

#### Paint-server elements

- inherits properties from ancestors
- never rendered directly
- used by including a URL reference in a fill or stroke property
- user-agent algorithm: prototype inheritance in JavaScript

### Gradients [types, vector, normal, color stops, color transitions]

#### Types of Gradients

- linear gradients
- radial gradients

#### Vector & Normal

**gradient:**

- color stops: 1, 2, 3
- color transition: 1-2, 2-3

### linear Gradient: the vector attributes [x1,x2,x3,x4]

#### Gradient Stops

| attribute                          | properties                             |
| ---------------------------------- | -------------------------------------- |
| 'offset': <number> or <percentage> | stop-color: hex, rgb, rgbA, hsl, etc   |
|                                    | stop-opacity: <number> or <percentage> |

#### Example

- offset: 0%
- offset: 50%
- offset: 100%
- stop-color: #669999
- stop-color: #ffffff
- stop-color: #3366CC
- stop-opacity: 100%
- stop-opacity: 100%
- stop-opacity: 100%

#### linearGradient Example

```html
<svg>
  <defs>
    <linearGradient id="linearGradient_1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="20%" stop-color="green" />
      <stop offset="50%" stop-color="gold" />
      <stop offset="70%" stop-color="red" />
    </linearGradient>
  </defs>

  <rect fill="url(#linearGradient_1)" x="10" y="10" width="150" height="150" />
  <circle
    cx="230"
    cy="80"
    r="55"
    fill="none"
    stroke="url(#linearGradient_1)"
    stroke-width="30"
  />
</svg>
```

#### User agent algorithm

- vector inside the bounding box's coordinate system
- creates a gradient inside the stroke (fill) bounding box
- fill it by gradient
- clip-path

### linear Gradient other Attributes[gradientUnits, gradientTransform, spreadMethod]

#### gradientUnits

- objectBoundingBox -> boundingBox
- userSpaceOnUse -> viewport

#### gradientTransform

- translate
- skew
- roate
- scale

#### spreadMethod

- pad
- reflect
- repeat

### Radial gradient [vector, inner & outer circumference,- stop color]

- outer circumference
  - cx, cy, r
- inner circumference
  - fx, fy, fr
- vector
- radial gradient

### Patterns [tile concept, types, attributes]

#### Pattern Attributes

- x
- y
- widht
- height
- patternUnits
- viewBox
- preserveAspectRatio
- patternTransform
- href
- patternContentUnits
