## Section 08: Animations

#### Table of Contents

- SVG's animation elements
- SVG's animation elements
- Attributes to identify the target element for an animation & control the
  timing
- Attributes to control animation over time
- Attributes to control additivity, Morphing example & Clock values
- SVG elements, attributes, properties and data types that can be animated
- Interactivity features in SVG

### SVG's animation elements

#### Ways to Animate SVG Content

- SVG's animation elements
- CSS Animations
- CSS Transitions
- SVG Document Object Model

#### SVG's Animation Elements

| Attribute          | Behavior                                                                                                                                                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 'animate'          |                                                                                                                                                                                                                                                                                                          |
| 'animateMotion'    |                                                                                                                                                                                                                                                                                                          |
| 'animateTransform' | type="scale" from="sx1[sy1]" to="sx2 [sy2]" <br/>type="translate" from="tx1 [ty1]" to="tx2 [ty2]" <br/>type="rotate" from="start-angle cx cy" to="end-angle cx cy" <br/>type="skewx" from="start-skewX-angle" to="end-skewX-angle" <br/>type="skewY" from="start-skewY-angle" to="end-skewY-angle" <br/> |
| 'discard'          |                                                                                                                                                                                                                                                                                                          |
| 'set'              |                                                                                                                                                                                                                                                                                                          |

#### Examples

- [animate example](/SVG%20Fundamental/08_animations/code/AnimateExample.html)
- [animateMotion example](/SVG%20Fundamental/08_animations/code/AnimateMotionExample.html)
- [animateTransform](/SVG%20Fundamental/08_animations/code/animateTransformExample.html)
- [discardExample](/SVG%20Fundamental/08_animations/code/discardExample.html)
- [setExample](/SVG%20Fundamental/08_animations/code/setExample.html)

### Attributes to identify the target element for an animation & control the timing

#### Attributes to control the timing of the animation

|  Attribute  |              Behavior              |
| :---------: | :--------------------------------: |
|     end     |            endValueList            |
|     dur     | clock-value \| media \| indefinite |
|    fill     |          freeze \| remove          |
|  repeatDur  |     clock-value \| indefinite      |
| repeatCount |       <number> \| indefinite       |
|   restart   |  always \| whenNotActive \| never  |
|     max     |        clock-value \| media        |
|     min     |        clock-value \| media        |

[hrefExampe](/SVG%20Fundamental/08_animations/code/hrefExample.html)

### Attributes to control animation over time

#### Animation values over time

| Attribute  |               Behavior                |
| :--------: | :-----------------------------------: |
|  calcMode  | discrete \| linear \| paced \| spline |
|   values   |            list of strings            |
|  keyTimes  |         values from [0 ... 1]         |
| keySplines |    set of Bezier CP from [0 ... 1]    |
|  from to   |       starting and ending value       |
|     by     |         relative offset value         |

[attributesAnimationValuesOverTimeLenear](/SVG%20Fundamental/08_animations/code/attributesAnimationValuesOverTimeLenear.html)

[attributesAnimationValuesOverTimeLinearDiscrete](/SVG%20Fundamental/08_animations/code/attributesAnimationValuesOverTimeLinearDiscrete.html)

[attributesAnimationValuesOverTimePaced](/SVG%20Fundamental/08_animations/code/attributesAnimationValuesOverTimePaced.html)

[attributesAnimationValuesOverTimeSpline](/SVG%20Fundamental/08_animations/code/attributesAnimationValuesOverTimeSpline.html)

#### keySplines Examples

- keySplines="0 0 1 1"
- keySplines="0 0.75 0.25 1"
- keySplines="0.5 0 0.5 1"
- keySplines="1 0 0.25 0.25"

### Attributes to control additivity, Morphing example & Clock values

#### Attributes of Additive Animation

| Attribute  |    Behavior    |
| :--------: | :------------: |
|  additive  | replace \| sum |
| accumulate |  none \| sum   |

[attributesOfAdditiveAnimation](/SVG%20Fundamental/08_animations/code/attributesOfAdditiveAnimation.html)

[morphingExample](/SVG%20Fundamental/08_animations/code/morphingExample.html)

#### Clock values

00:00:00.000

hours:minutes:seconds:milliseconds

#### Timecount values

- 2.4h = 2 hours % 24 minutes
- 12min = 12 minutes
- 10s = 10 seconds
- 9ms = 9 milliseconds
- 7.242 = 7 milliseconds & 242 milliseconds

### SVG elements, attributes, properties and data types that can be animated

#### 4 Groups of Elements

|                                                    Graphic Elements                                                    |                                       Containers                                       | Graphics Link Elements |             Other Elements              |
| :--------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :--------------------: | :-------------------------------------: |
| `<image>`<br/>`<path>`<br/>`<rect>`<br/>`<circle>`<br/>`<ellipse>`<br/>`<line>`<br/>`<polyline>`<br/>`<polygone>`<br/> | `<svg>`<br/>`<g>`<br/>`<defs>`<br/>`<switch>`<br/>`<text>`<br/>`<mask>`<br/>`<a>`<br/> |      `<use>`<br/>      | `<foreignObject>`<br/>`<clipPath>`<br/> |

#### Data Types Used in Animatable Attributes and Properties

| data types \ attr. & prop. |    \<animate\>     | \<animateTransform\> |      \<set\>       |    'Addictive'     |
| :------------------------: | :----------------: | :------------------: | :----------------: | :----------------: |
|          'angle'           | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|          'color'           | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|        'frequency'         |        :x:         |         :x:          |        :x:         |        :x:         |
|         'integer'          | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|          'length'          | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|          'number'          | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|          'paint'           | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|        'percentage'        | :white_check_mark: |         :x:          | :white_check_mark: | :white_check_mark: |
|           'time'           |        :x:         |         :x:          |        :x:         |        :x:         |
|           'URL'            | :white_check_mark: |         :x:          | :white_check_mark: |        :x:         |
|          'other'           | :white_check_mark: |         :x:          | :white_check_mark: |        :x:         |

[colorAnimate](/SVG%20Fundamental/08_animations/code/colorAnimate.html)

### Interactivity features in SVG

#### Mouse Event

|         Event Type          |    Occurs when the pointing device    |
| :-------------------------: | :-----------------------------------: |
| mouseDown / mouseUp / click |   button is clicked over an element   |
|   mouseOver / mouseEnter    |       is moved onto an element        |
|    mouseOut / mouseLeave    |     is moved away from an element     |
|          mouseMove          | is moved whilte it is over an element |

[PointingDeviceEvents](/SVG%20Fundamental/08_animations/code/PointingDeviceEvents.html)
