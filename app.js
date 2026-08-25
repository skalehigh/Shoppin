const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

const syncHeader = () => header?.classList.toggle("scrolled", window.scrollY > 40);
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  primaryNav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const whatsappDialog = document.querySelector("[data-whatsapp-dialog]");
const whatsappForm = document.querySelector("[data-whatsapp-form]");
const whatsappDialogPanel = whatsappDialog?.querySelector(".whatsapp-dialog-panel");
const whatsappNameInput = whatsappForm?.elements.namedItem("name");
const whatsappPhoneInput = whatsappForm?.elements.namedItem("phone");
const whatsappCountryCode = whatsappForm?.elements.namedItem("countryCode");
let activeWhatsappLink;

const closeWhatsappDialog = () => {
  whatsappDialog.hidden = true;
  document.body.classList.remove("has-whatsapp-dialog");
  activeWhatsappLink?.focus();
};

const openWhatsappDialog = (link) => {
  activeWhatsappLink = link;
  whatsappForm.reset();
  whatsappPhoneInput.placeholder = "88856 29392";
  whatsappDialog.hidden = false;
  document.body.classList.add("has-whatsapp-dialog");
  window.requestAnimationFrame(() => whatsappNameInput.focus());
};

document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!whatsappDialog || !whatsappForm) return;

    event.preventDefault();
    const source = link.dataset.whatsapp || `${pageName || "home"}-link`;
    window.plausible?.("WhatsApp CTA", { props: { source } });
    window.dispatchEvent(new CustomEvent("shoppin:whatsapp-click", { detail: { source } }));
    openWhatsappDialog(link);
  });
});

whatsappDialog?.querySelectorAll("[data-whatsapp-close]").forEach((button) => {
  button.addEventListener("click", closeWhatsappDialog);
});

whatsappCountryCode?.addEventListener("change", () => {
  const isOther = whatsappCountryCode.value === "other";
  whatsappPhoneInput.placeholder = isOther ? "+353 12 345 6789" : "88856 29392";
  whatsappPhoneInput.autocomplete = isOther ? "tel" : "tel-national";
  whatsappPhoneInput.setCustomValidity("");
});

whatsappForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activeWhatsappLink) return;

  const formData = new FormData(whatsappForm);
  const phone = String(formData.get("phone") || "").trim();
  const digits = phone.replace(/\D/g, "");
  const usesCompleteNumber = formData.get("countryCode") === "other";
  const isValidPhone = digits.length >= 7 && digits.length <= 15 && (!usesCompleteNumber || phone.startsWith("+"));

  whatsappPhoneInput.setCustomValidity(
    isValidPhone ? "" : usesCompleteNumber
      ? "Enter a complete phone number beginning with + and the country code."
      : "Enter a valid phone number with 7 to 15 digits."
  );
  if (!whatsappForm.reportValidity()) return;

  const destination = new URL(activeWhatsappLink.href);
  const originalMessage = destination.searchParams.get("text")?.trim() || "Hi Shoppin, I'd like help with a request.";
  const completePhone = usesCompleteNumber ? `+${digits}` : `${formData.get("countryCode")}${digits}`;
  const contactDetails = [
    `Name: ${String(formData.get("name")).trim()}`,
    formData.get("email") ? `Email: ${String(formData.get("email")).trim()}` : null,
    `Phone: ${completePhone}`
  ].filter(Boolean);

  destination.searchParams.set("text", `${originalMessage}\n\nContact details:\n${contactDetails.join("\n")}`);
  const source = activeWhatsappLink.dataset.whatsapp || `${pageName || "home"}-link`;
  window.plausible?.("WhatsApp Lead Submitted", { props: { source } });
  window.location.assign(destination.toString());
});

whatsappDialog?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeWhatsappDialog();
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = Array.from(
    whatsappDialogPanel.querySelectorAll("button, input, select, [href]")
  ).filter((element) => !element.disabled);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const serviceVisuals = {
  "personal-shopper.html": [
    "local-store.avif",
    "hero.webp",
    "video-shop.avif",
    "verification.avif",
    "clothing.avif",
    "regional.avif",
    "home.avif",
    "jewellery.avif"
  ],
  "personal-assistant.html": [
    "home.avif",
    "verification.avif",
    "corporate.avif",
    "jewellery.avif",
    "local-store.avif",
    "assistant.avif",
    "clothing.avif",
    "video-shop.avif"
  ],
  "sourcing-export.html": [
    "sourcing.avif",
    "corporate.avif",
    "verification.avif",
    "hero.webp",
    "regional.avif",
    "clothing.avif"
  ],
  "corporate-services.html": [
    "jewellery.avif",
    "sourcing.avif",
    "corporate.avif",
    "hero.webp",
    "home.avif",
    "regional.avif"
  ]
};

const pageName = window.location.pathname.split("/").pop();
const galleryImages = serviceVisuals[pageName];
if (galleryImages) {
  const gallery = document.querySelector(".subservice-section .subservice-grid");
  gallery?.classList.add("subservice-gallery");
  gallery?.querySelectorAll(".subservice-card").forEach((card, index) => {
    const title = card.querySelector("h3")?.textContent || "Shoppin service";
    const media = document.createElement("div");
    media.className = "subservice-media";
    media.innerHTML = `<img src="assets/${galleryImages[index]}" alt="${title}" loading="lazy">`;
    card.prepend(media);
  });
}

const serviceShowcase = document.querySelector("[data-service-showcase]");
if (serviceShowcase) {
  const videoItems = Array.from(serviceShowcase.querySelectorAll(".service-reel-group .service-reel-card"));
  const videoTrack = serviceShowcase.querySelector("[data-service-video-track]");
  const videoGroup = serviceShowcase.querySelector(".service-reel-group");
  const videoDialog = serviceShowcase.querySelector("[data-service-video-dialog]");
  const closeButtons = Array.from(serviceShowcase.querySelectorAll("[data-service-video-close]"));
  const dialogCloseButton = serviceShowcase.querySelector(".service-video-dialog-close");
  const playerContainer = serviceShowcase.querySelector("#service-video-player");
  const externalVideoLink = serviceShowcase.querySelector("[data-service-video-external]");
  let activeVideo = 0;
  let lastVideoTrigger;

  const trackServiceVideoNavigation = (source) => {
    const item = videoItems[activeVideo];
    window.plausible?.("Service Video Navigation", {
      props: { source, video: item.dataset.videoId }
    });
  };

  if (videoTrack && videoGroup) {
    const clone = videoGroup.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("button").forEach((button) => {
      button.tabIndex = -1;
      button.removeAttribute("aria-label");
    });
    videoTrack.append(clone);
  }

  const showVideo = (index, source = "automatic") => {
    activeVideo = (index + videoItems.length) % videoItems.length;
    const item = videoItems[activeVideo];
    const videoId = item.dataset.videoId;
    const embed = document.createElement("iframe");
    const params = new URLSearchParams({
      autoplay: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      origin: "https://shoppin.co.in",
      widget_referrer: "https://shoppin.co.in/"
    });
    embed.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
    embed.title = item.getAttribute("aria-label")?.replace(/^Play /, "") || "Shoppin service video";
    embed.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
    embed.referrerPolicy = "strict-origin-when-cross-origin";
    embed.allowFullscreen = true;
    playerContainer.replaceChildren(embed);
    if (externalVideoLink) externalVideoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    if (source !== "automatic" && source !== "ended") trackServiceVideoNavigation(source);
  };

  const openVideo = (index, trigger) => {
    lastVideoTrigger = trigger;
    videoDialog.hidden = false;
    document.body.classList.add("has-video-dialog");
    showVideo(index, "reel");
    window.requestAnimationFrame(() => dialogCloseButton?.focus());
  };

  const closeVideo = () => {
    playerContainer.replaceChildren();
    videoDialog.hidden = true;
    document.body.classList.remove("has-video-dialog");
    lastVideoTrigger?.focus();
  };

  videoItems.forEach((item, index) => item.addEventListener("click", () => openVideo(index, item)));
  serviceShowcase.querySelector("[data-service-video-prev]")?.addEventListener("click", () => {
    showVideo(activeVideo - 1, "previous");
  });
  serviceShowcase.querySelector("[data-service-video-next]")?.addEventListener("click", () => {
    showVideo(activeVideo + 1, "next");
  });
  closeButtons.forEach((button) => button.addEventListener("click", closeVideo));
  videoDialog?.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeVideo();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showVideo(activeVideo - 1, "keyboard");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showVideo(activeVideo + 1, "keyboard");
    }
  });
}

const testimonials = document.querySelector("[data-testimonials]");
if (testimonials) {
  const cards = Array.from(testimonials.querySelectorAll(".testimonial-card"));
  const count = testimonials.querySelector("[data-testimonial-count]");
  let activeTestimonial = 0;
  let testimonialTimer;
  let rotationPaused = prefersReducedMotion;

  const showTestimonial = (index, direction = "next") => {
    activeTestimonial = (index + cards.length) % cards.length;
    testimonials.dataset.direction = direction;
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeTestimonial;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-hidden", String(!isActive));
    });
    if (count) count.textContent = `${String(activeTestimonial + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  };

  const stopTestimonials = () => window.clearInterval(testimonialTimer);
  const startTestimonials = () => {
    stopTestimonials();
    if (!rotationPaused && !document.hidden) testimonialTimer = window.setInterval(() => showTestimonial(activeTestimonial + 1), 9000);
  };
  const pauseAfterInteraction = () => {
    rotationPaused = true;
    stopTestimonials();
  };
  const trackTestimonialNavigation = (source) => {
    window.plausible?.("Testimonial Navigation", {
      props: { source, review: String(activeTestimonial + 1) }
    });
  };

  testimonials.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => {
    showTestimonial(activeTestimonial - 1, "previous");
    pauseAfterInteraction();
    trackTestimonialNavigation("previous");
  });
  testimonials.querySelector("[data-testimonial-next]")?.addEventListener("click", () => {
    showTestimonial(activeTestimonial + 1);
    pauseAfterInteraction();
    trackTestimonialNavigation("next");
  });
  testimonials.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showTestimonial(activeTestimonial - 1, "previous");
      pauseAfterInteraction();
      trackTestimonialNavigation("keyboard");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showTestimonial(activeTestimonial + 1);
      pauseAfterInteraction();
      trackTestimonialNavigation("keyboard");
    }
  });
  testimonials.addEventListener("pointerenter", stopTestimonials);
  testimonials.addEventListener("pointerleave", startTestimonials);
  testimonials.addEventListener("focusin", stopTestimonials);
  testimonials.addEventListener("focusout", startTestimonials);
  document.addEventListener("visibilitychange", () => document.hidden ? stopTestimonials() : startTestimonials());
  startTestimonials();
}

const processTitles = [
  "Request received",
  "Shopper assigned",
  "Live video call",
  "Purchase approved",
  "Ready to dispatch"
];

const processImageLabels = [
  "Request details received",
  "Your shopper is ready",
  "Live from the store",
  "Item checked and approved",
  "Prepared for dispatch"
];

const processSection = document.querySelector(".process");
const processSteps = Array.from(processSection?.querySelectorAll(".process-step") || []);
const processImages = Array.from(processSection?.querySelectorAll("[data-process-image]") || []);
let activeProcessStep = 0;

function setActiveStep(index, animate = true) {
  if (!processSteps.length || index === activeProcessStep && processSteps[index]?.classList.contains("is-active")) return;

  const previousImage = processImages[activeProcessStep];
  const nextImage = processImages[index];

  processSteps.forEach((step, stepIndex) => {
    step.classList.toggle("is-active", stepIndex === index);
  });

  processImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === index);
    if (imageIndex === index) image.removeAttribute("aria-hidden");
    else image.setAttribute("aria-hidden", "true");
  });

  if (animate && window.gsap && previousImage && nextImage && previousImage !== nextImage) {
    gsap.killTweensOf([previousImage, nextImage]);
    gsap.set(previousImage, { opacity: 1, scale: 1 });
    gsap.to(previousImage, { opacity: 0, scale: 0.985, duration: 0.45, ease: "power2.out" });
    gsap.fromTo(
      nextImage,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.65, ease: "power2.out", overwrite: true }
    );
  }

  const stepLabel = processSection?.querySelector("[data-step-label]");
  const stepTitle = processSection?.querySelector("[data-step-title]");
  const imageLabel = processSection?.querySelector("[data-process-image-label]");
  if (stepLabel) stepLabel.textContent = String(index + 1);
  if (stepTitle) stepTitle.textContent = processTitles[index];
  if (imageLabel) imageLabel.textContent = processImageLabels[index];
  activeProcessStep = index;
}

if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add("(min-width: 821px)", () => {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
      .from(".site-header", { y: -24, opacity: 0, duration: 0.65 })
      .from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.55 }, "-=0.2")
      .from(".hero-line > span", { yPercent: 110, duration: 0.95, stagger: 0.1 }, "-=0.25")
      .from(".hero-intro, .hero-actions, .hero-trust", { y: 22, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.5")
      .from(".hero-media", { clipPath: "inset(0 0 100% 0)", duration: 1.15 }, "-=1.25")
      .from(".live-card, .location-note", { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.45");

    gsap.to(".hero-image-wrap img", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.from(element, {
      y: 36,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        once: true
      }
    });
  });

  if (processSection && processSteps.length) {
    const processMedia = gsap.matchMedia();
    processMedia.add("(min-width: 821px)", () => {
      const processTrigger = ScrollTrigger.create({
        trigger: processSection,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 1.25)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          setActiveStep(Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length)));
        }
      });

      return () => processTrigger.kill();
    });
  }

  gsap.from(".annotation i", {
    scaleX: 0,
    duration: 0.7,
    stagger: 0.16,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".verification-media",
      start: "top 70%",
      once: true
    }
  });

  gsap.to("[data-category-rail]", {
    x: () => Math.min(0, window.innerWidth - document.querySelector("[data-category-rail]").scrollWidth - 40),
    ease: "none",
    scrollTrigger: {
      trigger: ".categories",
      start: "top 20%",
      end: "bottom top",
      scrub: 0.8,
      invalidateOnRefresh: true
    }
  });

  gsap.to(".final-cta-orb", {
    rotate: 20,
    scale: 1.12,
    ease: "none",
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.from(".page-hero .page-hero-copy > *, .page-hero .page-hero-media", {
    y: 28,
    opacity: 0,
    duration: 0.85,
    stagger: 0.08,
    ease: "power3.out",
    delay: 0.1
  });
}

document.querySelectorAll('a[href$=".html"], a[href^="index.html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      prefersReducedMotion ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === "_blank"
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 260);
  });
});
