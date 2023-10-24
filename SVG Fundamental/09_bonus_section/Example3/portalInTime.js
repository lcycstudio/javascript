"use strict";

let aimLn = document.getElementById("aimLines");
let aimC1 = document.getElementById("aimCircle1");
let aimC2 = document.getElementById("aimCircle2");
let portal = document.getElementById("mask-circle");

let portalRadius = parseInt(/(\d*)/g.exec(portal.getAttribute("r")));
let previousXposition = 0;
let aimRotate1 = 0;
let aimRotate2 = 0;
let jumpFlag = 0;

document.getElementById("vid1").addEventListener(
  "loadedmetadata",
  function () {
    this.currentTime = 13; // start playing at 13s
    this.play();
  },
  false
);

window.addEventListener(
  "mousemove",
  function (e) {
    portal.setAttribute("cx", e.pageX);
    portal.setAttribute("cy", e.pageY);

    aimLn.setAttribute(
      "transform",
      "translate(" + e.pageX + " " + e.pageY + ")"
    );

    if (previousXposition < e.pageX) {
      aimRotate1++;
      aimRotate2--;
    } else {
      aimRotate1--;
      aimRotate2++;
    }

    aimC1.setAttribute("cx", e.pageX);
    aimC1.setAttribute("cy", e.pageY);
    aimC1.setAttribute(
      "transform",
      "rotate(" + aimRotate1 + " " + e.pageX + " " + e.pageY + ")"
    );

    aimC2.setAttribute("cx", e.pageX);
    aimC2.setAttribute("cy", e.pageY);
    aimC2.setAttribute(
      "transform",
      "rotate(" + aimRotate2 + " " + e.pageX + " " + e.pageY + ")"
    );

    previousXposition = e.pageX;
  },
  false
);

let portalJump = function () {
  portalRadius++;
  portal.setAttribute("r", portalRadius + "%");
  if (portalRadius < 100) {
    setTimeout(portalJump);
  }
};

let portalBackJump = function () {
  portalRadius--;
  portal.setAttribute("r", portalRadius + "%");
  if (portalRadius > 15) {
    setTimeout(portalBackJump, 1);
  }
};

document.onclick = function (e) {
  if (jumpFlag == 0) {
    portalJump();
    jumpFlag = 1;
  } else {
    portalBackJump();
    jumpFlag = 0;
  }
};
