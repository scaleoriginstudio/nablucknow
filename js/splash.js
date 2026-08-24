(function () {
  "use strict";

  var percentageEl = document.getElementById("percentage");
  var conditionEl = document.getElementById("condition");
  var logoEl = document.getElementById("splash-logo");
  var splashEl = document.getElementById("splash");
  var tunnelEl = document.getElementById("tunnel-mask");
  var macularEl = document.getElementById("macular-mask");
  var siteEl = document.getElementById("site");

  var BLACK = { r: 0, g: 0, b: 0 };
  var WHITE = { r: 255, g: 255, b: 255 };
  var NAVY = "#23398D";

  function lerp(a, b, t) { return a + (b - a) * t; }

  function rgbToStr(r, g, b) {
    return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
  }

  // Stage bands, keyed by remaining "sight loss" value (100 -> 0).
  var stages = [
    { above: 75, label: "Total Blindness" },
    { above: 50, label: "Advanced Glaucoma" },
    { above: 25, label: "Cataract" },
    { above: 0, label: "Macular Degeneration" },
    { above: -1, label: "Full Sight" }
  ];

  function stageForValue(v) {
    for (var i = 0; i < stages.length; i++) {
      if (v > stages[i].above) return stages[i];
    }
    return stages[stages.length - 1];
  }

  var lastLabel = null;

  function update() {
    var v = counter.v;
    var t = 1 - v / 100; // 0 -> 1 as sight returns

    // Percentage text
    percentageEl.textContent = Math.max(0, Math.round(v)) + "%";

    // Condition label (only touch DOM on change)
    var stage = stageForValue(v);
    if (stage.label !== lastLabel) {
      conditionEl.textContent = stage.label;
      lastLabel = stage.label;
    }

    // Background: stays near-black, then rapidly lightens near the end
    var bgT = Math.pow(t, 2.4);
    var bg = {
      r: lerp(BLACK.r, WHITE.r, bgT),
      g: lerp(BLACK.g, WHITE.g, bgT),
      b: lerp(BLACK.b, WHITE.b, bgT)
    };
    splashEl.style.backgroundColor = rgbToStr(bg.r, bg.g, bg.b);
    conditionEl.style.color = bgT > 0.55 ? NAVY : "#FFFFFF";
    percentageEl.style.color = bgT > 0.55 ? NAVY : "#FFFFFF";

    // Logo: blur / contrast / grayscale / brightness ease back to normal
    var blur = 26 * Math.pow(1 - t, 1.3);
    var contrast = 0.5 + 0.5 * t;
    var grayscale = 1 - t;
    var brightness = 0.35 + 0.65 * t;
    logoEl.style.filter =
      "blur(" + blur.toFixed(1) + "px) " +
      "contrast(" + contrast.toFixed(2) + ") " +
      "grayscale(" + grayscale.toFixed(2) + ") " +
      "brightness(" + brightness.toFixed(2) + ")";

    // Tunnel vision mask: active roughly t in [0.25, 0.49] (glaucoma band)
    var tunnelStart = 0.25, tunnelEnd = 0.50;
    if (t >= tunnelStart && t <= tunnelEnd) {
      var bp = (t - tunnelStart) / (tunnelEnd - tunnelStart);
      var fade = bp < 0.15 ? bp / 0.15 : (1 - bp) < 0.15 ? (1 - bp) / 0.15 : 1;
      fade = Math.min(1, Math.max(0, fade));
      var size = lerp(30, 1400, bp);
      tunnelEl.style.width = size + "px";
      tunnelEl.style.height = size + "px";
      tunnelEl.style.opacity = fade;
    } else {
      tunnelEl.style.opacity = 0;
    }

    // Macular degeneration mask: active roughly t in [0.75, 0.99]
    var macStart = 0.75, macEnd = 0.99;
    if (t >= macStart && t <= macEnd) {
      var mp = (t - macStart) / (macEnd - macStart);
      macularEl.style.opacity = Math.sin(mp * Math.PI).toFixed(2);
    } else {
      macularEl.style.opacity = 0;
    }
  }

  var counter = { v: 100 };

  function revealSite() {
    if (window.startHeroMorph) window.startHeroMorph();
    gsap.to(splashEl, {
      opacity: 0,
      duration: 0.6,
      ease: "power1.out",
      onComplete: function () {
        splashEl.classList.add("is-hidden");
        splashEl.style.display = "none";
      }
    });
    gsap.to(siteEl, {
      opacity: 1,
      duration: 0.6,
      ease: "power1.out"
    });
  }

  gsap.to(counter, {
    v: 0,
    duration: 6,
    ease: "power1.inOut",
    onUpdate: update,
    onComplete: function () {
      update();
      gsap.delayedCall(0.5, revealSite);
    }
  });

  update();
})();
