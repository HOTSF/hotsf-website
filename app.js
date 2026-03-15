/* Hands of Time Scholars Foundation — app.js
   Handles: dark mode toggle, mobile nav, scroll header, stats counter, scroll reveals, donate modal */

(function () {
  "use strict";

  /* ============================================================
     DARK MODE TOGGLE
     ============================================================ */
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  root.setAttribute("data-theme", currentTheme);
  updateToggleIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", currentTheme);
      themeToggle.setAttribute(
        "aria-label",
        "Switch to " + (currentTheme === "dark" ? "light" : "dark") + " mode"
      );
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!themeToggle) return;
    if (currentTheme === "dark") {
      themeToggle.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    } else {
      themeToggle.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  /* ============================================================
     MOBILE NAV
     ============================================================ */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  var menuOpen = false;

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      menuOpen = !menuOpen;
      mobileNav.classList.toggle("mobile-nav--open", menuOpen);
      menuToggle.setAttribute("aria-expanded", String(menuOpen));
      document.body.style.overflow = menuOpen ? "hidden" : "";

      if (menuOpen) {
        menuToggle.innerHTML =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
      } else {
        menuToggle.innerHTML =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      }
    });

    // Close mobile nav when a link is clicked
    var mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuOpen = false;
        mobileNav.classList.remove("mobile-nav--open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        menuToggle.innerHTML =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  /* ============================================================
     SCROLL HEADER SHADOW
     ============================================================ */
  var header = document.querySelector("[data-header]");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 20) {
          header.classList.add("header--scrolled");
        } else {
          header.classList.remove("header--scrolled");
        }
      },
      { passive: true }
    );
  }

  /* ============================================================
     STATS COUNTER ANIMATION
     ============================================================ */
  var counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    var target = el.getAttribute("data-count");
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var startTime = null;
    var startVal = 0;

    // Parse target — handle special formats
    var numericTarget = parseFloat(target.replace(/,/g, ""));
    if (isNaN(numericTarget)) {
      el.textContent = prefix + target + suffix;
      return;
    }

    var isFloat = target.indexOf(".") !== -1;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = startVal + (numericTarget - startVal) * eased;

      if (isFloat) {
        el.textContent = prefix + current.toFixed(2) + suffix;
      } else {
        el.textContent =
          prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isFloat) {
          el.textContent = prefix + numericTarget.toFixed(2) + suffix;
        } else {
          el.textContent =
            prefix + numericTarget.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(step);
  }

  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ============================================================
     SCROLL REVEAL FALLBACK (for browsers without scroll-driven animations)
     ============================================================ */
  var supportsScrollTimeline =
    CSS.supports && CSS.supports("animation-timeline", "scroll()");

  if (!supportsScrollTimeline) {
    var revealEls = document.querySelectorAll(".reveal, .reveal-clip");
    if (revealEls.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal--visible", "reveal-clip--visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ============================================================
     DONATE MODAL
     ============================================================ */
  var donateButtons = document.querySelectorAll("[data-donate-btn]");
  var modalOverlay = document.querySelector("[data-donate-modal]");
  var modalClose = document.querySelector("[data-modal-close]");

  if (donateButtons.length > 0 && modalOverlay) {
    donateButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        modalOverlay.classList.add("modal-overlay--open");
        document.body.style.overflow = "hidden";
      });
    });
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", function () {
      modalOverlay.classList.remove("modal-overlay--open");
      document.body.style.overflow = "";
    });

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("modal-overlay--open");
        document.body.style.overflow = "";
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("modal-overlay--open")) {
      modalOverlay.classList.remove("modal-overlay--open");
      document.body.style.overflow = "";
    }
  });

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
