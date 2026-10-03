(function () {
  "use strict";

  const D = SITE_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? "").replace(/[&<>\"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
  }[char]));
  const setText = (id, value) => { if ($(id)) $(id).textContent = value ?? ""; };
  const setHTML = (id, value) => { if ($(id)) $(id).innerHTML = value; };

  const navHTML = D.nav.map((item) => `<li><a href="${esc(item.href)}">${esc(item.label)}</a></li>`).join("");
  setHTML("navList", navHTML);
  setHTML("mobileNavList", navHTML);

  setText("heroEyebrow", D.hero.eyebrow);
  setText("heroHeadline", D.hero.headline);
  setText("heroSub", D.hero.sub);
  setText("heroRole", D.person.roleLabel);
  [["heroPrimary", D.hero.primaryCta], ["heroSecondary", D.hero.secondaryCta]].forEach(([id, cta]) => {
    setText(id, cta.label);
    $(id).href = cta.href;
  });

  if (D.availability.show) setText("availabilityText", D.availability.text);
  else $("availabilityStrip").hidden = true;

  const cardHTML = (project) => {
    const media = project.videoSrc
      ? `<video muted loop playsinline preload="metadata" src="${esc(project.videoSrc)}#t=0.5"></video><span class="work-card__play" aria-hidden="true">Play</span>`
      : `<div class="work-card__soon">Video coming soon</div>`;
    return `<button class="work-card" type="button" data-project="${esc(project.id)}"><div class="work-card__media">${media}</div><div class="work-card__body"><h3>${esc(project.title)}</h3><p>${esc(project.description)}</p><span class="tag">${esc(project.category)}</span></div></button>`;
  };

  const renderGrid = (id, projects) => {
    setHTML(id, projects.map(cardHTML).join(""));
    $(id).querySelectorAll(".work-card").forEach((card) => {
      const project = D.projects.find((item) => item.id === card.dataset.project);
      card.addEventListener("click", () => openDialog(project));
      const video = card.querySelector("video");
      if (video) {
        card.addEventListener("mouseenter", () => video.play().catch(() => {}));
        card.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0.5; });
      }
    });
  };
  renderGrid("shortFormGrid", D.projects.filter((project) => project.orientation === "vertical"));
  renderGrid("longFormGrid", D.projects.filter((project) => project.orientation === "horizontal"));

  const A = D.about;
  setText("aboutIntro", A.intro);
  setHTML("aboutParagraphs", A.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join(""));
  setHTML("strengthsList", A.strengths.map((item) => `<article class="strength" data-reveal><h4>${esc(item.title)}</h4><p>${esc(item.example)}</p></article>`).join(""));
  setHTML("educationList", A.education.map((item) => `<li><span>${esc(item.name)}</span>${item.note ? `<span>${esc(item.note)}</span>` : ""}</li>`).join(""));
  setHTML("languagesList", A.languages.map((item) => `<li><span>${esc(item.name)}</span><span>${esc(item.level)}</span></li>`).join(""));
  setText("languageNote", A.languageNote);

  setHTML("servicesGrid", D.services.map((item, index) => `<article class="service" data-reveal><small>${String(index + 1).padStart(2, "0")}</small><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></article>`).join(""));
  setHTML("skillsGroups", D.skillGroups.map((group) => `<article class="skill-group" data-reveal><h3>${esc(group.title)}</h3><ul>${group.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article>`).join(""));
  setText("processIntro", D.process.intro);
  setText("processGoal", D.process.goal);
  setHTML("processLine", D.process.steps.map((step, index) => `<article class="process-step" data-reveal><b>${String(index + 1).padStart(2, "0")}</b><h4>${esc(step.title)}</h4><p>${esc(step.description)}</p></article>`).join(""));

  setText("conceptHeading", D.concept.heading);
  setText("conceptLabel", D.concept.label);
  setText("conceptTitle", D.concept.title);
  setText("conceptDesc", D.concept.description);
  setHTML("conceptBreakdown", D.concept.breakdown.map((item) => `<dt>${esc(item.label)}</dt><dd>${esc(item.value)}</dd>`).join(""));
  setText("conceptDisclaimer", D.concept.disclaimer);

  setText("contactHeading", D.contact.heading);
  setText("contactSub", D.contact.sub);
  const email = $("contactEmailLink"); email.textContent = D.person.email; email.href = `mailto:${D.person.email}`;
  const phone = $("contactPhoneLink"); phone.textContent = D.person.phoneDisplay; phone.href = D.person.phoneHref;
  $("contactTikTokLink").href = D.links.tiktok.url;
  let copyTimer;
  $("copyEmailBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(D.person.email);
      setText("copyFeedback", "Email copied.");
    } catch (error) {
      setText("copyFeedback", "Copy failed. Please select the email address.");
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => setText("copyFeedback", ""), 4000);
  });
  setText("footerNote", D.footer.note);
  setHTML("footerLinks", [[D.links.resumeUrl, "Resume"], [D.links.github, "GitHub"], [D.links.futureWave.url, D.links.futureWave.name], [D.links.tiktok.url, D.links.tiktok.name], [D.links.skylah.url, D.links.skylah.name]]
    .filter(([url]) => url).map(([url, label]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`).join(""));

  const dialog = $("videoDialog");
  function openDialog(project) {
    setText("dialogTitle", project.title);
    setText("dialogDesc", project.description);
    setHTML("dialogMeta", [["Role", project.role], ["Tools", project.tools], ["Category", project.category], ["Results", project.results]].filter(([, value]) => value).map(([label, value]) => `<span><b>${label}:</b> ${esc(value)}</span>`).join(""));
    setHTML("dialogMediaWrap", project.videoSrc ? `<video controls autoplay playsinline src="${esc(project.videoSrc)}"></video>` : `<p class="video-dialog__empty">Video coming soon.</p>`);
    const video = dialog.querySelector("video");
    if (video) video.addEventListener("error", () => setHTML("dialogMediaWrap", `<p class="video-dialog__empty">This video could not be loaded.</p>`), { once: true });
    dialog.dataset.open = "true";
    document.body.dataset.lock = "true";
  }
  function closeDialog() { dialog.dataset.open = "false"; delete document.body.dataset.lock; setHTML("dialogMediaWrap", ""); }
  $("dialogClose").addEventListener("click", closeDialog);
  $("dialogBackdrop").addEventListener("click", closeDialog);

  const navToggle = $("navToggle");
  const mobileMenu = $("mobileMenu");
  const toggleMenu = (open) => { mobileMenu.dataset.open = String(open); navToggle.setAttribute("aria-expanded", String(open)); if (open) document.body.dataset.lock = "true"; else delete document.body.dataset.lock; };
  navToggle.addEventListener("click", () => toggleMenu(mobileMenu.dataset.open !== "true"));
  $("mobileMenuClose").addEventListener("click", () => toggleMenu(false));
  $("mobileNavList").addEventListener("click", (event) => { if (event.target.closest("a")) toggleMenu(false); });

  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

  const updateProgress = () => {
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const amount = documentHeight ? window.scrollY / documentHeight : 0;
    $("timelineFill").style.height = `${amount * 100}%`;
    $("timelinePlayhead").style.top = `${amount * 100}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
})();
