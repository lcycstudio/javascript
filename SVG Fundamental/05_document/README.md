## Section 05: Document

#### Table of Contents

- SVG fragment, types of elements
- Grouping. Element `<g>`. Properties of `<g>` element as a container element
- Reusable content [`<defs>` `<use>` `<symbol>` elements]
- Application features of the `<use>` element

### SVG fragment, types of elements

#### Structural Element

They define the structure of the element.

- defs
- g
- svg
- symbol
- use

#### Structurally External Element

Elements whose structure is defined by reference to external resources.

- foreignObject
- iframe
- image
- script
- use
- video

#### Graphics Elements

They define the graphics itself.

- audio canvas
- circle ellipse
- foreignObject
- iframe image
- line path
- polygon
- polyline rect
- text textPath
- tspan video

### Grouping. Element `<g>`. Properties of `<g>` element as a container element

#### Grouping: the "g" element

The benefits of using "g":

- easy to add styles
- easy to edit styles
- ability to apply styles to child elements using inheritance

#### Example

```html
<svg>
  <g transform="translate(500 0)" opacity="0.4">
    <>...</>
  </g>
</svg>
```

### Reusable content [`<defs>` `<use>` `<symbol>` elements]

#### defs

- The "defs" element is used for reusable content.
- The element inside "defs" is not being displayed without reference.

#### use

The "use" element with "href" to refer to the element inside "defs".

#### symbol

The "symbol" element is used to define graphical templates that can be created
using the "use" element.

#### Attributes & Properties

| Attributes & Properties |        svg         |       symbol       | defs |
| ----------------------- | :----------------: | :----------------: | :--: |
| display                 |      incline       |        none        | none |
| x & y                   | :white_check_mark: | :white_check_mark: | :x:  |
| width                   | :white_check_mark: | :white_check_mark: | :x:  |
| height                  | :white_check_mark: | :white_check_mark: | :x:  |
| viewBox                 | :white_check_mark: | :white_check_mark: | :x:  |
| preserveAspectRatio     | :white_check_mark: | :white_check_mark: | :x:  |

```html
<svg width="800" height="600">
  <rect x="20" width="712" height="500" fill="#od0042" />
  <defs>
    <symbol id="bigDipper">
      <polygon
        id="star_small"
        points="295.5,147.22 295.5,147.22 295.5,147.21"
        fill="yellow"
      />
      <use href="#star_small" x="0" y="90" />
      <use href="#star_small" x="25" y="80" />
      <use href="#star_small" x="50" y="100" />
      <use href="#star_small" x="75" y="80" />
      <use href="#star_small" x="100" y="100" />
    </symbol>
  </defs>
  <use href="#bigDipper" x="0" y="0" />
  <use
    href="#bigDipper"
    x="-555"
    y="450"
    transform="translate(255 -20) scale(-0.5,0.5)"
  />
</svg>
```

### Application features of the `<use>` element

#### The "use" element

- `use href="#URL" x="value" y="value" width="value" height="value"`
- The defs element is often used as a container for the element for the reusable
  content.
- The elements inside the defs do not display
