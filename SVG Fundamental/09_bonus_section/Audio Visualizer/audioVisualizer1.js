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
  power: 8, // [5 - 15]
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
    this.barWidth = Math.ceil(this.w / this.frAmount);
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
      c.ctx.fillStyle = "hsla(" + (i * 360) / c.frAmount + ", 100%, 50%, 1)";
      c.ctx.fillRect(shift, c.h / 2, c.barWidth, -c.barHeight);
    }

    if (c.audio.ended === false) {
      requestAnimationFrame(c.visualizer);
    }
  },

  visualizer2() {
    c.ctx.fillStyle = "hsla(0, 0%, 100%, 1)";
    c.ctx.fillRect(0, 0, c.w, c.h);
    c.analyser.getByteFrequencyData(c.data);

    let shift = 0;
    for (let i = 0; i < c.frAmount; i++) {
      shift += c.barWidth * c.scale * 7;
      c.barHeight = c.data[i];
      c.ctx.fillStyle = `hsla(${(i * 360) / c.frAmount}, 100%, 50%, 1)`;
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
  },
};
