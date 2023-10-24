"use strict";

let c = {
  canvas: null,
  ctx: null,
  w: undefined,
  h: undefined,

  audio: null,
  aCtx: null,
  mediaSource: null,
  analyser: null,
  barWidth: undefined,
  barHeight: undefined,
  data: null,
  power: 12, // [5 - 15]
  frAmount: undefined, // (2**power) / 2
  angle: 0,
  scale: undefined,
  reader: null,
  wm: null,

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
  },

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
  },
};
