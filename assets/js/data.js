/**
 * SITE CONTENT
 * ------------
 * Every editable piece of text, link, and project entry lives in this file.
 * Change values here — you should not need to touch index.html, styles.css,
 * or main.js to update copy, contact info, or project data.
 *
 * See README.md → "Where to edit things" for a guided tour of this file.
 */

const SITE_DATA = {
  // ---------------------------------------------------------------------
  // IDENTITY
  // ---------------------------------------------------------------------
  person: {
    name: "Moqtader Hashimi",
    roleLabel: "Video Editor · Content Creator · Web Developer",
    email: "moqtaderhashimi123@gmail.com",
    phoneDisplay: "971-480-1406",
    phoneHref: "tel:+19714801406",
  },

  // ---------------------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------------------
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  // ---------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------
  hero: {
    eyebrow: "Portfolio — Reel 001",
    headline: "Video that earns attention. Content that builds your brand.",
    sub: "I\u2019m Moqtader Hashimi. I turn raw footage and ideas into polished videos, branded content, and websites that help businesses communicate clearly and connect with their audience.",
    primaryCta: { label: "View My Work", href: "#work" },
    secondaryCta: { label: "Let\u2019s Talk", href: "#contact" },
  },

  // ---------------------------------------------------------------------
  // EDITABLE LINKS — hide anything you don't have yet. Set to null/empty
  // to hide it automatically; nothing renders as a dead "#" link.
  // ---------------------------------------------------------------------
  links: {
    resumeUrl: "", // e.g. "assets/resume.pdf" — leave blank to hide the resume button
    github: "", // e.g. "https://github.com/moqtaderjan" — leave blank to hide
    futureWave: {
      name: "Future Wave",
      url: "", // add the current Future Wave social URL here
    },
    tiktok: {
      name: "TikTok",
      url: "https://www.tiktok.com/@future_product_2080",
    },
    skylah: {
      name: "Skylah",
      url: "", // optional — leave blank to hide
    },
  },

  availability: {
    show: true,
    text: "Open to Marketing & Content Coordinator, Social Media & Brand Content, Video Editing, and creative support roles.",
  },

  // ---------------------------------------------------------------------
  // METRICS — kept hidden until exact figures + supporting links/screenshots
  // are supplied. Flip `show` to true and fill in real numbers to publish.
  // ---------------------------------------------------------------------
  metrics: {
    show: false,
    items: [
      { value: "", label: "TikTok views" },
      { value: "", label: "Followers" },
      { value: "", label: "Projects shipped" },
    ],
  },

  // ---------------------------------------------------------------------
  // SELECTED WORK
  // Fields: id, title, description, orientation ("vertical" | "horizontal"),
  // category, role, tools, poster, videoSrc, captionsSrc, results.
  // Set videoSrc to null for a "coming soon" placeholder card — the card
  // will show a designed placeholder state instead of a broken player.
  // ---------------------------------------------------------------------
  projects: [
    {
      id: "sf-01",
      title: "Moqtader Video Editor",
      description: "My own AI-assisted video edit, polished with clear captions, cleaner voice audio, tighter cuts, and unnecessary pauses removed.",
      orientation: "vertical",
      category: "Short-form",
      role: "Editing, AI-assisted production, and finishing",
      tools: "AI tools, captions, audio cleanup, and video editing",
      poster: null,
      videoSrc: "assets/videos/Moqtader_Video_Editor.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "sf-06",
      title: "How to Memorize a Script",
      description: "A practical short-form video edited with clear pacing, captions, and visual structure to make the script easier to follow.",
      orientation: "vertical",
      category: "Short-form",
      role: "Video editing and pacing",
      tools: "Captions, pacing, visual structure, and video editing",
      poster: null,
      videoSrc: "assets/videos/How_to_memorize_script.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "sf-02",
      title: "Media Key",
      description: "A self-edited piece built from open-source raw footage, made more engaging with visual layers, captions, tighter cuts, and filler-word removal.",
      orientation: "vertical",
      category: "Short-form",
      role: "Video editing and pacing",
      tools: "Open-source footage, captions, visuals, and editing",
      poster: null,
      videoSrc: "assets/videos/Media_Key.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "sf-03",
      title: "Want to Go Viral",
      description: "A TikTok video teaching practical ways to make content more watchable, from the opening hook through pacing and audience retention.",
      orientation: "vertical",
      category: "Short-form",
      role: "Concept, editing, and publishing",
      tools: "TikTok editing, captions, pacing, and hooks",
      poster: null,
      videoSrc: "assets/videos/Want_to_go_viral.mp4",
      captionsSrc: null,
      results: "Hundreds of thousands of views",
    },
    {
      id: "sf-04",
      title: "Real Footage to Engaging Content",
      description: "An AI-generated example showing the editing idea behind turning real footage into dynamic content with hands-on pacing, captions, and effects.",
      orientation: "vertical",
      category: "Short-form",
      role: "Editing concept and execution",
      tools: "AI-generated visuals, pacing, captions, and effects",
      poster: null,
      videoSrc: "assets/videos/Real_Footage_to_Engaging_Content.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "sf-05",
      title: "Interesting Ads",
      description: "A short piece about creating ads people actually want to watch, with attention to creative ideas, performance checks, and stronger audience engagement.",
      orientation: "vertical",
      category: "Short-form",
      role: "Ad creative and editing",
      tools: "Short-form editing, hooks, visuals, and performance review",
      poster: null,
      videoSrc: "assets/videos/Interesting_Ads.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "lf-01",
      title: "Entrepreneurship Talking",
      description: "An older long-form project edited with tighter cuts, clearer pacing, and a structured presentation across a horizontal frame.",
      orientation: "horizontal",
      category: "Long-form",
      role: "Long-form video editing",
      tools: "Editing, pacing, structure, and frame-aware finishing",
      poster: null,
      videoSrc: "assets/videos/Entrepernurship_Talking.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "lf-02",
      title: "Life Without Social Media",
      description: "An older horizontal edit exploring life without social media, shaped with tighter cuts and deliberate pacing to keep the story moving.",
      orientation: "horizontal",
      category: "Long-form",
      role: "Long-form video editing",
      tools: "Editing, pacing, storytelling, and horizontal framing",
      poster: null,
      videoSrc: "assets/videos/Life_Without_Social_Media.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "lf-03",
      title: "ClearFlow Plumbing",
      description: "A service-focused brand video shaped to make a plumbing business feel clear, capable, and easy to contact.",
      orientation: "vertical",
      category: "Client work",
      role: "Editing, pacing, and finishing",
      tools: "Video editing, sound design, pacing, and brand storytelling",
      poster: null,
      videoSrc: "assets/videos/ClearFlow_Plumbing.mp4",
      captionsSrc: null,
      results: null,
    },
    {
      id: "lf-04",
      title: "Summit Air HVAC",
      description: "A polished HVAC business video with a direct visual rhythm designed to build trust and communicate the service quickly.",
      orientation: "vertical",
      category: "Client work",
      role: "Editing, pacing, and finishing",
      tools: "Video editing, sound design, pacing, and brand storytelling",
      poster: null,
      videoSrc: "assets/videos/Summit_Air_HVAC.mp4",
      captionsSrc: null,
      results: null,
    },
  ],

  // ---------------------------------------------------------------------
  // SERVICES
  // ---------------------------------------------------------------------
  services: [
    {
      title: "Short-form content",
      description:
        "TikTok, Reels, and Shorts built around a strong hook, tight pacing, and captions people can follow with the sound off — content designed to stop the scroll.",
    },
    {
      title: "Long-form & talking-head editing",
      description:
        "Clear structure and stronger openings for interviews, podcasts, and talking-head video — filler removed, B-roll and sound layered in, presentation kept consistent start to finish.",
    },
    {
      title: "Ad creative variations",
      description:
        "Multiple hooks, captions, openings, and formats cut from the same source footage, so you have real options to test instead of one single edit.",
    },
    {
      title: "Brand & social content",
      description:
        "Promotional videos, product visuals, thumbnails, and graphics that keep a brand looking consistent across every post and platform.",
    },
    {
      title: "Websites & landing pages",
      description:
        "Responsive websites and landing pages with clear calls to action — plus ongoing content updates so the site stays current.",
    },
    {
      title: "AI-assisted creative production",
      description:
        "Using AI tools for ideas, scripts, visuals, and creative variations — while I review every output myself for quality and accuracy before it ships.",
    },
  ],

  // ---------------------------------------------------------------------
  // ABOUT
  // ---------------------------------------------------------------------
  about: {
    intro:
      "I combine video editing, graphic design, web development, and AI-assisted content creation. I enjoy learning new technologies and applying them to practical business needs.",
    paragraphs: [
      "I support Skylah, an e-commerce business, with product research, product listings, videos, photos, and other visual content — plus general creative and technical problem-solving as it comes up.",
      "I create social content through Future Wave, and I'm comfortable turning one piece of raw footage into several creative versions by adjusting hooks, captions, pacing, and supporting visuals.",
    ],
    strengths: [
      {
        title: "Organization",
        example:
          "Clear file naming and folder structures so raw footage, exports, and versions never get mixed up mid-project.",
      },
      {
        title: "Attention to detail",
        example:
          "Checking caption timing, audio levels, and aspect ratios frame by frame before anything is called finished.",
      },
      {
        title: "Dependability",
        example:
          "Tracking deadlines across multiple projects at once and flagging early if something needs more time.",
      },
      {
        title: "Curiosity",
        example:
          "Regularly testing new AI and editing tools on personal projects before bringing them into client work.",
      },
      {
        title: "Independent problem-solving",
        example:
          "Troubleshooting export, format, and platform issues myself before asking for help.",
      },
    ],
    education: [
      { name: "Pierce College", note: "Running Start" },
      { name: "Graham Kapowsin High School" },
      { name: "Graphic design & web development coursework" },
      { name: "Additional online courses and independent, practical learning" },
    ],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Dari", level: "Native" },
      { name: "Pashto", level: "Intermediate" },
    ],
    languageNote:
      "Working across three languages has shaped how I write captions and structure visuals — I default to plain, direct language so a video reads clearly even before someone speaks.",
  },

  // ---------------------------------------------------------------------
  // SKILLS
  // ---------------------------------------------------------------------
  skillGroups: [
    {
      title: "Video & motion",
      items: [
        "Premiere Pro",
        "After Effects",
        "CapCut",
        "Talking-head editing",
        "Short-form content",
        "Long-form content",
        "Captions",
        "B-roll",
        "Pacing",
        "Sound design",
        "Color grading",
        "Motion graphics",
      ],
    },
    {
      title: "Design & branding",
      items: [
        "Canva",
        "Adobe creative tools",
        "Thumbnails",
        "Typography",
        "Visual branding",
        "Graphics",
        "Brand integration",
      ],
    },
    {
      title: "AI",
      items: [
        "ChatGPT",
        "Claude",
        "Gemini",
        "AI-assisted scripts",
        "AI-assisted visuals",
        "Creative variations",
        "Exploratory AI music projects",
      ],
    },
    {
      title: "Web & development",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "Java",
        "VS Code",
        "Git / GitHub",
        "Vercel",
        "Website hosting platforms",
      ],
    },
    {
      title: "Organization",
      items: [
        "Excel",
        "Project folders",
        "Asset organization",
        "Content planning",
        "Performance review",
      ],
    },
  ],

  // ---------------------------------------------------------------------
  // PROCESS
  // ---------------------------------------------------------------------
  process: {
    intro: "This is my working approach on a project, not a claimed history of results.",
    steps: [
      {
        title: "Understand",
        description: "Get clear on the audience and the goal before touching footage.",
      },
      {
        title: "Develop",
        description: "Shape the idea and the hook that will carry the piece.",
      },
      {
        title: "Record / organize",
        description: "Capture or organize footage with a clear naming system.",
      },
      {
        title: "Edit & vary",
        description: "Cut the main edit, then build variations for testing.",
      },
      {
        title: "Review & learn",
        description: "Publish, review performance, and carry lessons into the next piece.",
      },
    ],
    goal: "I want to help businesses turn useful ideas into clear, engaging content while continuing to grow across video, marketing, and web development.",
  },

  // ---------------------------------------------------------------------
  // SAMPLE CONCEPT
  // ---------------------------------------------------------------------
  concept: {
    heading: "How I Think About Content",
    label: "Proposed concept — not a completed client project",
    title: "\u201CNervous About Your First Dental Visit?\u201D",
    description:
      "A short video featuring a welcoming team member, a simple office walkthrough, and clear captions showing what a first visit involves.",
    breakdown: [
      { label: "Audience", value: "People who feel uncertain about visiting a dentist." },
      { label: "Purpose", value: "Make the practice feel familiar and approachable." },
      { label: "Execution", value: "Real staff, reassuring visuals, concise editing, a clear next step." },
      { label: "Evaluation", value: "Watch time, saves, website visits, and appointment inquiries where tracking is available." },
    ],
    disclaimer:
      "Any medical statements would need the practice\u2019s review, and identifiable patient footage would need appropriate permission.",
  },

  // ---------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------
  contact: {
    heading: "Let\u2019s talk about your project",
    sub: "Open to roles and freelance work across video editing, content creation, and web development.",
  },

  footer: {
    note: "Built and edited by Moqtader Hashimi.",
  },
};
