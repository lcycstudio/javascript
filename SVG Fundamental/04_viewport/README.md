## Section 04: Viewport

#### Table of Contents

- [The concept of viewport & viewBox in SVG](#the-concept-of-viewport--viewbox-in-svg)
- [The relationship of viewport and viewBox in SVG](#the-relationship-of-viewport-and-viewbox-in-svg)
- [The viewBox and transformations](#the-viewbox-and-transformations)
- [The preserveAspectRatio attribute](#the-preserveaspectratio-attribute)
- [Establishing a new SVG viewport](#establishing-a-new-svg-viewport)

### The concept of viewport & viewBox in SVG

```html
<svg width="300" height="150" viewBox="x y width height">
    <rect x="0" y="0" width="150" height="350" fill="green">
</svg>
```

#### viewBox

A viewBox is an SVG attribute with image settings for the image.

The SVG element creates two coordinate systems

- viewport coordinate system
- local coordinate system

The local coordinate system starts at the same point as the viewport coordinate system. However, it is inifinite and serves the place where graphics lives. It

### The relationship of viewport and viewBox in SVG

```html
<svg
  x="x"
  y="y"
  width="width"
  height="height"
  viewBox="min_x min_y viewBox_width viewBox_height"
></svg>
```

| Viewport Coordinate System | Local Coordinate System |
| :------------------------: | :---------------------: |
|             x              |          min_x          |
|             y              |          min_y          |
|           width            |      viewBox_width      |
|           height           |     viewBox_height      |

|                       |     viewport     |             viewBox              |
| --------------------- | :--------------: | :------------------------------: |
| Coordinate<br/>System |     viewport     |              local               |
| Position              |     x<br/>y      |         min_x<br/>min_y          |
| Size                  | width<br/>height | viewBox_width<br/>viewBox_height |

### The viewBox and transformations

```html
<svg width="800" height="600" viewBox="0 0 800 600"></svg>
```

- viweBox = viewport: viewBox="0 0 800 600"
- viewBox > viewport: viewBox="0 0 1600 1200"
- viewBox < viewport: viewBox="0 0 400 300"

$$transform = translate(\text{min-x} \cdot \text{min-y})$$
$$transform=scale(x\_scaling\_ratio\cdot y\_scaling\_ratio),$$
where
$$x\_scaling\_ratio=\frac{\text{viewBox\_width}}{\text{viewport\_width}}$$
$$y\_scaling\_ratio=\frac{\text{viewBox\_height}}{\text{viewport\_height}}$$

### The preserveAspectRatio attribute

<svg preserveAspectRatio="<align><meetOrSlice>".../>

parameters:

- align
- meetOrSlice

Initial values:

- xMidYMid
- meet

| parameters  | values                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align       | - none<br/>- xMinYMin <br/>- xMidYMin <br/> - xMaxYmin <br/> - xMinYMid <br/> - xMidYMid <br/> - xMaxYMid <br/> - xMinYMax <br/> - xMidYMax <br/>- xMaxYMax |
| meetOrSlice | - meet <br/> - slice <br/> - initial value                                                                                                                  |

### Establishing a new SVG viewport

```html
<svg width="..." height="...">
  <svg x="..." y="..." width="..." height="...">
    <svg x="..." y="..." width="..." height="...">
        <>...</>
    </svg>
  </svg>
</svg>
```

Only 2 elements:

- The "svg" element
- A "symbol" element that is instanced by a "use" element

Units: depend on parent element units

- pixels
- points
- picas
- percentages
- etcetera...

x or width (y or height )attribute value percentages calculation algorithm

1. viewBox attribute not set:
   - with and x calculates using the width of the viewport
2. viewBox set and viewBox size $\neq$ viewport size:
   - width and x is calculated as follows:
     - x and width % values $\times$ scale coefficients $\times$ viewport width

calculation of absolute values of geometric properties:

$$\text{aligned horizontally} = \% \text{value} \times \text{viewport width} \times \text{scale coefficient}$$

$$\text{aligned vertically} = \% \text{value} \times \text{viewport height} \times \text{scale coefficient}$$

$$\text{non-vertical non-horizontal} = \% \text{value} \times \text{normalized diagonal} \times \text{scale coefficient}$$
