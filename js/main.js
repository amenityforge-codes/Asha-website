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
    const mission = aboutItem.querySelector(".nav-mission");
    const missionBtn = aboutItem.querySelector(".nav-mission-toggle");

    function setMissionOpen(open) {
      if (!mission || !missionBtn) return;
      mission.classList.toggle("open", open);
      missionBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function setAboutOpen(open) {
      aboutItem.classList.toggle("open", open);
      if (parent) parent.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) setMissionOpen(false);
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

    if (missionBtn) {
      missionBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        setAboutOpen(true);
        setMissionOpen(missionBtn.getAttribute("aria-expanded") !== "true");
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

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function bindHoldingForm(form) {
    const error = form.querySelector("[data-form-error]");
    const status = form.querySelector(".form-status");
    const category = form.querySelector("[name='category']");
    const classification = form.querySelector("[name='classification']");

    function syncHotelClassification() {
      if (!category || !classification) return;
      classification.required = category.value === "hotel";
    }

    if (category && classification) {
      category.addEventListener("change", syncHotelClassification);
      syncHotelClassification();
    }

    form.addEventListener("input", function () {
      if (error) error.hidden = true;
      if (status) status.classList.remove("show");
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const trap = form.querySelector("[data-honeypot]");
      if (trap && trap.value.trim()) return;
      syncHotelClassification();
      if (!form.checkValidity()) {
        form.reportValidity();
        if (error) error.hidden = false;
        return;
      }
      if (error) error.hidden = true;
      if (status) status.classList.add("show");
      form.reset();
      syncHotelClassification();
    });
  }

  document.querySelectorAll(".asha-form").forEach(bindHoldingForm);

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

  const heroSlides = document.querySelector("[data-hero-slides]");
  if (heroSlides) {
    const frames = heroSlides.querySelectorAll("img");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (frames.length > 1 && !reduceMotion) {
      let index = 0;
      setInterval(function () {
        frames[index].classList.remove("is-active");
        index = (index + 1) % frames.length;
        frames[index].classList.add("is-active");
      }, 6000);
    }
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
