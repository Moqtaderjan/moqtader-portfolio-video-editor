
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouch = window.matchMedia(
    "(hover: none), (pointer: coarse)"
  ).matches;

  /* ----------------------------------------------------------------
     Small helpers
  ---------------------------------------------------------------- */

  function el(tag, className, html) {
    const node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (html !== undefined) {
      node.innerHTML = html;
    }

    return node;
  }

  function escapeHtml(str) {
    if (!str) return "";

    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ----------------------------------------------------------------
     NAV
  ---------------------------------------------------------------- */

  function renderNav() {
    const navList = document.getElementById("navList");
    const mobileNavList = document.getElementById("mobileNavList");

    SITE_DATA.nav.forEach((item) => {
      const li = el("li");
      const a = el("a", null, escapeHtml(item.label));

      a.href = item.href;

      li.appendChild(a);
      navList.appendChild(li);

      const liM = el("li");
      const aM = el("a", null, escapeHtml(item.label));

      aM.href = item.href;

      liM.appendChild(aM);
      mobileNavList.appendChild(liM);
    });
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");
    const close = document.getElementById("mobileMenuClose");
    const links = menu.querySelectorAll("a");

    function open() {
      menu.setAttribute("data-open", "true");
      toggle.setAttribute("aria-expanded", "true");
      document.body.setAttribute("data-scroll-lock", "true");
      close.focus();
    }

    function shut() {
      menu.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
      document.body.removeAttribute("data-scroll-lock");
      toggle.focus();
    }

    toggle.addEventListener("click", open);
    close.addEventListener("click", shut);

    links.forEach((a) => {
      a.addEventListener("click", shut);
    });

    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        shut();
      }
    });
  }

  /* ----------------------------------------------------------------
     TIMELINE SCROLL PROGRESS
  ---------------------------------------------------------------- */

  function setupTimelineRail() {
    const fill = document.getElementById("timelineFill");
    const playhead = document.getElementById("timelinePlayhead");

    let ticking = false;

    function update() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollable = doc.scrollHeight - doc.clientHeight;

      const pct =
        scrollable > 0
          ? Math.min(100, (scrollTop / scrollable) * 100)
          : 0;

      fill.style.width = pct + "%";
      playhead.style.left = pct + "%";

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }

  /* ----------------------------------------------------------------
     HERO 3D TIKTOK PARTICLE FIELD
  ---------------------------------------------------------------- */

  function setupHeroVisual() {
    const canvas = document.getElementById("heroCanvas");
    const visual = document.getElementById("heroVisual");

    if (!canvas || !visual) return;

    const context = canvas.getContext("2d");

    let pointerX = 0;
    let pointerY = 0;

    let targetPointerX = 0;
    let targetPointerY = 0;

    let frame = 0;

    /*
     * TikTok-inspired colors.
     */
    const CYAN = "#25F4EE";
    const PINK = "#FE2C55";
    const WHITE = "#F8F8F8";

    const particles = [];
    const orbitParticles = [];
    const backgroundParticles = [];

    /* --------------------------------------------------------------
       PARTICLE HELPERS
    -------------------------------------------------------------- */

    function addParticle(
      x,
      y,
      z,
      color,
      size = 2.2
    ) {
      particles.push({
        x,
        y,
        z,
        color,
        size,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.6 +
          Math.random() *
          0.8
      });
    }

    /* --------------------------------------------------------------
       BUILD TIKTOK-STYLE MUSIC NOTE
    -------------------------------------------------------------- */

    function buildTikTokLayer(
      offsetX,
      offsetY,
      z,
      color
    ) {
      /*
       * Main vertical stem.
       */
      for (let i = 0; i <= 24; i += 1) {
        const t = i / 24;

        addParticle(
          0.14 + offsetX,
          -0.64 +
            t * 0.89 +
            offsetY,
          z,
          color,
          2.2
        );
      }

      /*
       * Second stem row.
       * Gives the note thickness.
       */
      for (let i = 0; i <= 21; i += 1) {
        const t = i / 21;

        addParticle(
          0.085 + offsetX,
          -0.59 +
            t * 0.82 +
            offsetY,
          z + 0.025,
          color,
          1.85
        );
      }

      /*
       * Inner stem particles.
       */
      for (let i = 0; i <= 18; i += 1) {
        const t = i / 18;

        addParticle(
          0.115 + offsetX,
          -0.58 +
            t * 0.77 +
            offsetY,
          z + 0.045,
          color,
          1.5
        );
      }

      /*
       * Top musical arm.
       */
      for (let i = 0; i <= 15; i += 1) {
        const t = i / 15;

        addParticle(
          0.14 +
            t * 0.4 +
            offsetX,

          -0.63 +
            t * 0.17 +
            offsetY,

          z,
          color,
          2.15
        );
      }

      /*
       * Second top arm.
       */
      for (let i = 0; i <= 13; i += 1) {
        const t = i / 13;

        addParticle(
          0.14 +
            t * 0.36 +
            offsetX,

          -0.56 +
            t * 0.15 +
            offsetY,

          z + 0.025,
          color,
          1.85
        );
      }

      /*
       * Small downward tip on the right.
       */
      for (let i = 0; i <= 7; i += 1) {
        const t = i / 7;

        addParticle(
          0.5 +
            offsetX,

          -0.46 +
            t * 0.14 +
            offsetY,

          z,
          color,
          1.8
        );
      }

      /*
       * Bottom circular note.
       */
      const centerX =
        -0.075 +
        offsetX;

      const centerY =
        0.27 +
        offsetY;

      for (let ring = 0; ring < 4; ring += 1) {
        const radius =
          0.19 -
          ring * 0.037;

        const count =
          21 -
          ring * 3;

        for (let i = 0; i < count; i += 1) {
          const angle =
            (i / count) *
            Math.PI *
            2;

          addParticle(
            centerX +
              Math.cos(angle) *
                radius,

            centerY +
              Math.sin(angle) *
                radius,

            z +
              ring * 0.022,

            color,

            1.9
          );
        }
      }

      /*
       * Connect the circular note to the stem.
       */
      for (let i = 0; i <= 10; i += 1) {
        const t = i / 10;

        addParticle(
          -0.005 +
            t * 0.15 +
            offsetX,

          0.15 -
            t * 0.13 +
            offsetY,

          z,

          color,

          1.75
        );
      }
    }

    /*
     * Cyan shadow.
     */
    buildTikTokLayer(
      -0.055,
      0.025,
      -0.11,
      CYAN
    );

    /*
     * Pink/red shadow.
     */
    buildTikTokLayer(
      0.055,
      -0.025,
      -0.05,
      PINK
    );

    /*
     * Main center layer.
     */
    buildTikTokLayer(
      0,
      0,
      0.08,
      WHITE
    );

    /*
     * Additional depth layers.
     * These become visible when the user
     * moves their cursor.
     */
    buildTikTokLayer(
      0,
      0,
      -0.2,
      "rgba(37,244,238,0.36)"
    );

    buildTikTokLayer(
      0,
      0,
      0.21,
      "rgba(254,44,85,0.35)"
    );

    /* --------------------------------------------------------------
       ORBITING PARTICLES
    -------------------------------------------------------------- */

    for (let i = 0; i < 34; i += 1) {
      orbitParticles.push({
        angle:
          (i / 34) *
          Math.PI *
          2,

        radius:
          0.73 +
          Math.random() *
          0.22,

        z:
          -0.45 +
          Math.random() *
          0.9,

        speed:
          0.22 +
          Math.random() *
          0.3,

        size:
          0.8 +
          Math.random() *
          1.3,

        color:
          i % 3 === 0
            ? CYAN
            : i % 3 === 1
              ? PINK
              : "rgba(255,255,255,0.65)"
      });
    }

    /* --------------------------------------------------------------
       BACKGROUND PARTICLES
    -------------------------------------------------------------- */

    for (let i = 0; i < 42; i += 1) {
      backgroundParticles.push({
        x:
          Math.random() *
            2 -
          1,

        y:
          Math.random() *
            1.7 -
          0.85,

        z:
          -1 +
          Math.random() *
            1.3,

        size:
          0.5 +
          Math.random() *
            1.2,

        phase:
          Math.random() *
          Math.PI *
          2,

        color:
          i % 4 === 0
            ? CYAN
            : i % 4 === 1
              ? PINK
              : "rgba(82,104,102,0.45)"
      });
    }

    /* --------------------------------------------------------------
       RESIZE CANVAS
    -------------------------------------------------------------- */

    function resize() {
      const scale =
        window.devicePixelRatio ||
        1;

      canvas.width =
        canvas.clientWidth *
        scale;

      canvas.height =
        canvas.clientHeight *
        scale;

      context.setTransform(
        scale,
        0,
        0,
        scale,
        0,
        0
      );
    }

    /* --------------------------------------------------------------
       3D PROJECTION
    -------------------------------------------------------------- */

    function projectPoint(
      x,
      y,
      z,
      rotationX,
      rotationY,
      scale
    ) {
      /*
       * Y-axis rotation.
       */
      const x1 =
        x *
          Math.cos(rotationY) -
        z *
          Math.sin(rotationY);

      const z1 =
        x *
          Math.sin(rotationY) +
        z *
          Math.cos(rotationY);

      /*
       * X-axis rotation.
       */
      const y1 =
        y *
          Math.cos(rotationX) -
        z1 *
          Math.sin(rotationX);

      const z2 =
        y *
          Math.sin(rotationX) +
        z1 *
          Math.cos(rotationX);

      /*
       * Perspective projection.
       */
      const perspective =
        2.2 /
        (3.1 - z2);

      return {
        x:
          x1 *
          scale *
          perspective,

        y:
          y1 *
          scale *
          perspective,

        z: z2,

        perspective
      };
    }

    /* --------------------------------------------------------------
       DRAW ANIMATION
    -------------------------------------------------------------- */

    function draw() {
      const width =
        canvas.clientWidth;

      const height =
        canvas.clientHeight;

      context.clearRect(
        0,
        0,
        width,
        height
      );

      const time =
        frame *
        0.01;

      /*
       * Smooth mouse movement.
       */
      pointerX +=
        (targetPointerX -
          pointerX) *
        0.055;

      pointerY +=
        (targetPointerY -
          pointerY) *
        0.055;

      /*
       * Slow automatic rotation +
       * cursor-controlled rotation.
       */
      const rotationY =
        Math.sin(
          time *
            0.35
        ) *
          0.18 +
        pointerX *
          0.52;

      const rotationX =
        Math.cos(
          time *
            0.27
        ) *
          0.06 -
        pointerY *
          0.34;

      /*
       * Floating movement.
       */
      const floatY =
        Math.sin(
          time *
            0.8
        ) *
        7;

      const centerX =
        width / 2;

      const centerY =
        height / 2 +
        floatY;

      const iconScale =
        Math.min(
          width,
          height
        ) *
        0.48;

      /* ------------------------------------------------------------
         BACKGROUND GLOW
      ------------------------------------------------------------ */

      const glow =
        context.createRadialGradient(
          centerX,
          centerY,
          0,

          centerX,
          centerY,
          iconScale *
            1.15
        );

      glow.addColorStop(
        0,
        "rgba(37,244,238,0.075)"
      );

      glow.addColorStop(
        0.45,
        "rgba(254,44,85,0.04)"
      );

      glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      context.fillStyle =
        glow;

      context.beginPath();

      context.arc(
        centerX,
        centerY,
        iconScale *
          1.15,
        0,
        Math.PI *
          2
      );

      context.fill();

      /* ------------------------------------------------------------
         DISTANT BACKGROUND PARTICLES
      ------------------------------------------------------------ */

      backgroundParticles.forEach(
        (particle) => {
          const driftX =
            Math.sin(
              time *
                0.25 +
                particle.phase
            ) *
            0.025;

          const driftY =
            Math.cos(
              time *
                0.2 +
                particle.phase
            ) *
            0.025;

          const projected =
            projectPoint(
              particle.x +
                driftX,

              particle.y +
                driftY,

              particle.z,

              rotationX *
                0.3,

              rotationY *
                0.3,

              iconScale *
                1.25
            );

          context.globalAlpha =
            0.15 +
            Math.max(
              0,
              projected.z
            ) *
              0.12;

          context.fillStyle =
            particle.color;

          context.beginPath();

          context.arc(
            centerX +
              projected.x,

            centerY +
              projected.y,

            particle.size *
              projected.perspective,

            0,

            Math.PI *
              2
          );

          context.fill();
        }
      );

      context.globalAlpha = 1;

      /* ------------------------------------------------------------
         ORBIT PARTICLES
      ------------------------------------------------------------ */

      orbitParticles.forEach(
        (particle) => {
          const orbitTime =
            time *
              particle.speed +
            particle.angle;

          const x =
            Math.cos(
              orbitTime
            ) *
            particle.radius;

          const y =
            Math.sin(
              orbitTime
            ) *
            particle.radius *
            0.48;

          const z =
            particle.z +
            Math.sin(
              orbitTime *
                1.7
            ) *
              0.12;

          const projected =
            projectPoint(
              x,
              y,
              z,
              rotationX,
              rotationY,
              iconScale
            );

          const alpha =
            0.2 +
            Math.max(
              0,
              projected.z
            ) *
              0.25;

          context.globalAlpha =
            Math.min(
              0.8,
              alpha
            );

          context.fillStyle =
            particle.color;

          context.beginPath();

          context.arc(
            centerX +
              projected.x,

            centerY +
              projected.y,

            particle.size *
              projected.perspective,

            0,

            Math.PI *
              2
          );

          context.fill();
        }
      );

      context.globalAlpha = 1;

      /* ------------------------------------------------------------
         MAIN TIKTOK PARTICLES
      ------------------------------------------------------------ */

      const projectedParticles =
        particles.map(
          (particle) => {
            /*
             * Tiny movement prevents
             * the dots from looking frozen.
             */
            const microX =
              Math.sin(
                time *
                  particle.speed +
                  particle.phase
              ) *
              0.004;

            const microY =
              Math.cos(
                time *
                  particle.speed *
                  0.8 +
                  particle.phase
              ) *
              0.004;

            const result =
              projectPoint(
                particle.x +
                  microX,

                particle.y +
                  microY,

                particle.z,

                rotationX,
                rotationY,
                iconScale
              );

            return {
              ...result,
              color:
                particle.color,
              size:
                particle.size
            };
          }
        );

      /*
       * Draw distant particles first.
       */
      projectedParticles.sort(
        (a, b) =>
          a.z - b.z
      );

      projectedParticles.forEach(
        (particle) => {
          const depthBrightness =
            0.62 +
            Math.max(
              0,
              particle.z
            ) *
              0.38;

          context.globalAlpha =
            Math.min(
              1,
              depthBrightness
            );

          /*
           * Small glow makes the
           * particles feel luminous.
           */
          context.shadowBlur = 8;

          context.shadowColor =
            particle.color;

          context.fillStyle =
            particle.color;

          context.beginPath();

          context.arc(
            centerX +
              particle.x,

            centerY +
              particle.y,

            particle.size *
              particle.perspective *
              1.25,

            0,

            Math.PI *
              2
          );

          context.fill();
        }
      );

      context.shadowBlur = 0;
      context.globalAlpha = 1;

      /* ------------------------------------------------------------
         UI LABELS
      ------------------------------------------------------------ */

      context.fillStyle =
        "rgba(23,44,43,0.55)";

      context.font =
        "10px IBM Plex Mono, monospace";

      context.fillText(
        "SOCIAL / PARTICLE FIELD 001",
        30,
        34
      );

      context.fillStyle =
        "rgba(82,104,102,0.75)";

      context.fillText(
        "SHORT-FORM  /  SOCIAL  /  CREATIVE",
        30,
        height - 25
      );

      frame += 1;

      if (
        !prefersReducedMotion
      ) {
        window.requestAnimationFrame(
          draw
        );
      }
    }

    /* --------------------------------------------------------------
       POINTER / HOVER
    -------------------------------------------------------------- */

    visual.addEventListener(
      "pointermove",
      (event) => {
        const bounds =
          visual.getBoundingClientRect();

        targetPointerX =
          ((event.clientX -
            bounds.left) /
            bounds.width -
            0.5) *
          2;

        targetPointerY =
          ((event.clientY -
            bounds.top) /
            bounds.height -
            0.5) *
          2;
      }
    );

    visual.addEventListener(
      "pointerleave",
      () => {
        targetPointerX = 0;
        targetPointerY = 0;
      }
    );

    window.addEventListener(
      "resize",
      resize
    );

    resize();
    draw();
  }

  /* ----------------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------------- */

  function setupReveal() {
    const targets =
      document.querySelectorAll(
        "[data-reveal]"
      );

    if (
      prefersReducedMotion ||
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      targets.forEach((t) =>
        t.classList.add(
          "is-visible"
        )
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "is-visible"
                );

                obs.unobserve(
                  entry.target
                );
              }
            }
          );
        },

        {
          threshold: 0.15,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );

    targets.forEach((t) =>
      observer.observe(t)
    );
  }

  /* ----------------------------------------------------------------
     HERO / AVAILABILITY / FOOTER TEXT
  ---------------------------------------------------------------- */

  function renderHero() {
    const d =
      SITE_DATA.hero;

    document.getElementById(
      "heroEyebrow"
    ).textContent =
      d.eyebrow;

    document.getElementById(
      "heroHeadline"
    ).textContent =
      d.headline;

    document.getElementById(
      "heroSub"
    ).textContent =
      d.sub;

    document.getElementById(
      "heroRole"
    ).textContent =
      SITE_DATA.person.roleLabel;

    const primary =
      document.getElementById(
        "heroPrimary"
      );

    primary.textContent =
      d.primaryCta.label;

    primary.href =
      d.primaryCta.href;

    const secondary =
      document.getElementById(
        "heroSecondary"
      );

    secondary.textContent =
      d.secondaryCta.label;

    secondary.href =
      d.secondaryCta.href;
  }

  function renderAvailability() {
    const strip =
      document.getElementById(
        "availabilityStrip"
      );

    if (
      !SITE_DATA.availability.show
    ) {
      strip.style.display =
        "none";

      return;
    }

    document.getElementById(
      "availabilityText"
    ).textContent =
      SITE_DATA.availability.text;
  }

  function renderMetrics() {
    if (
      !SITE_DATA.metrics.show
    ) {
      return;
    }

    const section =
      document.getElementById(
        "metricsSection"
      );

    const grid =
      document.getElementById(
        "metricsGrid"
      );

    SITE_DATA.metrics.items.forEach(
      (m) => {
        if (!m.value) return;

        const item = el(
          "div",
          "metric"
        );

        item.innerHTML = `
          <span class="metric__value">${escapeHtml(
            m.value
          )}</span>
          <span class="metric__label">${escapeHtml(
            m.label
          )}</span>
        `;

        grid.appendChild(
          item
        );
      }
    );

    section.style.display =
      "";
  }

  /* ----------------------------------------------------------------
     PLACEHOLDER POSTER GENERATOR
  ---------------------------------------------------------------- */

  function posterSVG(project) {
    const vertical =
      project.orientation ===
      "vertical";

    const w =
      vertical
        ? 270
        : 480;

    const h =
      vertical
        ? 480
        : 270;

    const uid =
      "pg-" +
      project.id;

    return `
      <svg
        viewBox="0 0 ${w} ${h}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder poster for ${escapeHtml(
          project.title
        )}"
      >
        <defs>
          <linearGradient
            id="${uid}"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stop-color="#161c24"
            />

            <stop
              offset="100%"
              stop-color="#0d1117"
            />
          </linearGradient>

          <pattern
            id="${uid}-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0V24"
              fill="none"
              stroke="#1a222c"
              stroke-width="1"
            />
          </pattern>
        </defs>

        <rect
          width="${w}"
          height="${h}"
          fill="url(#${uid})"
        />

        <rect
          width="${w}"
          height="${h}"
          fill="url(#${uid}-grid)"
        />

        <circle
          cx="${w / 2}"
          cy="${h / 2 - 18}"
          r="30"
          fill="none"
          stroke="#5b9dff"
          stroke-width="1.4"
          opacity="0.9"
        />

        <path
          d="M${w / 2 - 8} ${
            h / 2 - 30
          }
             L${w / 2 + 14} ${
               h / 2 - 18
             }
             L${w / 2 - 8} ${
               h / 2 - 6
             } Z"
          fill="#5b9dff"
          opacity="0.9"
        />

        <rect
          x="${w / 2 - 60}"
          y="${h / 2 + 34}"
          width="120"
          height="3"
          fill="#223041"
        />

        <rect
          x="${w / 2 - 60}"
          y="${h / 2 + 34}"
          width="40"
          height="3"
          fill="#5b9dff"
        />
      </svg>
    `;
  }

  /* ----------------------------------------------------------------
     WORK / PROJECT CARDS
  ---------------------------------------------------------------- */

  function projectCard(project) {
    const card = el(
      "button",
      `project-card project-card--${project.orientation}`
    );

    card.type = "button";

    card.dataset.projectId =
      project.id;

    card.setAttribute(
      "aria-haspopup",
      "dialog"
    );

    const hasVideo =
      Boolean(
        project.videoSrc
      );

    const media = el(
      "div",
      "project-card__media"
    );

    if (hasVideo) {
      const video =
        document.createElement(
          "video"
        );

      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload =
        "metadata";

      const source =
        document.createElement(
          "source"
        );

      source.src =
        project.videoSrc;

      video.appendChild(
        source
      );

      media.appendChild(
        video
      );

      video
        .play()
        .catch(() => {});
    } else {
      media.innerHTML =
        posterSVG(project);
    }

    if (hasVideo) {
      const play = el(
        "div",
        "project-card__play",
        `
          <span
            class="project-card__play-icon"
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 2l10 6-10 6V2z"
                fill="#ece9e1"
              />
            </svg>
          </span>
        `
      );

      media.appendChild(
        play
      );
    }

    const body = el(
      "div",
      "project-card__body"
    );

    body.innerHTML = `
      <div class="project-card__title">
        ${escapeHtml(
          project.title
        )}
      </div>

      <div class="project-card__desc">
        ${escapeHtml(
          project.description
        )}
      </div>

      <span class="project-card__tag ${
        hasVideo
          ? ""
          : "project-card__tag--soon"
      }">
        ${
          hasVideo
            ? escapeHtml(
                project.category
              )
            : "Video coming soon"
        }
      </span>
    `;

    card.appendChild(
      media
    );

    card.appendChild(
      body
    );

    card.addEventListener(
      "click",
      () =>
        openVideoDialog(
          project
        )
    );

    return card;
  }

  function renderWork() {
    const shortGrid =
      document.getElementById(
        "shortFormGrid"
      );

    const longGrid =
      document.getElementById(
        "longFormGrid"
      );

    SITE_DATA.projects.forEach(
      (project) => {
        const card =
          projectCard(
            project
          );

        if (
          project.orientation ===
          "vertical"
        ) {
          shortGrid.appendChild(
            card
          );
        } else {
          longGrid.appendChild(
            card
          );
        }
      }
    );
  }

  /* ----------------------------------------------------------------
     VIDEO DIALOG
  ---------------------------------------------------------------- */

  let lastFocusedEl =
    null;

  function getFocusable(
    container
  ) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openVideoDialog(
    project
  ) {
    const dialog =
      document.getElementById(
        "videoDialog"
      );

    const mediaWrap =
      document.getElementById(
        "dialogMediaWrap"
      );

    const title =
      document.getElementById(
        "dialogTitle"
      );

    const desc =
      document.getElementById(
        "dialogDesc"
      );

    const meta =
      document.getElementById(
        "dialogMeta"
      );

    lastFocusedEl =
      document.activeElement;

    title.textContent =
      project.title;

    desc.textContent =
      project.description;

    meta.innerHTML = "";

    const metaFields = [
      ["Role", project.role],
      ["Tools", project.tools],
      [
        "Category",
        project.category
      ],
      [
        "Results",
        project.results
      ]
    ];

    metaFields.forEach(
      ([label, value]) => {
        if (!value) return;

        const span =
          el("span");

        span.innerHTML = `
          <strong>
            ${escapeHtml(
              label
            )}:
          </strong>

          ${escapeHtml(
            value
          )}
        `;

        meta.appendChild(
          span
        );
      }
    );

    mediaWrap.innerHTML =
      "";

    if (project.videoSrc) {
      const mediaBox = el(
        "div",
        `video-dialog__media video-dialog__media--${project.orientation}`
      );

      const video =
        document.createElement(
          "video"
        );

      video.controls = true;
      video.playsInline = true;
      video.preload = "none";
      video.poster =
        project.poster || "";

      const source =
        document.createElement(
          "source"
        );

      source.src =
        project.videoSrc;

      video.appendChild(
        source
      );

      if (
        project.captionsSrc
      ) {
        const track =
          document.createElement(
            "track"
          );

        track.kind =
          "captions";

        track.src =
          project.captionsSrc;

        track.default = true;

        video.appendChild(
          track
        );
      }

      video.addEventListener(
        "error",
        () => {
          mediaBox.innerHTML = `
            <div class="video-dialog__placeholder">
              <p>
                This video couldn&rsquo;t be loaded right now.
              </p>
            </div>
          `;
        }
      );

      mediaBox.appendChild(
        video
      );

      mediaWrap.appendChild(
        mediaBox
      );
    } else {
      const placeholder = el(
        "div",

        `video-dialog__placeholder ${
          project.orientation ===
          "vertical"
            ? "video-dialog__placeholder--vertical"
            : ""
        }`,

        `
          <div>
            ${posterSVG(
              project
            )}
          </div>

          <p style="margin-top:1rem;">
            Video coming soon — this project hasn&rsquo;t been added yet.
          </p>
        `
      );

      mediaWrap.appendChild(
        placeholder
      );
    }

    dialog.setAttribute(
      "data-open",
      "true"
    );

    document.body.setAttribute(
      "data-scroll-lock",
      "true"
    );

    const closeBtn =
      document.getElementById(
        "dialogClose"
      );

    closeBtn.focus();
  }

  function closeVideoDialog() {
    const dialog =
      document.getElementById(
        "videoDialog"
      );

    const mediaWrap =
      document.getElementById(
        "dialogMediaWrap"
      );

    const video =
      mediaWrap.querySelector(
        "video"
      );

    if (video) {
      video.pause();

      video.removeAttribute(
        "src"
      );

      video.load();
    }

    dialog.setAttribute(
      "data-open",
      "false"
    );

    document.body.removeAttribute(
      "data-scroll-lock"
    );

    if (lastFocusedEl) {
      lastFocusedEl.focus();
    }
  }

  function setupVideoDialog() {
    const dialog =
      document.getElementById(
        "videoDialog"
      );

    const backdrop =
      document.getElementById(
        "dialogBackdrop"
      );

    const closeBtn =
      document.getElementById(
        "dialogClose"
      );

    closeBtn.addEventListener(
      "click",
      closeVideoDialog
    );

    backdrop.addEventListener(
      "click",
      closeVideoDialog
    );

    dialog.addEventListener(
      "keydown",
      (e) => {
        if (
          dialog.getAttribute(
            "data-open"
          ) !== "true"
        ) {
          return;
        }

        if (
          e.key ===
          "Escape"
        ) {
          closeVideoDialog();
          return;
        }

        if (e.key === "Tab") {
          const focusable =
            getFocusable(
              dialog.querySelector(
                ".video-dialog__panel"
              )
            );

          if (
            focusable.length ===
            0
          ) {
            return;
          }

          const first =
            focusable[0];

          const last =
            focusable[
              focusable.length -
                1
            ];

          if (
            e.shiftKey &&
            document.activeElement ===
              first
          ) {
            e.preventDefault();
            last.focus();
          } else if (
            !e.shiftKey &&
            document.activeElement ===
              last
          ) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    );
  }

  /* ----------------------------------------------------------------
     SERVICES
  ---------------------------------------------------------------- */

  function renderServices() {
    const grid =
      document.getElementById(
        "servicesGrid"
      );

    SITE_DATA.services.forEach(
      (s) => {
        const item = el(
          "div",
          "service-item",

          `
            <h3>
              ${escapeHtml(
                s.title
              )}
            </h3>

            <p>
              ${escapeHtml(
                s.description
              )}
            </p>
          `
        );

        grid.appendChild(
          item
        );
      }
    );
  }

  /* ----------------------------------------------------------------
     ABOUT
  ---------------------------------------------------------------- */

  function renderAbout() {
    const a =
      SITE_DATA.about;

    document.getElementById(
      "aboutIntro"
    ).textContent =
      a.intro;

    const paraWrap =
      document.getElementById(
        "aboutParagraphs"
      );

    a.paragraphs.forEach(
      (p) => {
        const para = el(
          "p",
          null,
          escapeHtml(p)
        );

        para.style.marginTop =
          "1rem";

        paraWrap.appendChild(
          para
        );
      }
    );

    const strengthsList =
      document.getElementById(
        "strengthsList"
      );

    a.strengths.forEach(
      (s) => {
        const item = el(
          "div",
          "strength",

          `
            <h4>
              ${escapeHtml(
                s.title
              )}
            </h4>

            <p>
              ${escapeHtml(
                s.example
              )}
            </p>
          `
        );

        strengthsList.appendChild(
          item
        );
      }
    );

    const eduList =
      document.getElementById(
        "educationList"
      );

    a.education.forEach(
      (e) => {
        const li = el(
          "li",
          null,

          `
            <span>
              ${escapeHtml(
                e.name
              )}
            </span>

            ${
              e.note
                ? `
                  <span>
                    ${escapeHtml(
                      e.note
                    )}
                  </span>
                `
                : ""
            }
          `
        );

        eduList.appendChild(
          li
        );
      }
    );

    const langList =
      document.getElementById(
        "languagesList"
      );

    a.languages.forEach(
      (l) => {
        const li = el(
          "li",
          null,

          `
            <span>
              ${escapeHtml(
                l.name
              )}
            </span>

            <span>
              ${escapeHtml(
                l.level
              )}
            </span>
          `
        );

        langList.appendChild(
          li
        );
      }
    );

    document.getElementById(
      "languageNote"
    ).textContent =
      a.languageNote;
  }

  /* ----------------------------------------------------------------
     SKILLS
  ---------------------------------------------------------------- */

  function renderSkills() {
    const wrap =
      document.getElementById(
        "skillsGroups"
      );

    SITE_DATA.skillGroups.forEach(
      (group) => {
        const g = el(
          "div",
          "skill-group"
        );

        const heading = el(
          "h3",
          null,
          escapeHtml(
            group.title
          )
        );

        const list =
          el("ul");

        group.items.forEach(
          (item) => {
            list.appendChild(
              el(
                "li",
                null,
                escapeHtml(
                  item
                )
              )
            );
          }
        );

        g.appendChild(
          heading
        );

        g.appendChild(
          list
        );

        wrap.appendChild(
          g
        );
      }
    );
  }

  /* ----------------------------------------------------------------
     PROCESS
  ---------------------------------------------------------------- */

  function renderProcess() {
    const p =
      SITE_DATA.process;

    document.getElementById(
      "processIntro"
    ).textContent =
      p.intro;

    const line =
      document.getElementById(
        "processLine"
      );

    p.steps.forEach(
      (step, i) => {
        const code =
          String(
            i + 1
          ).padStart(
            2,
            "0"
          ) +
          ":00";

        const item = el(
          "div",
          "process-step",

          `
            <span class="process-step__code">
              ${code}
            </span>

            <h4>
              ${escapeHtml(
                step.title
              )}
            </h4>

            <p>
              ${escapeHtml(
                step.description
              )}
            </p>
          `
        );

        line.appendChild(
          item
        );
      }
    );

    document.getElementById(
      "processGoal"
    ).textContent =
      p.goal;
  }

  /* ----------------------------------------------------------------
     CONCEPT
  ---------------------------------------------------------------- */

  function renderConcept() {
    const c =
      SITE_DATA.concept;

    document.getElementById(
      "conceptHeading"
    ).textContent =
      c.heading;

    document.getElementById(
      "conceptLabel"
    ).textContent =
      c.label;

    document.getElementById(
      "conceptTitle"
    ).textContent =
      c.title;

    document.getElementById(
      "conceptDesc"
    ).textContent =
      c.description;

    document.getElementById(
      "conceptDisclaimer"
    ).textContent =
      c.disclaimer;

    const breakdown =
      document.getElementById(
        "conceptBreakdown"
      );

    c.breakdown.forEach(
      (b) => {
        const dt = el(
          "dt",
          null,
          escapeHtml(
            b.label
          )
        );

        const dd = el(
          "dd",
          null,
          escapeHtml(
            b.value
          )
        );

        breakdown.appendChild(
          dt
        );

        breakdown.appendChild(
          dd
        );
      }
    );
  }

  /* ----------------------------------------------------------------
     CONTACT
  ---------------------------------------------------------------- */

  function renderContact() {
    const c =
      SITE_DATA.contact;

    const p =
      SITE_DATA.person;

    document.getElementById(
      "contactHeading"
    ).textContent =
      c.heading;

    document.getElementById(
      "contactSub"
    ).textContent =
      c.sub;

    const emailLink =
      document.getElementById(
        "contactEmailLink"
      );

    emailLink.textContent =
      p.email;

    emailLink.href =
      "mailto:" +
      p.email;

    const phoneLink =
      document.getElementById(
        "contactPhoneLink"
      );

    phoneLink.textContent =
      p.phoneDisplay;

    phoneLink.href =
      p.phoneHref;

    const tiktokLink =
      document.getElementById(
        "contactTikTokLink"
      );

    tiktokLink.href =
      SITE_DATA.links.tiktok.url;

    const copyBtn =
      document.getElementById(
        "copyEmailBtn"
      );

    const feedback =
      document.getElementById(
        "copyFeedback"
      );

    copyBtn.addEventListener(
      "click",
      async () => {
        try {
          await navigator.clipboard.writeText(
            p.email
          );

          feedback.textContent =
            "Email copied to clipboard.";
        } catch (err) {
          feedback.textContent =
            "Couldn’t copy automatically — please copy the address above.";
        }

        window.clearTimeout(
          copyBtn._t
        );

        copyBtn._t =
          window.setTimeout(
            () => {
              feedback.textContent =
                "";
            },
            4000
          );
      }
    );
  }

  /* ----------------------------------------------------------------
     FOOTER
  ---------------------------------------------------------------- */

  function renderFooter() {
    document.getElementById(
      "footerNote"
    ).textContent =
      SITE_DATA.footer.note;

    const linksWrap =
      document.getElementById(
        "footerLinks"
      );

    const candidates =
      [];

    if (
      SITE_DATA.links
        .resumeUrl
    ) {
      candidates.push({
        label: "Resume",
        href:
          SITE_DATA.links
            .resumeUrl
      });
    }

    if (
      SITE_DATA.links.github
    ) {
      candidates.push({
        label: "GitHub",
        href:
          SITE_DATA.links.github
      });
    }

    if (
      SITE_DATA.links
        .futureWave.url
    ) {
      candidates.push({
        label:
          SITE_DATA.links
            .futureWave.name,

        href:
          SITE_DATA.links
            .futureWave.url
      });
    }

    if (
      SITE_DATA.links.tiktok
        .url
    ) {
      candidates.push({
        label:
          SITE_DATA.links
            .tiktok.name,

        href:
          SITE_DATA.links
            .tiktok.url,

        icon: `
          <svg
            class="footer-link__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M15.5 4.2c.4 2.2 1.6 3.5 3.8 3.7v3a8.2 8.2 0 0 1-3.8-1.1v5.5a5.5 5.5 0 1 1-4.7-5.4v3.1a2.5 2.5 0 1 0 1.7 2.3V4.2h3z"
              fill="currentColor"
            />
          </svg>
        `
      });
    }

    if (
      SITE_DATA.links.skylah
        .url
    ) {
      candidates.push({
        label:
          SITE_DATA.links
            .skylah.name,

        href:
          SITE_DATA.links
            .skylah.url
      });
    }

    candidates.forEach(
      (c) => {
        const a = el(
          "a",

          c.icon
            ? "footer-link footer-link--icon"
            : "footer-link",

          c.icon
            ? `
              ${c.icon}
              <span>
                ${escapeHtml(
                  c.label
                )}
              </span>
            `
            : escapeHtml(
                c.label
              )
        );

        a.href = c.href;

        a.target =
          "_blank";

        a.rel =
          "noopener noreferrer";

        if (c.icon) {
          a.setAttribute(
            "aria-label",
            `${c.label}: ${c.href}`
          );
        }

        linksWrap.appendChild(
          a
        );
      }
    );
  }

  /* ----------------------------------------------------------------
     INIT
  ---------------------------------------------------------------- */

  function init() {
    renderNav();

    renderHero();

    renderAvailability();

    renderWork();

    renderMetrics();

    renderServices();

    renderAbout();

    renderSkills();

    renderProcess();

    renderConcept();

    renderContact();

    renderFooter();

    setupMobileMenu();

    setupTimelineRail();

    setupHeroVisual();

    setupReveal();

    setupVideoDialog();
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }
})();