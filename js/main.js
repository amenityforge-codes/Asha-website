(function () {
  const header = document.querySelector("header.site");
  const toggle = document.querySelector(".menu-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      const open = header.classList.toggle("open");
      document.documentElement.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const aboutItem = document.querySelector(".nav-item.has-sub");
  if (aboutItem) {
    const parent = aboutItem.querySelector(":scope > .nav-parent");
    const sub = aboutItem.querySelector(":scope > .nav-sub");

    function setAboutOpen(open) {
      aboutItem.classList.toggle("open", open);
      if (parent) parent.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (parent) {
      parent.addEventListener("click", function () {
        setAboutOpen(parent.getAttribute("aria-expanded") !== "true");
      });
      parent.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        setAboutOpen(true);
        const first = sub && sub.querySelector("a");
        if (first) first.focus();
      });
    }

    document.addEventListener("click", function (event) {
      if (!aboutItem.contains(event.target)) setAboutOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      setAboutOpen(false);
      if (parent) parent.focus();
    });
  }

  const missionLinks = document.querySelectorAll(".mission-nav-link");
  if (missionLinks.length && "IntersectionObserver" in window) {
    const sectionIds = Array.from(missionLinks).map(function (link) {
      return link.getAttribute("href").replace("#", "");
    });
    const sections = sectionIds
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (sections.length) {
      const missionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              missionLinks.forEach(function (link) {
                link.classList.toggle("active", link.getAttribute("href") === "#" + id);
              });
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      sections.forEach(function (sec) {
        missionObserver.observe(sec);
      });
    }
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function bindProductionForm(form) {
    const error = form.querySelector("[data-form-error]");
    const status = form.querySelector(".form-status");
    const category = form.querySelector("[name='category']");
    const classification = form.querySelector("[name='classification']");
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : "Submit";

    function syncHotelClassification() {
      if (!category || !classification) return;
      classification.required = category.value === "hotel";
    }

    if (category && classification) {
      category.addEventListener("change", syncHotelClassification);
      syncHotelClassification();
    }

    form.addEventListener("input", function () {
      if (error) {
        error.hidden = true;
        error.textContent = "";
      }
      if (status) {
        status.classList.remove("show");
        status.textContent = "";
      }
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Prevent duplicate submission while in progress
      if (form.dataset.submitting === "true") return;

      syncHotelClassification();

      // Client-side HTML5 validity check
      if (!form.checkValidity()) {
        form.reportValidity();
        if (error) {
          error.textContent = "Please complete all required fields and accept the privacy consent.";
          error.hidden = false;
        }
        return;
      }

      // Collect form data as key-value JSON payload
      const formData = new FormData(form);
      const payload = {};
      formData.forEach(function (value, key) {
        payload[key] = value;
      });
      // Ensure boolean for privacy consent
      payload.privacy = Boolean(form.querySelector("[name='privacy']") && form.querySelector("[name='privacy']").checked);

      // Transition to Submitting state
      form.dataset.submitting = "true";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-disabled", "true");
        submitBtn.textContent = form.id === "membership-form" ? "Submitting application..." : "Sending enquiry...";
      }
      if (error) {
        error.hidden = true;
        error.textContent = "";
      }
      if (status) {
        status.classList.remove("show");
        status.textContent = "";
      }

      const isMembership = form.id === "membership-form";
      const endpoint = form.getAttribute("action") || (isMembership ? "/api/membership" : "/api/contact");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(function () {
          return { ok: false, error: null };
        });

        if (response.ok && data.ok) {
          // SUCCESS state
          if (status) {
            status.textContent = data.message || (isMembership
              ? "Your application has been received and is pending review by the ASHA Secretariat."
              : "Your enquiry has been received by the ASHA Secretariat.");
            status.classList.add("show");
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            status.focus();
          }
          form.reset();
          syncHotelClassification();
        } else {
          // ERROR state - preserve entered form data, do not reset!
          const fallbackErr = isMembership
            ? "We could not submit your application right now. Please try again or contact the ASHA Secretariat directly."
            : "We could not submit your enquiry right now. Please try again or contact the ASHA Secretariat directly.";
          if (error) {
            error.textContent = data.error || fallbackErr;
            error.hidden = false;
            error.setAttribute("role", "alert");
            error.setAttribute("aria-live", "assertive");
            error.focus();
          }
        }
      } catch (err) {
        // Network / Unexpected error - preserve entered form data!
        const fallbackErr = isMembership
          ? "We could not submit your application right now. Please try again or contact the ASHA Secretariat directly."
          : "We could not submit your enquiry right now. Please try again or contact the ASHA Secretariat directly.";
        if (error) {
          error.textContent = fallbackErr;
          error.hidden = false;
          error.setAttribute("role", "alert");
          error.setAttribute("aria-live", "assertive");
          error.focus();
        }
      } finally {
        // Restore submit button state
        delete form.dataset.submitting;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute("aria-disabled");
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  document.querySelectorAll(".asha-form").forEach(bindProductionForm);

  const links = document.querySelectorAll(".obj-side a");
  const articles = document.querySelectorAll(".obj-article");
  if (links.length && articles.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    articles.forEach(function (article) {
      observer.observe(article);
    });
  }

  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    const tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    const panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    function selectTab(next) {
      tabs.forEach(function (tab) {
        const on = tab === next;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        const panel = root.querySelector("#" + tab.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        selectTab(tab);
      });
      tab.addEventListener("keydown", function (event) {
        const index = tabs.indexOf(tab);
        let go = -1;
        if (event.key === "ArrowRight") go = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") go = (index - 1 + tabs.length) % tabs.length;
        if (go < 0) return;
        event.preventDefault();
        tabs[go].focus();
        selectTab(tabs[go]);
      });
    });
    if (!panels.length) return;
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (!reduce && reveals.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    reveals.forEach(function (el, index) {
      el.style.setProperty("--reveal-delay", index * 40 + "ms");
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }
})();
