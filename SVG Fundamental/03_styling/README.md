## Section 03: Styling

#### Table of Contents

- [Options for changing styles](#options-for-changing-styles)
- [The CSS rules](#the-css-rules)
- [Geometry properties](#geometry-properties)
- [G.P in-depth 1](#gp-in-depth-1)
- [G.P in-depth 2](#gp-in-depth-2)
- [G.P in-depth 3](#gp-in-depth-3)

### Options for changing styles

#### Stylization of SVG Elements

- inline style sheets: the `<style>` element
- external stylesheet: `<link>` element
- style attribute: CSS rule
- presentation attributes

### The CSS rules

```css
.main {
  color: black;
}

header {
  background: green;
}

path {
  stroke: red;
  stroke-width: 10;
}
p {
  font-weight: bolder;
}
div {
  background: blue;
  color: red;
}
```

```html
<html>
    <head>
        <title>The CSS rules specificity<title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <div class="main">
                <p>content</p>
            </div>
            <svg width="200" height="200">
                <path d="M 10 10 100 10"/>
            </svg>
        </header>
    </body>
</html>
```

#### Specificity calculation

1 - Inline styles
2 - IDs (unique identifier for the page elements)
3 - Classes, attributes and pseudo-classes
4 - Elements and pseudo-elements

### Geometry properties

#### Presentation attributes

code SVG

```html
<rect x="20" y="20" width="100" height="50" fill="green" stroke="blue" />
```

code CSS

```css
rect {
  fill: green;
  stroke: blue;
}
```

#### Presentation attributes limitations

- the use of `!important`
- supported only by the svg namespace
- some properties that affect the rendering of elements are not available as presentation attributes

### G.P in-depth 1

#### rx, ry calculation algorithms

1. `rx=<auto>` and `ry=<auto>`
   - `rx=<default value>` and `ry=<default value>`
   - `rx=0` and `ry=0`
2. Convert rx, ry to absolute values
   - if `rx=<length value>` or a `<percentage>` and `ry=<auto>`
     then absolute value `rx=<length>` or `<percentage>\*<width>` and `ry=rx`
   - if `ry=<length value>` or a `<percentage>` and `rx=<auto>`
     then absolute value `ry=<length>` or `<percentage>\*<height>` and `rx=ry`
   - else: `rx=<length value>` or a `<percentage>` and `ry=<length value>`
     or a `<percentage>`, absolute values are generated individually
3. Convert rx, ry to absolute values
   - if the absolute `rx > <width>`, then used value of `rx=<width>/2`.
   - if the absolute `ry > <height>`, then used value of `ry=<height>/2`.

### G.P in-depth 2

"rect" element is mapped to an equivalent "path" element generating absolute used values: x, y, width, height, rx, ry

#### Construct a rectangle with rounded corners algorithm

- M(x+rx, y)
- H(x + width - rx)
- if (rx>0 and ry>0): A(rx,ry,0,0,1,x + width,y + ry)
- V(y + height - ry)
- if (rx>0 and ry>0): A(rx,ry,0,0,1,x + width - rx,y + height)
- H(x + rx)
- if (rx>0 and ry>0): A(rx,ry,0,0,1,x+width-rx,y+height)
- V(y+ry)
- if (rx>0 and ry>0): A(rx,ry,0,0,0,1,x,y+height-ry)

### G.P in-depth 3

#### Ellipse drawing algorithm

limitations:

- (rx<0 or ry<0): parsing errors
- (rx=0 or ry=0): cancel rendering
- (rx=auto value) and (ry=auto value): cancel rendering
- (rx=auto value): circle with radius ry
- (ry=auto value): circle with radius rx

rx and ry:

- length value
- percentage value:
  - absolute calculated value rx = % value \* width of the viewport absolute
  - absolute calculated value ry = % value \* height of the viewport absolute

Mathematically, an "ellipse" element is mappted to an equivalent "path" element that consists of four elliptical arc segments, each covering a quater of the ellipse

#### Construct a ellipse with rounded corners algorithm

- move-to(cx+rx, cy)
- arc (cx, cy + ry)
- arc (cx - rx, cy)
- arc (cx, cy - cy)
- arc (cx + rx, cy)
