/**
 * ASHA Updates, Initiatives, News & Events Engine
 *
 * Implements strict non-fabrication rendering:
 * - When verified records exist in window.ASHA_*, renders structured cards with full metadata.
 * - When records or specific fields (e.g. photos, status) are missing, displays the standardized
 *   red client-data-required indicators.
 * - Fully accessible keyboard navigation and filter controls.
 */
(function () {
  const initiatives = Array.isArray(window.ASHA_INITIATIVES) ? window.ASHA_INITIATIVES : [];
  const news = Array.isArray(window.ASHA_NEWS) ? window.ASHA_NEWS : [];
  const events = Array.isArray(window.ASHA_EVENTS) ? window.ASHA_EVENTS : [];
  const legacyUpdates = Array.isArray(window.ASHA_UPDATES) ? window.ASHA_UPDATES : [];

  function formatDate(value) {
    if (!value) return "";
    const parsed = new Date(value + (String(value).indexOf("T") === -1 ? "T00:00:00" : ""));
    if (isNaN(parsed.getTime())) return String(value);
    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function parseDayMonth(value) {
    if (!value) return { day: "--", month: "TBD" };
    const parsed = new Date(value + (String(value).indexOf("T") === -1 ? "T00:00:00" : ""));
    if (isNaN(parsed.getTime())) return { day: "", month: String(value) };
    return {
      day: parsed.getDate(),
      month: parsed.toLocaleDateString("en-IN", { month: "short" })
    };
  }

  /* --- INITIATIVE CARD BUILDER --- */
  function buildInitiativeCard(item) {
    const card = document.createElement("article");
    card.className = "initiative-card";
    card.setAttribute("data-category", item.category || "other");

    const header = document.createElement("div");
    header.className = "initiative-card-header";

    const catBadge = document.createElement("span");
    catBadge.className = "card-badge card-badge--category";
    catBadge.textContent = item.category ? item.category.toUpperCase() : "INITIATIVE";
    header.appendChild(catBadge);

    const statusBadge = document.createElement("span");
    if (item.status && ["Planned", "Ongoing", "Completed"].includes(item.status)) {
      statusBadge.className = "card-badge card-badge--status";
      statusBadge.textContent = item.status.toUpperCase();
    } else {
      statusBadge.className = "client-data-required";
      statusBadge.textContent = "STATUS: CLIENT DATA REQUIRED";
    }
    header.appendChild(statusBadge);
    card.appendChild(header);

    const title = document.createElement("h3");
    title.className = "initiative-card-title";
    title.textContent = item.title || "Untitled Initiative";
    card.appendChild(title);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "initiative-card-desc";
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    const meta = document.createElement("div");
    meta.className = "initiative-card-meta";
    if (item.date) {
      const dateEl = document.createElement("span");
      dateEl.innerHTML = "<strong>Date:</strong> " + formatDate(item.date);
      meta.appendChild(dateEl);
    }
    if (item.location) {
      const locEl = document.createElement("span");
      locEl.innerHTML = "<strong>Location:</strong> " + item.location;
      meta.appendChild(locEl);
    }
    if (meta.children.length > 0) {
      card.appendChild(meta);
    }

    // Additional structured details if verified
    const details = document.createElement("div");
    details.className = "initiative-card-details";
    let hasDetails = false;

    if (item.participants) {
      const p = document.createElement("p");
      p.innerHTML = "<strong>Participants:</strong> " + item.participants;
      details.appendChild(p);
      hasDetails = true;
    }
    if (item.outcome) {
      const o = document.createElement("p");
      o.innerHTML = "<strong>Outcome:</strong> " + item.outcome;
      details.appendChild(o);
      hasDetails = true;
    }
    if (hasDetails) {
      card.appendChild(details);
    }

    // Media / Photo Handling
    if (item.image) {
      const img = document.createElement("img");
      img.className = "initiative-card-image";
      img.src = item.image;
      img.alt = item.title || "Initiative photograph";
      card.appendChild(img);
    } else {
      const photoReq = document.createElement("div");
      photoReq.className = "client-data-required client-data-required--photo";
      photoReq.style.maxWidth = "220px";
      photoReq.style.height = "120px";
      photoReq.style.margin = "16px 0";
      photoReq.textContent = "CLIENT PHOTOS REQUIRED";
      card.appendChild(photoReq);
    }

    // Links & Documents
    const linksRow = document.createElement("div");
    linksRow.className = "card-links-row";
    if (item.document) {
      const docLink = document.createElement("a");
      docLink.className = "mission-more";
      docLink.href = item.document;
      docLink.download = "";
      docLink.textContent = "Supporting Document (PDF) \u2192";
      linksRow.appendChild(docLink);
    }
    if (item.link) {
      const extLink = document.createElement("a");
      extLink.className = "mission-more";
      extLink.href = item.link;
      if (/^https?:/i.test(item.link)) {
        extLink.target = "_blank";
        extLink.rel = "noopener noreferrer";
      }
      extLink.textContent = "Official Notice \u2192";
      linksRow.appendChild(extLink);
    }
    if (linksRow.children.length > 0) {
      card.appendChild(linksRow);
    }

    return card;
  }

  /* --- NEWS CARD BUILDER --- */
  function buildNewsCard(item) {
    const card = document.createElement("article");
    card.className = "news-card";

    const meta = document.createElement("div");
    meta.className = "news-card-meta";

    const cat = document.createElement("span");
    cat.className = "news-card-category";
    cat.textContent = item.category || "OFFICIAL NOTICE";
    meta.appendChild(cat);

    if (item.date) {
      const dateEl = document.createElement("span");
      dateEl.className = "news-card-date";
      dateEl.textContent = formatDate(item.date);
      meta.appendChild(dateEl);
    }
    card.appendChild(meta);

    const title = document.createElement("h3");
    title.className = "news-card-title";
    title.textContent = item.title || "Untitled Circular";
    card.appendChild(title);

    if (item.summary || item.description) {
      const summary = document.createElement("p");
      summary.className = "news-card-summary";
      summary.textContent = item.summary || item.description;
      card.appendChild(summary);
    }

    if (item.image) {
      const img = document.createElement("img");
      img.className = "news-card-image";
      img.src = item.image;
      img.alt = item.title || "News photograph";
      card.appendChild(img);
    } else {
      const imgReq = document.createElement("div");
      imgReq.style.margin = "12px 0";
      imgReq.innerHTML = '<span class="client-data-required">CLIENT IMAGE REQUIRED</span>';
      card.appendChild(imgReq);
    }

    const linksRow = document.createElement("div");
    linksRow.className = "card-links-row";
    if (item.document) {
      const docLink = document.createElement("a");
      docLink.className = "mission-more";
      docLink.href = item.document;
      docLink.download = "";
      docLink.textContent = "Download Circular (PDF) \u2192";
      linksRow.appendChild(docLink);
    }
    if (item.link) {
      const extLink = document.createElement("a");
      extLink.className = "mission-more";
      extLink.href = item.link;
      if (/^https?:/i.test(item.link)) {
        extLink.target = "_blank";
        extLink.rel = "noopener noreferrer";
      }
      extLink.textContent = "Read full notice \u2192";
      linksRow.appendChild(extLink);
    }
    if (linksRow.children.length > 0) {
      card.appendChild(linksRow);
    }

    return card;
  }

  /* --- EVENT CARD BUILDER --- */
  function buildEventCard(item) {
    const card = document.createElement("article");
    card.className = "event-card";

    const dateBox = document.createElement("div");
    dateBox.className = "event-date-box";
    const dateParts = parseDayMonth(item.date);
    dateBox.innerHTML = '<div class="event-date-day">' + dateParts.day + '</div><div class="event-date-month">' + dateParts.month + '</div>';
    card.appendChild(dateBox);

    const body = document.createElement("div");
    body.className = "event-card-body";

    const meta = document.createElement("div");
    meta.className = "event-card-meta";
    const typeBadge = document.createElement("span");
    typeBadge.className = "card-badge card-badge--category";
    typeBadge.textContent = item.type ? item.type.toUpperCase() : "EVENT";
    meta.appendChild(typeBadge);

    if (item.time) {
      const timeEl = document.createElement("span");
      timeEl.textContent = item.time;
      meta.appendChild(timeEl);
    }
    if (item.location) {
      const locEl = document.createElement("span");
      locEl.textContent = item.location;
      meta.appendChild(locEl);
    }
    body.appendChild(meta);

    const title = document.createElement("h3");
    title.className = "event-card-title";
    title.textContent = item.title || "Scheduled Association Session";
    body.appendChild(title);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "event-card-desc";
      desc.textContent = item.description;
      body.appendChild(desc);
    }

    const details = document.createElement("div");
    details.className = "event-card-details";
    if (item.organizer) {
      const org = document.createElement("p");
      org.innerHTML = "<strong>Organizer:</strong> " + item.organizer;
      details.appendChild(org);
    }
    if (item.participants) {
      const part = document.createElement("p");
      part.innerHTML = "<strong>Participants:</strong> " + item.participants;
      details.appendChild(part);
    }
    if (item.registration) {
      const reg = document.createElement("p");
      reg.innerHTML = "<strong>Registration:</strong> " + item.registration;
      details.appendChild(reg);
    }
    if (details.children.length > 0) {
      body.appendChild(details);
    }

    if (item.image) {
      const img = document.createElement("img");
      img.className = "event-card-image";
      img.src = item.image;
      img.alt = item.title || "Event photograph";
      body.appendChild(img);
    } else {
      const photoReq = document.createElement("div");
      photoReq.className = "client-data-required client-data-required--photo";
      photoReq.style.maxWidth = "200px";
      photoReq.style.height = "100px";
      photoReq.style.margin = "12px 0";
      photoReq.textContent = "CLIENT PHOTOS REQUIRED";
      body.appendChild(photoReq);
    }

    if (item.document || item.link) {
      const linksRow = document.createElement("div");
      linksRow.className = "card-links-row";
      if (item.document) {
        const doc = document.createElement("a");
        doc.className = "mission-more";
        doc.href = item.document;
        doc.download = "";
        doc.textContent = "Event Agenda (PDF) \u2192";
        linksRow.appendChild(doc);
      }
      if (item.link) {
        const ext = document.createElement("a");
        ext.className = "mission-more";
        ext.href = item.link;
        if (/^https?:/i.test(item.link)) {
          ext.target = "_blank";
          ext.rel = "noopener noreferrer";
        }
        ext.textContent = "RSVP / Details \u2192";
        linksRow.appendChild(ext);
      }
      body.appendChild(linksRow);
    }

    card.appendChild(body);
    return card;
  }

  /* --- RENDER INITIATIVES IN CATEGORY CONTAINERS --- */
  function renderInitiatives() {
    const categoryContainers = document.querySelectorAll("[data-initiative-category]");
    categoryContainers.forEach(function (container) {
      const category = container.getAttribute("data-initiative-category");
      const emptyBox = container.querySelector("[data-empty-indicator]");
      const list = container.querySelector(".initiative-items-list");

      const items = initiatives.filter(function (it) {
        return it.category === category || (!it.category && category === "other");
      });

      if (items.length > 0 && list) {
        list.innerHTML = "";
        items.forEach(function (it) {
          list.appendChild(buildInitiativeCard(it));
        });
        list.hidden = false;
        if (emptyBox) emptyBox.hidden = true;
      } else {
        if (list) list.hidden = true;
        if (emptyBox) emptyBox.hidden = false;
      }
    });

    // Also support global initiatives list if present
    const globalList = document.querySelector("[data-initiatives-list]");
    const globalEmpty = document.querySelector("[data-initiatives-empty]");
    if (globalList) {
      if (initiatives.length > 0) {
        globalList.innerHTML = "";
        initiatives.forEach(function (it) {
          globalList.appendChild(buildInitiativeCard(it));
        });
        globalList.hidden = false;
        if (globalEmpty) globalEmpty.hidden = true;
      } else {
        globalList.hidden = true;
        if (globalEmpty) globalEmpty.hidden = false;
      }
    }
  }

  /* --- RENDER NEWS --- */
  function renderNews() {
    const list = document.querySelector("[data-news-list]");
    const emptyBox = document.querySelector("[data-news-empty]");
    if (!list) return;

    if (news.length > 0) {
      list.innerHTML = "";
      news.forEach(function (item) {
        list.appendChild(buildNewsCard(item));
      });
      list.hidden = false;
      if (emptyBox) emptyBox.hidden = true;
    } else {
      list.hidden = true;
      if (emptyBox) emptyBox.hidden = false;
    }
  }

  /* --- RENDER EVENTS --- */
  function renderEvents() {
    const list = document.querySelector("[data-events-list]");
    const emptyBox = document.querySelector("[data-events-empty]");
    if (!list) return;

    if (events.length > 0) {
      list.innerHTML = "";
      events.forEach(function (item) {
        list.appendChild(buildEventCard(item));
      });
      list.hidden = false;
      if (emptyBox) emptyBox.hidden = true;
    } else {
      list.hidden = true;
      if (emptyBox) emptyBox.hidden = false;
    }
  }

  /* --- HOMEPAGE / LEGACY [data-updates] HANDLER --- */
  function renderLegacyUpdates() {
    const roots = document.querySelectorAll("[data-updates]");
    roots.forEach(function (root) {
      const list = root.querySelector("[data-updates-list]");
      if (!list) return;

      const kindStr = root.getAttribute("data-kind") || "";
      const kinds = kindStr.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      const limit = parseInt(root.getAttribute("data-limit") || "0", 10);

      // Consolidate legacy updates and verified arrays
      let pool = [];
      if (legacyUpdates.length > 0) pool = pool.concat(legacyUpdates);
      if (initiatives.length > 0 && (!kinds.length || kinds.includes("initiative"))) pool = pool.concat(initiatives);
      if (news.length > 0 && (!kinds.length || kinds.includes("news"))) pool = pool.concat(news);

      let rows = pool.filter(function (item) {
        return !kinds.length || kinds.indexOf(item.kind || item.category) !== -1;
      });

      if (limit > 0) rows = rows.slice(0, limit);

      const emptyEl = root.querySelector("[data-updates-empty]");
      const needsEl = root.querySelector("[data-updates-needs]");

      if (rows.length > 0) {
        list.innerHTML = "";
        rows.forEach(function (item) {
          list.appendChild(buildNewsCard(item));
        });
        list.hidden = false;
        if (emptyEl) emptyEl.hidden = true;
        if (needsEl) needsEl.hidden = true;
      } else {
        list.hidden = true;
        if (emptyEl) emptyEl.hidden = true;
        if (needsEl) needsEl.hidden = false;
      }
    });
  }

  /* --- INITIATIVE CATEGORY FILTER BUTTONS --- */
  function bindInitiativeFilters() {
    const filterButtons = document.querySelectorAll("[data-initiative-filter]");
    const blocks = document.querySelectorAll(".initiative-category-block");
    if (!filterButtons.length || !blocks.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = btn.getAttribute("data-initiative-filter");

        filterButtons.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });

        blocks.forEach(function (block) {
          const category = block.getAttribute("data-initiative-category");
          if (filter === "all" || category === filter) {
            block.hidden = false;
          } else {
            block.hidden = true;
          }
        });
      });
    });
  }

  /* --- TAB DEEP LINKING VIA HASH --- */
  function syncTabWithHash() {
    const hash = window.location.hash;
    if (!hash) return;
    const cleanId = hash.replace("#", "");

    // Try finding a button targeting this panel or matching the ID
    const targetPanel = document.getElementById(cleanId);
    if (!targetPanel) return;

    const tabBtn = document.querySelector('[role="tab"][aria-controls="' + cleanId + '"]');
    if (tabBtn) {
      tabBtn.click();
      targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* --- INITIALIZATION --- */
  function init() {
    renderInitiatives();
    renderNews();
    renderEvents();
    renderLegacyUpdates();
    bindInitiativeFilters();
    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
