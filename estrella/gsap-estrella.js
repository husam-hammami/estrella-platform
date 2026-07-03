/**
 * Estrella GSAP layer — hero intro, view transitions, per-view staggers.
 * Follows official GSAP patterns: autoAlpha, matchMedia, timeline sequencing.
 */
(function () {
  if (typeof gsap === "undefined") {
    document.documentElement.classList.remove("gsap-motion");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();
  let viewTween = null;
  let heroPlayed = false;

  const viewStaggerSelectors = {
    about: ".about-method-item, .credential-card",
    start: ".start-profile-section, .start-prescription",
  };

  function killViewTween() {
    if (viewTween) {
      viewTween.kill();
      viewTween = null;
    }
  }

  function setVisible(elements) {
    gsap.set(elements, { autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
  }

  function playLandingHero() {
    const landing = document.getElementById("view-landing");
    if (!landing || !landing.classList.contains("active") || heroPlayed) return;

    const content = landing.querySelectorAll(
      ".hero-kicker, .hero h1, .hero-divider, .hero-sub, .hero-options"
    );
    const visual = landing.querySelector(".hero-visual");
    if (!content.length) return;

    gsap.set(content, { autoAlpha: 0, y: 28 });
    if (visual) gsap.set(visual, { autoAlpha: 0, scale: 0.94 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        heroPlayed = true;
      },
    });

    tl.to(content, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 })
      .to(
        visual,
        { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        "-=0.45"
      );
  }

  function staggerViewContent(viewId) {
    const selector = viewStaggerSelectors[viewId];
    if (!selector) return;

    const view = document.getElementById("view-" + viewId);
    if (!view) return;

    const items = view.querySelectorAll(selector);
    if (!items.length) return;

    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }

  function switchView(current, next, onComplete) {
    killViewTween();

    current.classList.add("outgoing");
    current.classList.remove("active");

    viewTween = gsap
      .timeline({
        onComplete: () => {
          current.classList.remove("outgoing");
          next.classList.add("active");
          next.scrollTo(0, 0);
          gsap.set(current, { clearProps: "all" });
          gsap.set(next, { clearProps: "all" });
          onComplete();
        },
      })
      .to(current, { autoAlpha: 0, y: -18, duration: 0.32, ease: "power2.in" })
      .fromTo(
        next,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out" },
        "-=0.12"
      );
  }

  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const reduceMotion = context.conditions.reduceMotion;

      if (reduceMotion) {
        document.documentElement.classList.remove("gsap-motion");
        killViewTween();
        setVisible(
          ".hero-content > *, .hero-visual, .hero-dot, .about-method-item, .credential-card"
        );
        return;
      }

      document.documentElement.classList.add("gsap-motion");
      requestAnimationFrame(playLandingHero);

      return () => {
        document.documentElement.classList.remove("gsap-motion");
        killViewTween();
      };
    }
  );

  window.EstrellaGsap = {
    switchView,
    staggerViewContent,
    replayHero: () => {
      heroPlayed = false;
      playLandingHero();
    },
  };
})();
