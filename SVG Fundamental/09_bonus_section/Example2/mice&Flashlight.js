"use strict";
let m1 = document.getElementById("mouse01");
let m2 = document.getElementById("mouse02");
let m3 = document.getElementById("mouse03");
let x1 = m1.getAttribute("x");
let y1 = m1.getAttribute("y");
let x2 = m2.getAttribute("x");
let y2 = m2.getAttribute("y");
let x3 = m3.getAttribute("x");
let y3 = m3.getAttribute("y");
let flashlight = document.getElementById("mask-circle");

window.addEventListener(
  "mousemove",
  function (e) {
    let frightDistance = 90; // fright distance
    let dist1 = Math.sqrt(
      Math.pow(e.pageX - x1, 2) + Math.pow(e.pageY - y1, 2)
    );
    if (dist1 < frightDistance) {
      let new_x1 = parseInt(x1) - Math.abs(frightDistance - dist1);
      m1.setAttribute("x", new_x1);
    }
    let dist2 = Math.sqrt(
      Math.pow(e.pageX - x2, 2) + Math.pow(e.pageY - y2, 2)
    );
    if (dist2 < frightDistance) {
      let new_x2 = parseInt(x2) - Math.abs(frightDistance - dist2);
      m2.setAttribute("x", new_x2);
    }
    let dist3 = Math.sqrt(
      Math.pow(e.pageX - x3, 2) + Math.pow(e.pageY - y3, 2)
    );
    if (dist3 < frightDistance) {
      let new_y3 = parseInt(y3) + Math.abs(frightDistance - dist3);
      m3.setAttribute("y", new_y3);
    }

    flashlight.setAttribute("cx", e.pageX);
    flashlight.setAttribute("cy", e.pageY);
  },
  false
);
