(function () {
  "use strict";

  function px(n) { return n + "px"; }

  window.startHeroMorph = function () {
    var logo = document.getElementById("site-logo");
    var video = document.getElementById("hero-video");
    var heading = document.getElementById("hero-heading");
    var nav = document.getElementById("site-nav");
    var actions = document.getElementById("site-actions");

    // 1. Capture where these elements naturally sit in the real header/hero layout.
    var logoFinal = logo.getBoundingClientRect();
    var videoFinal = video.getBoundingClientRect();
    var headingFinal = heading.getBoundingClientRect();
    var headingFinalFontSize = parseFloat(getComputedStyle(heading).fontSize);
    var headingFinalColor = getComputedStyle(heading).color;

    gsap.set([nav, actions], { opacity: 0 });

    // 2. Pin all three at their final rect via position:fixed (no visual jump yet).
    [
      [logo, logoFinal],
      [video, videoFinal],
      [heading, headingFinal]
    ].forEach(function (pair) {
      var el = pair[0], r = pair[1];
      el.style.position = "fixed";
      el.style.margin = "0";
      el.style.zIndex = "500";
      el.style.top = px(r.top);
      el.style.left = px(r.left);
      el.style.width = px(r.width);
      el.style.height = px(r.height);
    });
    heading.style.fontSize = px(headingFinalFontSize);

    // 3. Compute the small, centered "handoff" pose and jump to it instantly.
    var vw = window.innerWidth, vh = window.innerHeight;

    var logoW = Math.min(420, vw * 0.75, vh * 0.40);
    var logoH = logoW * (logoFinal.height / logoFinal.width);

    var videoW = Math.min(140, vh * 0.16);
    var videoH = videoW * (videoFinal.height / videoFinal.width);

    var headingFontSize = Math.min(20, Math.max(15, vh * 0.023));
    var headingW = Math.min(420, vw - 48);

    heading.style.height = "auto";
    heading.style.width = px(headingW);
    heading.style.fontSize = px(headingFontSize);
    heading.style.textAlign = "center";
    heading.style.lineHeight = "1.35";
    heading.style.color = "#23398D";
    heading.style.textShadow = "none";
    var headingH = heading.getBoundingClientRect().height;

    var gap = Math.max(16, vh * 0.03);
    var totalH = logoH + gap + videoH + gap + headingH;
    var top = (vh - totalH) / 2;

    var logoTop = top;
    var videoTop = logoTop + logoH + gap;
    var headingTop = videoTop + videoH + gap;

    logo.style.top = px(logoTop);
    logo.style.left = px((vw - logoW) / 2);
    logo.style.width = px(logoW);
    logo.style.height = px(logoH);

    video.style.top = px(videoTop);
    video.style.left = px((vw - videoW) / 2);
    video.style.width = px(videoW);
    video.style.height = px(videoH);

    heading.style.top = px(headingTop);
    heading.style.left = px((vw - headingW) / 2);
    heading.style.width = px(headingW);
    heading.style.height = px(headingH);

    // 4. One second after this pose is visible, animate straight to the real layout.
    gsap.delayedCall(1, function () {
      var tl = gsap.timeline({
        defaults: { duration: 1.1, ease: "power3.inOut" },
        onComplete: function () {
          [logo, video, heading].forEach(function (el) {
            el.style.position = "";
            el.style.margin = "";
            el.style.top = "";
            el.style.left = "";
            el.style.width = "";
            el.style.height = "";
            el.style.zIndex = "";
          });
          heading.style.fontSize = "";
          heading.style.textAlign = "";
          heading.style.lineHeight = "";
          heading.style.color = "";
          heading.style.textShadow = "";
          if (window.initStageScroll) window.initStageScroll();
        }
      });

      tl.to(logo, { top: logoFinal.top, left: logoFinal.left, width: logoFinal.width, height: logoFinal.height }, 0);
      tl.to(video, { top: videoFinal.top, left: videoFinal.left, width: videoFinal.width, height: videoFinal.height }, 0);
      tl.to(heading, { top: headingFinal.top, left: headingFinal.left, width: headingFinal.width, height: headingFinal.height, fontSize: headingFinalFontSize, color: headingFinalColor }, 0);
      tl.set(heading, { textAlign: "left", textShadow: "0 2px 14px rgba(0,0,0,0.4)" }, 0.5);
      tl.to([nav, actions], { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.7);
    });
  };
})();
