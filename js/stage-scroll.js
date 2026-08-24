(function () {
  "use strict";

  // 0=hero, 1="01" mission layout, 2..4="01" Educate/Empathise/Empower chapters (STILL "01" -
  // it's the same story, just three chapters deep into it), 5..7="02" (Vision/Mission, then
  // Our Journey's timeline, then its impact figures - three stops, one number), 8="03" Our
  // Causes (single stop), 9..10="04" Meet the Team (two profile stops, one number). The page
  // stops at "04" - there is no 05-08 yet.
  var MAX_STEP = 10;
  var WHEEL_QUIET_MS = 150; // a gesture's momentum "burst" is considered over once wheel events stop for this long

  // The three "01" story chapters, one per headline word. Chapter 0 (Educate) is Maya's
  // story; 1 (Empathise) and 2 (Empower) are placeholder copy until real stories land.
  var STORIES = [
    {
      photoText: "Photo placeholder – add Maya's photo",
      heading: "Maya wanted to grow up to become a teacher, that is before she discovered AI.",
      paragraph: "An impact driven NGO that has devoted over 30+ years to the wellbeing of visually impaired individuals, right from primary education to family counselling up until employment support. And we strive to do it while giving them an environment as normal to their upbringing as possible."
    },
    {
      photoText: "Photo placeholder – add Empathise story photo",
      heading: "Placeholder headline for the Empathise story.",
      paragraph: "Placeholder copy for the Empathise chapter – replace with a real story about how NAB helps individuals feel understood and supported."
    },
    {
      photoText: "Photo placeholder – add Empower story photo",
      heading: "Placeholder headline for the Empower story.",
      paragraph: "Placeholder copy for the Empower chapter – replace with a real story about independence and opportunity."
    }
  ];

  function px(n) { return n + "px"; }

  function activeNumberForStep(step) {
    if (step <= 4) return 1;
    if (step <= 7) return 2;
    if (step === 8) return 3;
    return 4;
  }

  function chapterForStep(step) {
    if (step >= 2 && step <= 4) return step - 2;
    return -1;
  }

  // "02" itself has three stops sharing one number: 5=Vision/Mission, 6=Journey timeline,
  // 7=Journey + impact figures together.
  function isPage02Step(step) {
    return step >= 5 && step <= 7;
  }

  window.initStageScroll = function () {
    var viewport = document.getElementById("stage-viewport");
    var siteHeader = document.getElementById("site-header");
    var video = document.getElementById("hero-video");
    var heading = document.getElementById("hero-heading");
    var numbersEl = document.getElementById("stage-numbers");
    var numberEls = numbersEl.querySelectorAll(".num");
    var paragraph = document.getElementById("stage-paragraph");
    var cta = document.getElementById("stage-cta");
    var stage2Headline = document.getElementById("stage2-headline");
    var stage2WordEls = stage2Headline.querySelectorAll(".word");
    var stage2Photo = document.getElementById("stage2-photo");
    var stage2Text = document.getElementById("stage2-text");
    var stage2Heading = stage2Text.querySelector("h3");
    var stage2Paragraph = stage2Text.querySelector("p");
    var segmentIntroPeek = document.getElementById("segment-intro-peek");
    var nextSectionPeek = document.getElementById("next-section-peek");
    var page02 = document.getElementById("page02");
    var page02Vision = document.getElementById("page02-vision");
    var page02Journey = document.getElementById("page02-journey");
    var page02Impact = document.getElementById("page02-impact");
    var page03 = document.getElementById("page03");
    var causeCards = document.querySelectorAll(".cause-card");
    var causeCardPhotos = document.querySelectorAll(".cause-card-photo");
    var page04 = document.getElementById("page04");
    var page04Members = document.getElementById("page04-members");
    var page04Track = document.getElementById("page04-members-track");
    var teamCards = document.querySelectorAll(".team-member");

    var vRect = viewport.getBoundingClientRect();
    var vw = vRect.width, vh = vRect.height;

    // Pin video + heading to their current natural ("hero") rect, relative to the viewport.
    function rectRelativeToViewport(el) {
      var r = el.getBoundingClientRect();
      return { top: r.top - vRect.top, left: r.left - vRect.left, width: r.width, height: r.height };
    }

    var heroVideoRect = rectRelativeToViewport(video);
    var heroHeadingRect = rectRelativeToViewport(heading);
    var heroHeadingFontSize = parseFloat(getComputedStyle(heading).fontSize);

    [video, heading].forEach(function (el, i) {
      var r = i === 0 ? heroVideoRect : heroHeadingRect;
      el.style.position = "absolute";
      el.style.margin = "0";
      el.style.top = px(r.top);
      el.style.left = px(r.left);
      el.style.width = px(r.width);
      el.style.height = px(r.height);
    });
    heading.style.right = "auto";
    heading.style.bottom = "auto";
    heading.style.fontSize = px(heroHeadingFontSize);

    // "01" mission layout target rect (used for steps 1-8), computed from viewport size.
    // Video sized off the reference photo's own proportions (~783x480, ~1.63:1), then the
    // text column fills whatever width is left after it - so the two never fight for space.
    var sideMargin = vw * 0.08;
    var gutter = vw * 0.07;
    var videoAspect = 783 / 480;
    var videoTop = vh * 0.16;
    var videoW = vw * 0.46;
    var videoH = videoW / videoAspect;
    var maxVideoH = vh * 0.60;
    if (videoH > maxVideoH) {
      videoH = maxVideoH;
      videoW = videoH * videoAspect;
    }
    var contentLeft = sideMargin + videoW + gutter;
    var contentWidth = vw - contentLeft - sideMargin;
    var missionHeadingFontSize = Math.min(30, contentWidth * 0.05);

    // Stack the heading/paragraph/CTA off each other's REAL rendered height (not a guessed
    // fraction of the video) so the gaps stay tight and correct regardless of how many lines
    // the heading wraps to. Same measure-then-position technique used in hero-morph.js.
    var blockGap = vh * 0.05;

    heading.style.width = px(contentWidth);
    heading.style.fontSize = px(missionHeadingFontSize);
    heading.style.height = "auto";
    heading.style.lineHeight = "1.15";
    var measuredHeadingHeight = heading.getBoundingClientRect().height;
    // Restore the hero pose - the measurement above must not leak into the initial view.
    heading.style.width = px(heroHeadingRect.width);
    heading.style.height = px(heroHeadingRect.height);
    heading.style.fontSize = px(heroHeadingFontSize);

    var paragraphTop = videoTop + measuredHeadingHeight + blockGap;
    paragraph.style.width = px(contentWidth);
    paragraph.style.height = "auto";
    var measuredParagraphHeight = paragraph.getBoundingClientRect().height;

    var ctaTop = paragraphTop + measuredParagraphHeight + blockGap;

    // Numbers row sits centered in the gap between the header (top:0 of this viewport) and
    // the image/heading row below it - equidistant from both, not just a fixed offset.
    // (Guard against a 0/unreliable measurement with a sane fallback based on its font-size.)
    var numbersHeight = numbersEl.getBoundingClientRect().height || 46;
    var numbersTop = Math.max(0, (videoTop - numbersHeight) / 2 - vh * 0.05);

    var mission = {
      video: { top: videoTop, left: sideMargin, width: videoW, height: videoH },
      heading: { top: videoTop, left: contentLeft, width: contentWidth },
      headingFontSize: missionHeadingFontSize,
      numbers: { top: numbersTop },
      paragraph: { top: paragraphTop, left: contentLeft, width: contentWidth },
      cta: { top: ctaTop, left: contentLeft, width: contentWidth }
    };

    // "02" story layout: three columns across, left to right - Educate/Empathise/Empower
    // headline, then Maya's photo, then her heading+copy BESIDE it (not stacked under it).
    // Proportions measured off the reference: the headline sits well apart from the photo
    // (a wide gap), while the photo and text sit close together (a narrow gap).
    // Plus each element's "peek" resting pose while on "01" - just poking up from the bottom
    // edge, like the next section of a normal scrolling page peeking into view before you
    // actually scroll to it.
    var s2HeadlineW = vw * 0.13;
    var s2WideGap = vw * 0.15;
    var s2NarrowGap = vw * 0.05;
    var s2PhotoW = vw * 0.19;
    var s2PhotoLeft = sideMargin + s2HeadlineW + s2WideGap;
    var s2TextLeft = s2PhotoLeft + s2PhotoW + s2NarrowGap;
    var s2TextWidth = vw - s2TextLeft - sideMargin;
    var s2Top = vh * 0.22;

    var stage2 = {
      headline: { top: s2Top, left: sideMargin, width: s2HeadlineW },
      photo: { top: s2Top, left: s2PhotoLeft, width: s2PhotoW },
      text: { top: s2Top, left: s2TextLeft, width: s2TextWidth }
    };
    var stage2PeekTop = vh - vh * 0.16;

    function stage2PoseFor(step) {
      if (step === 1) return { opacity: 1, headlineTop: stage2PeekTop, photoTop: stage2PeekTop, textTop: stage2PeekTop };
      if (step >= 2 && step <= 4) return { opacity: 1, headlineTop: stage2.headline.top, photoTop: stage2.photo.top, textTop: stage2.text.top };
      return { opacity: 0, headlineTop: stage2PeekTop, photoTop: stage2PeekTop, textTop: stage2PeekTop };
    }

    // "02" segment intro teaser: visible (pinned near the bottom edge, no movement) throughout
    // the three Educate/Empathise/Empower chapters.
    function segmentIntroOpacityFor(step) {
      return (step >= 2 && step <= 4) ? 1 : 0;
    }

    // Corner peek of the next section's visual: flies in (position, not opacity) from well
    // off the bottom-right corner to a small navy square during the last ("Empower") chapter,
    // then grows - still anchored bottom-right, so it sweeps toward the top-left - to cover
    // the whole viewport once "02" is reached. Past "02" (pages 03-08) it flies back out to
    // the same offscreen spot, ready to fly in again if you scroll back down to "02".
    // It's always fully opaque; hidden purely by sitting outside the viewport, clipped by
    // .hero's overflow:hidden - that's what makes the entrance a fly-in instead of a fade-in.
    var nextSectionOffscreenGeom = { right: -400, bottom: -400, width: 260, height: 260, radius: 8 };
    var nextSectionPeekGeom = { right: -120, bottom: -120, width: 260, height: 260, radius: 8 };
    var nextSectionFullGeom = { right: 0, bottom: 0, width: vw, height: vh, radius: 0 };

    function nextSectionPoseFor(step) {
      if (isPage02Step(step)) return { opacity: 1, geom: nextSectionFullGeom };
      if (chapterForStep(step) === 2) return { opacity: 1, geom: nextSectionPeekGeom };
      return { opacity: 1, geom: nextSectionOffscreenGeom };
    }

    // "02" page content: fades in only once the navy backdrop above has grown to fill the screen.
    function page02OpacityFor(step) {
      return isPage02Step(step) ? 1 : 0;
    }

    // Sub-view A (Vision/Mission): the only one of the three that moves - it just crossfades
    // in place, since Journey slides up and settles over it.
    function page02VisionOpacityFor(step) {
      return step === 5 ? 1 : 0;
    }

    // Sub-view B+C (Journey): peeks up from the bottom edge (just the heading) while Vision/
    // Mission is showing, then settles into its full resting spot for both remaining stops -
    // it never moves again once there, only its impact column fades in on top of it.
    var journeyFullTop = vh * 0.16;
    var journeyPeekTop = vh - vh * 0.1;

    function page02JourneyPoseFor(step) {
      if (step === 5) return { opacity: 1, top: journeyPeekTop };
      if (step === 6 || step === 7) return { opacity: 1, top: journeyFullTop };
      return { opacity: 0, top: journeyPeekTop };
    }

    // Sub-view C (impact figures): fades in beside the already-settled timeline - no reflow.
    function page02ImpactOpacityFor(step) {
      return step === 7 ? 1 : 0;
    }

    // "03" Our Causes: a single stop, simple crossfade in/out like page02 as a whole.
    function page03OpacityFor(step) {
      return step === 8 ? 1 : 0;
    }

    // ---- "03" Our Causes geometry ----
    // The photo's fixed 4:5 aspect-ratio means card WIDTH is what determines whole-card
    // height, so it's what has to be solved for to guarantee the row fits the pinned
    // viewport (which clips via .hero's overflow:hidden - anything taller just vanishes,
    // which is what was happening before this was measured). Two passes: measure each
    // card's non-photo "chrome" height (title/description/goal/buttons/padding, whatever
    // it actually wraps to at the current width), solve the width that leaves exactly
    // enough room for the photo, apply it, then re-measure once more since the new width
    // changes how the text wraps.
    var page03Heading = document.querySelector(".page03-heading");
    var page03HeadingMB = parseFloat(getComputedStyle(page03Heading).marginBottom);
    var page03PadTop = parseFloat(getComputedStyle(page03).paddingTop);
    var page03PadBottom = parseFloat(getComputedStyle(page03).paddingBottom);
    var page03AvailH = vh - page03PadTop - page03PadBottom - page03Heading.getBoundingClientRect().height - page03HeadingMB;

    function measureCauseChromeH() {
      var h = 0;
      causeCardPhotos.forEach(function (p) { p.style.display = "none"; });
      causeCards.forEach(function (card) { h = Math.max(h, card.getBoundingClientRect().height); });
      causeCardPhotos.forEach(function (p) { p.style.display = ""; });
      return h;
    }

    var causeCardW = 340;
    causeCards.forEach(function (card) { card.style.width = px(causeCardW); });
    for (var causePass = 0; causePass < 4; causePass++) {
      var causeChromeH = measureCauseChromeH();
      var causePhotoH = Math.max(60, page03AvailH - causeChromeH - 20 /* photo's own margin-bottom + rounding slack */);
      causeCardW = Math.max(100, Math.min(340, causePhotoH * 0.8 /* 4:5 aspect, width = height * 4/5 */));
      causeCards.forEach(function (card) { card.style.width = px(causeCardW); });
    }

    // "04" Meet the Team: two profile stops sharing one number - the block itself fades in/out
    // like page03, and while it's up the member TRACK slides (translateY) so one card sits fully
    // in the top slot and the next one peeks in below it, clipped by page04Members' own height.
    function page04OpacityFor(step) {
      return (step === 9 || step === 10) ? 1 : 0;
    }

    function teamActiveIndexFor(step) {
      if (step === 9) return 0;
      if (step === 10) return 1;
      return null;
    }

    // ---- "04" Meet the Team geometry ----
    // page04Members' height is set to exactly 1.5 cards' worth (card + gap + half a card), so
    // the next member's photo/name peek in below the current one - matching the reference
    // design's "one and a half cards per scroll" look - then translateY brings each member up
    // into the top slot as you advance. teamGap MUST match the .page04-members-track CSS gap.
    var page04Heading = document.querySelector(".page04-heading");
    var page04HeadingMB = parseFloat(getComputedStyle(page04Heading).marginBottom);
    var page04PadTop = parseFloat(getComputedStyle(page04).paddingTop);
    var page04PadBottom = parseFloat(getComputedStyle(page04).paddingBottom);
    var teamViewportH = vh - page04PadTop - page04PadBottom - page04Heading.getBoundingClientRect().height - page04HeadingMB;
    var teamGap = 28;
    var teamCardH = Math.max(120, (teamViewportH - teamGap) / 1.5);
    var teamSlotH = teamCardH + teamGap;

    page04Members.style.height = px(teamViewportH);
    teamCards.forEach(function (card) { card.style.height = px(teamCardH); });
    // The photo's own height drives its width (via aspect-ratio) - see the CSS comment on
    // .team-member-photo for why this can't just be a 100% height instead.
    document.querySelectorAll(".team-member-photo").forEach(function (photo) { photo.style.height = px(teamCardH); });

    gsap.set(numbersEl, { top: px(mission.numbers.top) });
    gsap.set(paragraph, { top: px(mission.paragraph.top), left: px(mission.paragraph.left), width: px(mission.paragraph.width), textAlign: "center", y: 40 });
    gsap.set(cta, { top: px(mission.cta.top), left: px(mission.cta.left), width: px(mission.cta.width), y: 40 });
    gsap.set(stage2Headline, { top: px(stage2PeekTop), left: px(stage2.headline.left), width: px(stage2.headline.width), opacity: 0 });
    gsap.set(stage2Photo, { top: px(stage2PeekTop), left: px(stage2.photo.left), width: px(stage2.photo.width), opacity: 0 });
    gsap.set(stage2Text, { top: px(stage2PeekTop), left: px(stage2.text.left), width: px(stage2.text.width), opacity: 0 });
    gsap.set(segmentIntroPeek, { opacity: 0 });
    gsap.set(nextSectionPeek, {
      opacity: 1,
      right: px(nextSectionOffscreenGeom.right), bottom: px(nextSectionOffscreenGeom.bottom),
      width: px(nextSectionOffscreenGeom.width), height: px(nextSectionOffscreenGeom.height),
      borderRadius: px(nextSectionOffscreenGeom.radius)
    });
    gsap.set(page02, { opacity: 0 });
    gsap.set(page02Vision, { opacity: 0 });
    gsap.set(page02Journey, { top: px(journeyPeekTop), opacity: 0 });
    gsap.set(page02Impact, { opacity: 0 });
    gsap.set(page03, { opacity: 0 });
    gsap.set(page04, { opacity: 0 });
    gsap.set(page04Track, { y: 0 });

    var currentStep = 0;
    var isAnimating = false;

    function inputLocked() {
      return isAnimating;
    }

    function setActiveNumber(n) {
      numberEls.forEach(function (el) {
        el.classList.toggle("active", parseInt(el.getAttribute("data-n"), 10) === n);
      });
    }

    function goToStep(newStep) {
      newStep = Math.max(0, Math.min(MAX_STEP, newStep));
      if (newStep === currentStep || isAnimating) return;
      isAnimating = true;

      var wasHero = currentStep === 0;
      var isHero = newStep === 0;
      var wasStep1 = currentStep === 1; // the single, complete "01" slide
      var isStep1 = newStep === 1;
      var wasVideoHeadingVisible = wasHero || wasStep1;
      var isVideoHeadingVisible = isHero || isStep1;

      var tl = gsap.timeline({
        defaults: { duration: 0.65, ease: "power2.inOut" },
        onComplete: function () {
          isAnimating = false;
          currentStep = newStep;
        }
      });

      // Video + heading only move between the hero pose and the mission pose (used by every non-hero step).
      if (isHero !== wasHero) {
        var vTarget = isHero ? heroVideoRect : mission.video;
        var hTarget = isHero ? heroHeadingRect : mission.heading;
        var hFontTarget = isHero ? heroHeadingFontSize : mission.headingFontSize;

        tl.to(video, { top: px(vTarget.top), left: px(vTarget.left), width: px(vTarget.width), height: px(vTarget.height) }, 0);
        tl.to(heading, {
          top: px(hTarget.top), left: px(hTarget.left), width: px(hTarget.width),
          fontSize: px(hFontTarget),
          color: isHero ? "#FFFFFF" : "#23398D",
          textShadow: isHero ? "0 2px 14px rgba(0,0,0,0.4)" : "none"
        }, 0);
        tl.set(heading, { textAlign: isHero ? "left" : "center" }, 0.45);
      }

      // Numbers row: hidden only on the hero step.
      tl.to(numbersEl, { opacity: isHero ? 0 : 1, duration: 0.5 }, 0);
      if (!isHero) setActiveNumber(activeNumberForStep(newStep));

      // Video + heading: visible on hero AND "01"; hidden behind "02" and the placeholders.
      if (isVideoHeadingVisible !== wasVideoHeadingVisible) {
        tl.to([video, heading], { opacity: isVideoHeadingVisible ? 1 : 0, duration: 0.5 }, isVideoHeadingVisible ? 0.3 : 0);
      }

      // Paragraph + CTA fly in as the second half of the SAME first-scroll transition into "01".
      if (isStep1 !== wasStep1) {
        tl.to([paragraph, cta], {
          opacity: isStep1 ? 1 : 0,
          y: isStep1 ? 0 : 40,
          duration: 0.5,
          stagger: 0.08
        }, isStep1 ? 0.2 : 0);
      }

      // "02" story slide: hidden on hero, peeking up from the bottom edge while on "01",
      // fully in place across the Educate/Empathise/Empower chapters - and hidden again past it.
      var wasS2 = stage2PoseFor(currentStep);
      var isS2 = stage2PoseFor(newStep);
      if (wasS2.opacity !== isS2.opacity || wasS2.headlineTop !== isS2.headlineTop) {
        var s2Appearing = isS2.opacity > wasS2.opacity;
        var s2Start = s2Appearing ? 0.2 : 0;
        tl.to(stage2Headline, { opacity: isS2.opacity, top: px(isS2.headlineTop), duration: 0.5 }, s2Start);
        tl.to(stage2Photo, { opacity: isS2.opacity, top: px(isS2.photoTop), duration: 0.5 }, s2Start + 0.06);
        tl.to(stage2Text, { opacity: isS2.opacity, top: px(isS2.textTop), duration: 0.5 }, s2Start + 0.12);
      }

      // Chapter word (Educate/Empathise/Empower) + its story content, kept in sync as you
      // scroll deeper into "01" - each word lights up and its photo/text crossfade in turn.
      var oldChapter = chapterForStep(currentStep);
      var newChapter = chapterForStep(newStep);
      if (newChapter !== oldChapter && newChapter !== -1) {
        stage2WordEls.forEach(function (el, i) {
          el.classList.toggle("active", i === newChapter);
        });
        var story = STORIES[newChapter];
        if (oldChapter !== -1) {
          // Moving between chapters while already on "02": crossfade the photo + text.
          tl.to([stage2Photo, stage2Text], { opacity: 0, duration: 0.25 }, 0);
          tl.call(function () {
            stage2Photo.alt = story.photoText;
            stage2Heading.textContent = story.heading;
            stage2Paragraph.textContent = story.paragraph;
          }, null, 0.25);
          tl.to([stage2Photo, stage2Text], { opacity: 1, duration: 0.25 }, 0.3);
        } else {
          // Arriving fresh from "01" mission: set content immediately, the appear block above
          // already handles fading stage2Photo/stage2Text in.
          stage2Photo.alt = story.photoText;
          stage2Heading.textContent = story.heading;
          stage2Paragraph.textContent = story.paragraph;
        }
      }

      // "02" segment intro teaser: visible throughout the Educate/Empathise/Empower chapters.
      var wasSegIntro = segmentIntroOpacityFor(currentStep);
      var isSegIntro = segmentIntroOpacityFor(newStep);
      if (wasSegIntro !== isSegIntro) {
        tl.to(segmentIntroPeek, { opacity: isSegIntro, duration: 0.5 }, isSegIntro > wasSegIntro ? 0.3 : 0);
      }

      // Next-section corner peek: flies (position only - it's always fully opaque) between
      // offscreen, the small "Empower" peek, and full-screen coverage on "02". Only the
      // specific transition into full-screen coverage gets the small 0.1 head start, to stay
      // in sync with the header/numbers dark-mode timing below (which waits for t=0.75).
      var wasNextSection = nextSectionPoseFor(currentStep);
      var isNextSection = nextSectionPoseFor(newStep);
      if (wasNextSection.geom !== isNextSection.geom) {
        var g = isNextSection.geom;
        var enteringFull = g === nextSectionFullGeom && wasNextSection.geom !== nextSectionFullGeom;
        tl.to(nextSectionPeek, {
          right: px(g.right), bottom: px(g.bottom),
          width: px(g.width), height: px(g.height),
          borderRadius: px(g.radius),
          duration: 0.65
        }, enteringFull ? 0.1 : 0);
      }

      // "02" page content: white text/photo on top of the now-navy backdrop, appearing only
      // once we've actually arrived on "02" (after the backdrop above has grown to cover it).
      var wasPage02 = page02OpacityFor(currentStep);
      var isPage02 = page02OpacityFor(newStep);
      if (wasPage02 !== isPage02) {
        tl.to(page02, { opacity: isPage02, duration: 0.5 }, isPage02 > wasPage02 ? 0.75 : 0);
      }

      // "02" sub-views: Vision/Mission crossfades with Journey (peeking -> settled) as you
      // move through the three "02" stops, then the impact figures fade in beside the
      // already-settled timeline. When arriving at (or leaving) "02" altogether, snap them
      // straight to the target step's pose instead of animating - the page02 fade above is
      // what carries that transition visually, so animating both would double up.
      var isVision = page02VisionOpacityFor(newStep);
      var isJourney = page02JourneyPoseFor(newStep);
      var isImpact = page02ImpactOpacityFor(newStep);
      if (wasPage02 !== isPage02) {
        gsap.set(page02Vision, { opacity: isVision });
        gsap.set(page02Journey, { opacity: isJourney.opacity, top: px(isJourney.top) });
        gsap.set(page02Impact, { opacity: isImpact });
      } else {
        var wasVision = page02VisionOpacityFor(currentStep);
        var wasJourney = page02JourneyPoseFor(currentStep);
        var wasImpact = page02ImpactOpacityFor(currentStep);
        if (wasVision !== isVision) {
          tl.to(page02Vision, { opacity: isVision, duration: 0.5 }, 0);
        }
        if (wasJourney.opacity !== isJourney.opacity || wasJourney.top !== isJourney.top) {
          tl.to(page02Journey, { opacity: isJourney.opacity, top: px(isJourney.top), duration: 0.65 }, 0);
        }
        if (wasImpact !== isImpact) {
          tl.to(page02Impact, { opacity: isImpact, duration: 0.5 }, 0);
        }
      }

      // Header goes navy while any "02" stop is up - NOT as its own independent fade, but as
      // the exact same tween (same start offset, same 0.65s duration, same easing) as the
      // corner rectangle's growth/shrink just above, so the two read as one motion instead of
      // two separately-timed animations. Nav/button text + the numbers row swap color once
      // that motion actually finishes (t=0.75 growing, t=0 shrinking - it starts retreating
      // immediately, matching the rectangle).
      var wasOnDark = isPage02Step(currentStep);
      var isOnDark = isPage02Step(newStep);
      if (wasOnDark !== isOnDark) {
        tl.to(siteHeader, {
          backgroundColor: isOnDark ? "#23398D" : "rgba(35,57,141,0)",
          duration: 0.65
        }, enteringFull ? 0.1 : 0);
        tl.call(function () {
          siteHeader.classList.toggle("on-dark", isOnDark);
          numbersEl.classList.toggle("on-dark", isOnDark);
        }, null, isOnDark ? 0.75 : 0);
      }

      // "03" Our Causes: single-stop crossfade, same treatment as page02 fading in/out as a whole.
      var wasPage03 = page03OpacityFor(currentStep);
      var isPage03 = page03OpacityFor(newStep);
      if (wasPage03 !== isPage03) {
        tl.to(page03, { opacity: isPage03, duration: 0.5 }, isPage03 > wasPage03 ? 0.2 : 0);
      }

      // "04" Meet the Team: the block fades in/out as a whole (like page03), and while it's up
      // the member track slides between its two stops (a "1.5 cards" carousel - see the
      // geometry block above). As with page02's sub-views, snap the track straight to the
      // target position when the whole block itself is arriving/leaving - the block-level fade
      // above already carries that transition.
      var wasPage04 = page04OpacityFor(currentStep);
      var isPage04 = page04OpacityFor(newStep);
      if (wasPage04 !== isPage04) {
        tl.to(page04, { opacity: isPage04, duration: 0.5 }, isPage04 > wasPage04 ? 0.2 : 0);
      }
      var wasTeamIdx = teamActiveIndexFor(currentStep);
      var isTeamIdx = teamActiveIndexFor(newStep);
      if (wasTeamIdx !== isTeamIdx) {
        var teamTargetIdx = isTeamIdx !== null ? isTeamIdx : wasTeamIdx;
        var teamTargetY = -(teamTargetIdx * teamSlotH);
        if (wasPage04 !== isPage04) {
          gsap.set(page04Track, { y: px(teamTargetY) });
        } else {
          tl.to(page04Track, { y: px(teamTargetY), duration: 0.65 }, 0);
        }
      }

    }

    // ---- Input handling: wheel, touch, keyboard, number clicks ----

    // Act on the very first wheel event of a gesture immediately (no waiting = no lag).
    // Every event in the burst that follows (including a long trackpad momentum tail) resets
    // a "quiet" timer, so the burst is only considered over once events actually stop for
    // WHEEL_QUIET_MS - no matter how long that takes. That's what stops one physical scroll
    // from silently chaining into a second step once the first transition finishes.
    var burstActive = false;
    var burstQuietTimer = null;

    window.addEventListener("wheel", function (e) {
      e.preventDefault();

      if (burstQuietTimer) clearTimeout(burstQuietTimer);
      burstQuietTimer = setTimeout(function () { burstActive = false; }, WHEEL_QUIET_MS);

      // Mark this gesture as "used" whether or not it actually triggers a step, so the tail
      // end of a scroll that started (or continued) while locked can't sneak through the
      // instant the lock releases - the user has to stop and start a genuinely new gesture.
      var shouldTrigger = !inputLocked() && !burstActive;
      burstActive = true;
      if (shouldTrigger) goToStep(currentStep + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    var touchStartY = null;
    window.addEventListener("touchstart", function (e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener("touchmove", function (e) {
      e.preventDefault();
    }, { passive: false });
    window.addEventListener("touchend", function (e) {
      if (touchStartY === null || inputLocked()) return;
      var dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) goToStep(currentStep + (dy > 0 ? 1 : -1));
      touchStartY = null;
    });

    window.addEventListener("keydown", function (e) {
      if (inputLocked()) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goToStep(currentStep + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); goToStep(currentStep - 1); }
    });

    numberEls.forEach(function (el) {
      el.style.cursor = "pointer";
      el.addEventListener("click", function () {
        var n = parseInt(el.getAttribute("data-n"), 10);
        // Inverse of activeNumberForStep: "01" jumps to the start of that story (step 1), "02"
        // jumps to the first of its three stops (step 5), "03" to its single stop (step 8),
        // "04" to the first of its two stops (step 9).
        goToStep(n === 1 ? 1 : n === 2 ? 5 : n === 3 ? 8 : 9);
      });
    });
  };
})();
