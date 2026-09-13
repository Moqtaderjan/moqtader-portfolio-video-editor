/**
 * MAIN.JS
 * Renders SITE_DATA into the page and wires up all interactions:
 * nav + mobile menu, scroll "playhead" progress, scroll reveals,
 * pointer-responsive hero visual, project grid + accessible video
 * dialog, and the copy-email button.
 *
 * No build step required — this is plain ES2017+ JavaScript.
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ----------------------------------------------------------------
     Small helpers
  ---------------------------------------------------------------- */
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
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
    links.forEach((a) => a.addEventListener("click", shut));
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") shut();
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
      const pct = scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0;
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
     SCROLL REVEAL
  ---------------------------------------------------------------- */
  function setupReveal() {
    const targets = document.querySelectorAll("[data-reveal]");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => observer.observe(t));
  }

  /* ----------------------------------------------------------------
     HERO / AVAILABILITY / FOOTER TEXT
  ---------------------------------------------------------------- */
  function renderHero() {
    const d = SITE_DATA.hero;
    document.getElementById("heroEyebrow").textContent = d.eyebrow;
    document.getElementById("heroHeadline").textContent = d.headline;
    document.getElementById("heroSub").textContent = d.sub;
    document.getElementById("heroRole").textContent = SITE_DATA.person.roleLabel;

    const primary = document.getElementById("heroPrimary");
    primary.textContent = d.primaryCta.label;
    primary.href = d.primaryCta.href;

    const secondary = document.getElementById("heroSecondary");
    secondary.textContent = d.secondaryCta.label;
    secondary.href = d.secondaryCta.href;
  }

  function renderAvailability() {
    const strip = document.getElementById("availabilityStrip");
    if (!SITE_DATA.availability.show) {
      strip.style.display = "none";
      return;
    }
    document.getElementById("availabilityText").textContent = SITE_DATA.availability.text;
  }

  function renderMetrics() {
    if (!SITE_DATA.metrics.show) return;
    const section = document.getElementById("metricsSection");
    const grid = document.getElementById("metricsGrid");
    SITE_DATA.metrics.items.forEach((m) => {
      if (!m.value) return;
      const item = el("div", "metric");
      item.innerHTML = `<span class="metric__value">${escapeHtml(m.value)}</span><span class="metric__label">${escapeHtml(m.label)}</span>`;
      grid.appendChild(item);
    });
    section.style.display = "";
  }

  /* ----------------------------------------------------------------
     PLACEHOLDER POSTER GENERATOR
     Produces a deliberately designed "coming soon" poster as inline SVG.
  ---------------------------------------------------------------- */
  function posterSVG(project) {
    const vertical = project.orientation === "vertical";
    const w = vertical ? 270 : 480;
    const h = vertical ? 480 : 270;
    const uid = "pg-" + project.id;
    return `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder poster for ${escapeHtml(project.title)}">
        <defs>
          <linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#161c24"/>
            <stop offset="100%" stop-color="#0d1117"/>
          </linearGradient>
          <pattern id="${uid}-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#1a222c" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#${uid})"/>
        <rect width="${w}" height="${h}" fill="url(#${uid}-grid)"/>
        <circle cx="${w / 2}" cy="${h / 2 - 18}" r="30" fill="none" stroke="#5b9dff" stroke-width="1.4" opacity="0.9"/>
        <path d="M${w / 2 - 8} ${h / 2 - 30} L${w / 2 + 14} ${h / 2 - 18} L${w / 2 - 8} ${h / 2 - 6} Z" fill="#5b9dff" opacity="0.9"/>
        <rect x="${w / 2 - 60}" y="${h / 2 + 34}" width="120" height="3" fill="#223041"/>
        <rect x="${w / 2 - 60}" y="${h / 2 + 34}" width="40" height="3" fill="#5b9dff"/>
      </svg>`;
  }

  /* ----------------------------------------------------------------
     WORK / PROJECT CARDS
  ---------------------------------------------------------------- */
  function projectCard(project) {
    const card = el("button", `project-card project-card--${project.orientation}`);
    card.type = "button";
    card.dataset.projectId = project.id;
    card.setAttribute("aria-haspopup", "dialog");

    const hasVideo = Boolean(project.videoSrc);
    const media = el("div", "project-card__media");

    if (hasVideo) {
      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      const source = document.createElement("source");
      source.src = project.videoSrc;
      video.appendChild(source);
      media.appendChild(video);
      video.play().catch(() => {});
    } else {
      media.innerHTML = posterSVG(project);
    }

    if (hasVideo) {
      const play = el(
        "div",
        "project-card__play",
        `<span class="project-card__play-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 2l10 6-10 6V2z" fill="#ece9e1"/></svg>
        </span>`
      );
      media.appendChild(play);
    }

    const body = el("div", "project-card__body");
    body.innerHTML = `
      <div class="project-card__title">${escapeHtml(project.title)}</div>
      <div class="project-card__desc">${escapeHtml(project.description)}</div>
      <span class="project-card__tag ${hasVideo ? "" : "project-card__tag--soon"}">${hasVideo ? escapeHtml(project.category) : "Video coming soon"}</span>
    `;

    card.appendChild(media);
    card.appendChild(body);

    card.addEventListener("click", () => openVideoDialog(project));

    return card;
  }

  function renderWork() {
    const shortGrid = document.getElementById("shortFormGrid");
    const longGrid = document.getElementById("longFormGrid");
    SITE_DATA.projects.forEach((project) => {
      const card = projectCard(project);
      if (project.orientation === "vertical") {
        shortGrid.appendChild(card);
      } else {
        longGrid.appendChild(card);
      }
    });
  }

  /* ----------------------------------------------------------------
     VIDEO DIALOG (accessible)
  ---------------------------------------------------------------- */
  let lastFocusedEl = null;

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openVideoDialog(project) {
    const dialog = document.getElementById("videoDialog");
    const mediaWrap = document.getElementById("dialogMediaWrap");
    const title = document.getElementById("dialogTitle");
    const desc = document.getElementById("dialogDesc");
    const meta = document.getElementById("dialogMeta");

    lastFocusedEl = document.activeElement;

    title.textContent = project.title;
    desc.textContent = project.description;

    meta.innerHTML = "";
    const metaFields = [
      ["Role", project.role],
      ["Tools", project.tools],
      ["Category", project.category],
      ["Results", project.results],
    ];
    metaFields.forEach(([label, value]) => {
      if (!value) return;
      const span = el("span");
      span.innerHTML = `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}`;
      meta.appendChild(span);
    });

    mediaWrap.innerHTML = "";

    if (project.videoSrc) {
      const mediaBox = el("div", `video-dialog__media video-dialog__media--${project.orientation}`);
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "none";
      video.poster = project.poster || "";
      const source = document.createElement("source");
      source.src = project.videoSrc;
      video.appendChild(source);
      if (project.captionsSrc) {
        const track = document.createElement("track");
        track.kind = "captions";
        track.src = project.captionsSrc;
        track.default = true;
        video.appendChild(track);
      }
      video.addEventListener("error", () => {
        mediaBox.innerHTML = `<div class="video-dialog__placeholder">
          <p>This video couldn&rsquo;t be loaded right now.</p>
        </div>`;
      });
      mediaBox.appendChild(video);
      mediaWrap.appendChild(mediaBox);
    } else {
      const placeholder = el(
        "div",
        `video-dialog__placeholder ${project.orientation === "vertical" ? "video-dialog__placeholder--vertical" : ""}`,
        `<div>${posterSVG(project)}</div>
         <p style="margin-top:1rem;">Video coming soon — this project hasn&rsquo;t been added yet.</p>`
      );
      mediaWrap.appendChild(placeholder);
    }

    dialog.setAttribute("data-open", "true");
    document.body.setAttribute("data-scroll-lock", "true");

    const closeBtn = document.getElementById("dialogClose");
    closeBtn.focus();
  }

  function closeVideoDialog() {
    const dialog = document.getElementById("videoDialog");
    const mediaWrap = document.getElementById("dialogMediaWrap");
    const video = mediaWrap.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    dialog.setAttribute("data-open", "false");
    document.body.removeAttribute("data-scroll-lock");
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function setupVideoDialog() {
    const dialog = document.getElementById("videoDialog");
    const backdrop = document.getElementById("dialogBackdrop");
    const closeBtn = document.getElementById("dialogClose");

    closeBtn.addEventListener("click", closeVideoDialog);
    backdrop.addEventListener("click", closeVideoDialog);

    dialog.addEventListener("keydown", (e) => {
      if (dialog.getAttribute("data-open") !== "true") return;
      if (e.key === "Escape") {
        closeVideoDialog();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable(dialog.querySelector(".video-dialog__panel"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ----------------------------------------------------------------
     SERVICES
  ---------------------------------------------------------------- */
  function renderServices() {
    const grid = document.getElementById("servicesGrid");
    SITE_DATA.services.forEach((s) => {
      const item = el(
        "div",
        "service-item",
        `<h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p>`
      );
      grid.appendChild(item);
    });
  }

  /* ----------------------------------------------------------------
     ABOUT
  ---------------------------------------------------------------- */
  function renderAbout() {
    const a = SITE_DATA.about;
    document.getElementById("aboutIntro").textContent = a.intro;

    const paraWrap = document.getElementById("aboutParagraphs");
    a.paragraphs.forEach((p) => {
      const para = el("p", null, escapeHtml(p));
      para.style.marginTop = "1rem";
      paraWrap.appendChild(para);
    });

    const strengthsList = document.getElementById("strengthsList");
    a.strengths.forEach((s) => {
      const item = el(
        "div",
        "strength",
        `<h4>${escapeHtml(s.title)}</h4><p>${escapeHtml(s.example)}</p>`
      );
      strengthsList.appendChild(item);
    });

    const eduList = document.getElementById("educationList");
    a.education.forEach((e) => {
      const li = el(
        "li",
        null,
        `<span>${escapeHtml(e.name)}</span>${e.note ? `<span>${escapeHtml(e.note)}</span>` : ""}`
      );
      eduList.appendChild(li);
    });

    const langList = document.getElementById("languagesList");
    a.languages.forEach((l) => {
      const li = el(
        "li",
        null,
        `<span>${escapeHtml(l.name)}</span><span>${escapeHtml(l.level)}</span>`
      );
      langList.appendChild(li);
    });
    document.getElementById("languageNote").textContent = a.languageNote;
  }

  /* ----------------------------------------------------------------
     SKILLS
  ---------------------------------------------------------------- */
  function renderSkills() {
    const wrap = document.getElementById("skillsGroups");
    SITE_DATA.skillGroups.forEach((group) => {
      const g = el("div", "skill-group");
      const heading = el("h3", null, escapeHtml(group.title));
      const list = el("ul");
      group.items.forEach((item) => {
        list.appendChild(el("li", null, escapeHtml(item)));
      });
      g.appendChild(heading);
      g.appendChild(list);
      wrap.appendChild(g);
    });
  }

  /* ----------------------------------------------------------------
     PROCESS
  ---------------------------------------------------------------- */
  function renderProcess() {
    const p = SITE_DATA.process;
    document.getElementById("processIntro").textContent = p.intro;
    const line = document.getElementById("processLine");
    p.steps.forEach((step, i) => {
      const code = String(i + 1).padStart(2, "0") + ":00";
      const item = el(
        "div",
        "process-step",
        `<span class="process-step__code">${code}</span><h4>${escapeHtml(step.title)}</h4><p>${escapeHtml(step.description)}</p>`
      );
      line.appendChild(item);
    });
    document.getElementById("processGoal").textContent = p.goal;
  }

  /* ----------------------------------------------------------------
     CONCEPT
  ---------------------------------------------------------------- */
  function renderConcept() {
    const c = SITE_DATA.concept;
    document.getElementById("conceptHeading").textContent = c.heading;
    document.getElementById("conceptLabel").textContent = c.label;
    document.getElementById("conceptTitle").textContent = c.title;
    document.getElementById("conceptDesc").textContent = c.description;
    document.getElementById("conceptDisclaimer").textContent = c.disclaimer;

    const breakdown = document.getElementById("conceptBreakdown");
    c.breakdown.forEach((b) => {
      const dt = el("dt", null, escapeHtml(b.label));
      const dd = el("dd", null, escapeHtml(b.value));
      breakdown.appendChild(dt);
      breakdown.appendChild(dd);
    });
  }

  /* ----------------------------------------------------------------
     CONTACT
  ---------------------------------------------------------------- */
  function renderContact() {
    const c = SITE_DATA.contact;
    const p = SITE_DATA.person;
    document.getElementById("contactHeading").textContent = c.heading;
    document.getElementById("contactSub").textContent = c.sub;

    const emailLink = document.getElementById("contactEmailLink");
    emailLink.textContent = p.email;
    emailLink.href = "mailto:" + p.email;

    const phoneLink = document.getElementById("contactPhoneLink");
    phoneLink.textContent = p.phoneDisplay;
    phoneLink.href = p.phoneHref;

    const tiktokLink = document.getElementById("contactTikTokLink");
    tiktokLink.href = SITE_DATA.links.tiktok.url;

    const copyBtn = document.getElementById("copyEmailBtn");
    const feedback = document.getElementById("copyFeedback");
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(p.email);
        feedback.textContent = "Email copied to clipboard.";
      } catch (err) {
        feedback.textContent = "Couldn\u2019t copy automatically — please copy the address above.";
      }
      window.clearTimeout(copyBtn._t);
      copyBtn._t = window.setTimeout(() => {
        feedback.textContent = "";
      }, 4000);
    });
  }

  /* ----------------------------------------------------------------
     FOOTER (editable links — hidden automatically when blank)
  ---------------------------------------------------------------- */
  function renderFooter() {
    document.getElementById("footerNote").textContent = SITE_DATA.footer.note;
    const linksWrap = document.getElementById("footerLinks");
    const candidates = [];

    if (SITE_DATA.links.resumeUrl) {
      candidates.push({ label: "Resume", href: SITE_DATA.links.resumeUrl });
    }
    if (SITE_DATA.links.github) {
      candidates.push({ label: "GitHub", href: SITE_DATA.links.github });
    }
    if (SITE_DATA.links.futureWave.url) {
      candidates.push({ label: SITE_DATA.links.futureWave.name, href: SITE_DATA.links.futureWave.url });
    }
    if (SITE_DATA.links.tiktok.url) {
      candidates.push({
        label: SITE_DATA.links.tiktok.name,
        href: SITE_DATA.links.tiktok.url,
        icon: `<svg class="footer-link__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 4.2c.4 2.2 1.6 3.5 3.8 3.7v3a8.2 8.2 0 0 1-3.8-1.1v5.5a5.5 5.5 0 1 1-4.7-5.4v3.1a2.5 2.5 0 1 0 1.7 2.3V4.2h3z" fill="currentColor"/></svg>`,
      });
    }
    if (SITE_DATA.links.skylah.url) {
      candidates.push({ label: SITE_DATA.links.skylah.name, href: SITE_DATA.links.skylah.url });
    }

    candidates.forEach((c) => {
      const a = el("a", c.icon ? "footer-link footer-link--icon" : "footer-link", c.icon ? `${c.icon}<span>${escapeHtml(c.label)}</span>` : escapeHtml(c.label));
      a.href = c.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      if (c.icon) a.setAttribute("aria-label", `${c.label}: ${c.href}`);
      linksWrap.appendChild(a);
    });
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
    setupReveal();
    setupVideoDialog();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
