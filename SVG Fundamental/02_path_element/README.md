## Section 02: Path Element

#### Table of Contents

- [Path data](#path-data)
- [The cubic Bezier curve](#the-cubic-bezier-curve)
- [Quadratic Bezier curve](#quadratic-bezier-curve)
- [Elliptical arc curve](#elliptical-arc-curve)

### Path data

#### Use of the path

- shape creation
- clipping path
- cerating an animation
- create text on a graph

**Current point:**

- cpx (current point x)
- cpy (current point y)

**M, L, C, Q, Z**

- moveTo(M, m)
- lineTo(L, l)
- curveTo(C,c,S,s)
- curveTo(Q,q,T,t)
- closePath(Z,z)

#### "d" property

- specifies the path data, contains: `d = 'M..L..C..Q..Z'`
- moveTo
- lineTo
- curveTo
- curveTo
- closePath

#### The syntax of path data

- M moveTo
- L lineTo
- C curveTo
- A arc
- Z closePath

#### moveTo

`d="M x y x1 y1 x2 y1 x2 y m x3 y3 x4 y4"`

#### lineTo

`d = "M x y L x1 y1 H x2 V y2"`

- L, l - lineTo (x,y)
- H, h - horizontal lineTo (x)
- V, v - vertical lineTo (y)

#### closePath

d = "M x y L x1 y1 x2 y2 Z"

- Z, z - close path

open path: stroke-linecap

closed path: stroke-linejoin

#### sub-path

`d = "M x y L x1 y1 x2 y2 x3 y3 Z L x5 y5"`

Use `L` after closing the path with `Z` will create a sub-path

### The cubic Bezier curve

#### The cubic bezier commands

`d = "M x0 y0 C x1 y1 x2 y2 x y"`

`d = "M x0 y0 C x1 y1 x2 y2 x y S x4 y4 x3 y3"`

- C, c - curveTo
- S, s - smooth curveTo (x4 y4 x3 y3)

### Quadratic Bezier curve

#### The quadratic bezier curve commands

`d = "M x0 y0 Q x1 y1 x y"`

`d = "M x0 y0 Q x1 y1 x y T x2 y2"`

- Q, q - quadratic bezier curveTo (x1 y1 x y)
- T, t - smooth quadratic bezier curveTo(x y)

### Elliptical arc curve

#### The elliptical bezier curve commands

`d = "M x0 y0 A Rx Ry x-axis-rotation large-arc-flag sweep-flag x y"`

- A, a - elliptical arc
- Rx - x radius of the ellipse
- Ry - y radius of the ellipse
- x-axis-rotation - the angle from the x-axis
- large-arc-flag - 0 small arc selected, 1 large arc selected
- sweep-flag - 0 clockwise, 1 counter-clockwise
