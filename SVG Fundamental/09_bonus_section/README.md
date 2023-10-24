## Section 09: Bonus Section

#### Table of Contents

- Interactive Web Animation. Demo lesson [part 1]
- Interactive Web Animation. Demo lesson [part 2]
- Interactive Web Animation. Demo lesson [part 3]
- Creative Web Animation with GSAP 3. Demo lesson
- Advanced Web Animation with Canvas. Demo lesson [part 1]
- Advanced Web Animation with Canvas. Demo lesson [part 2]
- Advanced Web Animation with Canvas. Demo lesson [part 3]
- Advanced Web Animation with Canvas. Demo lesson [part 4]
- Advanced Web Animation with Canvas. Demo lesson [part 5] 7min Start

### Interactive Web Animation. Demo lesson [part 1]

[XraySeaHorse](/SVG%20Fundamental/09_bonus_section/Example1/XraySeaHorse.html)

### Interactive Web Animation. Demo lesson [part 2]

[mice&Flashlight](/SVG%20Fundamental/09_bonus_section/Example2/mice&Flashlight.html)

### Interactive Web Animation. Demo lesson [part 3]

[portalInTime](/SVG%20Fundamental/09_bonus_section/Example3/portalInTime.html)

### Creative Web Animation with GSAP 3. Demo lesson

[GSAP Eyes](/SVG%20Fundamental/09_bonus_section/GSAP/eyes.html)

![Eyes](/SVG%20Fundamental/09_bonus_section/GSAP/eyes.png)

### Advanced Web Animation with Canvas. Demo lesson [part 1]

[Audio Visualizer JS](/SVG%20Fundamental/09_bonus_section/Audio%20Visualizer/audioVisualizer.js)

### Advanced Web Animation with Canvas. Demo lesson [part 2]

```js
init() {
    this.canvas = document.querySelector("canvas");
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.audio = document.querySelector("audio");
    this.aCtx = new AudioContext();
    this.wm = new WeakMap();
  },

  loadAudio() {
    this.reader = new FileReader();
    this.reader.readAsDataURL(document.getElementById("myinput").files[0]);
    this.reader.addEventListener("load", () => c.main());
  },
```

![Web Audio API](/SVG%20Fundamental/09_bonus_section/Audio%20Visualizer/web_audio_api.png)

### Advanced Web Animation with Canvas. Demo lesson [part 3]

```js
main() {
    if (this.aCtx === null) {
      this.init();
    }
    this.audio.src = this.reader.result;
    if (this.mediaSource) {
      this.mediaSource = this.wm.get(this.audio);
    } else {
      this.mediaSource = this.aCtx.createMediaElementSource(this.audio);
      this.wm.set(this.audio, this.mediaSource);
    }
    this.analyser = this.aCtx.createAnalyser();
    this.analyser.connect(this.aCtx.destination);
    this.mediaSource.connect(this.analyser);

    this.analyser.fftSize = 2 ** this.power;
    this.frAmount = this.analyser.frequencyBinCount;
    this.data = new Uint8Array(this.frAmount);
    this.barWidth = Math.ceil(this.w / this.frAmount / 2);
    this.scale = (this.h + this.w) / 1000;

    this.audio.play();
    this.audio.onplaying = (event) => {
      this.visualizer();
    };
}
```

```js
visualizer() {
    c.ctx.fillStyle = "hsla(0, 0%, 100%, 1)";
    c.ctx.fillRect(0, 0, c.w, c.h);
    c.analyser.getByteFrequencyData(c.data);

    c.angle += 0.2;
    let shift = 0;
    for (let i = 0; i < c.frAmount; i++) {
      shift += c.barWidth;
      c.barHeight = c.data[i] * c.scale;
      c.ctx.fillStyle = "hsla(" + (i * 360) / c.frAmount + ", 100%, 50%, 1)";
      c.ctx.fillRect(shift, c.h / 2, c.barWidth, -c.barHeight);
    }

    if (c.audio.ended === false) {
      requestAnimationFrame(c.visualizer);
    }
}
```

### Advanced Web Animation with Canvas. Demo lesson [part 4]

```js
visualizer() {
    c.ctx.fillStyle = "hsla(0, 0%, 100%, 1)";
    c.ctx.fillRect(0, 0, c.w, c.h);
    c.analyser.getByteFrequencyData(c.data);

    let shift = 0;
    for (let i = 0; i < c.frAmount; i++) {
      shift += c.barWidth;
      c.barHeight = c.data[i] * c.scale;
      c.ctx.fillStyle = "hsla(" + (i * 360) / c.frAmount + ", 100%, 50%, 1)";
      c.ctx.fillRect(shift, c.h / 2, c.barWidth, -c.barHeight);
      c.ctx.strokeStyle = "black";
      c.ctx.strokeRect(shift, c.h / 2, c.barWidth, c.barHeight);
      for (let k = 0; k < c.barHeight; k += 500 / c.power ** 2) {
        c.ctx.fillStyle = "white";
        c.ctx.fillRect(shift, c.h / 2 - k, c.barWidth, -15 / c.power);
        c.ctx.fillStyle = "black";
        c.ctx.fillRect(shift, c.h / 2 + k, c.barWidth, 15 / c.power);
      }
      c.ctx.shadowColor = `hsla(${(i * 360) / c.frAmount}, 100%, 50%, 1)`;
      c.ctx.shadowBlur = 1;
      c.ctx.shadowOffsetX = c.scale * 3;
      c.ctx.shadowOffsetY = -c.scale * 3;
      c.ctx.fill();
    }

    if (c.audio.ended === false) {
      requestAnimationFrame(c.visualizer);
    }
}
```

### Advanced Web Animation with Canvas. Demo lesson [part 5]

```js
visualizer() {
    c.ctx.fillStyle = "hsla(0, 0%, 100%, 1)";
    c.ctx.fillRect(0, 0, c.w, c.h);
    c.analyser.getByteFrequencyData(c.data);

    c.angle += 0.2;
    let shift = 0;
    for (let i = 0; i < c.frAmount; i++) {
      shift += c.barWidth;
      c.barHeight = c.data[i] * c.scale;

      c.ctx.save();
      c.ctx.translate(c.w / 2, c.h / 2);

      c.ctx.rotate((((i * 720) / c.frAmount + c.angle) * Math.PI) / 180);

      c.ctx.fillStyle = "hsla(" + (i * 360) / c.frAmount + ", 100%, 50%, 1)";
      c.ctx.fillRect(0, 0, c.barWidth, -c.barHeight);
      c.ctx.fillRect(0, 0, c.barWidth, c.barHeight);

      c.ctx.restore();
    }

    if (c.audio.ended === false) {
      requestAnimationFrame(c.visualizer);
    }
}
```
