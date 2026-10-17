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
      extLink.textContent = item.linkText || "View Details & Media \u2192";
      linksRow.appendChild(extLink);
    }
    if (linksRow.children.length > 0) {
      card.appendChild(linksRow);
    }

    return card;
  }

  /* --- LIGHTBOX MODULE --- */
  let activeGallery = [];
  let currentLightboxIdx = 0;
  let lightboxEl = null;
  let previousActiveElement = null;

  function ensureLightbox() {
    if (lightboxEl) return lightboxEl;
    let lb = document.getElementById("asha-lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "asha-lightbox";
      lb.className = "asha-lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Media gallery viewer");
      lb.setAttribute("hidden", "");
      lb.innerHTML = [
        '<div class="asha-lightbox-backdrop" data-lb-close></div>',
        '<div class="asha-lightbox-container">',
        '  <button type="button" class="asha-lightbox-close" data-lb-close aria-label="Close viewer">',
        '    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
        '  </button>',
        '  <div class="asha-lightbox-stage">',
        '    <button type="button" class="asha-lightbox-nav asha-lightbox-prev" data-lb-prev aria-label="Previous photograph">',
        '      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
        '    </button>',
        '    <div class="asha-lightbox-media-wrap">',
        '      <img class="asha-lightbox-img" src="" alt="" />',
        '    </div>',
        '    <button type="button" class="asha-lightbox-nav asha-lightbox-next" data-lb-next aria-label="Next photograph">',
        '      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        '    </button>',
        '  </div>',
        '  <div class="asha-lightbox-bar">',
        '    <div class="asha-lightbox-bar-left">',
        '      <span class="asha-lightbox-counter">1 of 1</span>',
        '      <span class="asha-lightbox-type-tag">EVENT PHOTOGRAPH</span>',
        '    </div>',
        '    <div class="asha-lightbox-bar-center">',
        '      <h4 class="asha-lightbox-title"></h4>',
        '      <p class="asha-lightbox-caption"></p>',
        '    </div>',
        '    <div class="asha-lightbox-bar-right">',
        '      <a class="asha-lightbox-raw-link" href="" target="_blank" rel="noopener noreferrer">View Original File \u2197</a>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join("\n");
      document.body.appendChild(lb);
    }
    lightboxEl = lb;

    // Attach listeners
    const closeBtns = lb.querySelectorAll("[data-lb-close]");
    closeBtns.forEach(function (b) { b.addEventListener("click", closeLightbox); });

    const prevBtn = lb.querySelector("[data-lb-prev]");
    if (prevBtn) prevBtn.addEventListener("click", function () { navigateLightbox(-1); });

    const nextBtn = lb.querySelector("[data-lb-next]");
    if (nextBtn) nextBtn.addEventListener("click", function () { navigateLightbox(1); });

    // Touch swipe support
    let touchStartX = 0;
    const stage = lb.querySelector(".asha-lightbox-stage");
    if (stage) {
      stage.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      stage.addEventListener("touchend", function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff < 0) navigateLightbox(1);
          else navigateLightbox(-1);
        }
      }, { passive: true });
    }

    return lightboxEl;
  }

  function handleLightboxKeyDown(e) {
    if (!lightboxEl || !lightboxEl.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigateLightbox(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigateLightbox(1);
    }
  }

  function openLightbox(gallery, startIndex) {
    if (!Array.isArray(gallery) || gallery.length === 0) return;
    activeGallery = gallery;
    currentLightboxIdx = typeof startIndex === "number" && startIndex >= 0 && startIndex < gallery.length ? startIndex : 0;
    
    ensureLightbox();
    previousActiveElement = document.activeElement;
    document.addEventListener("keydown", handleLightboxKeyDown);
    document.body.style.overflow = "hidden";

    updateLightboxStage();
    lightboxEl.removeAttribute("hidden");
    requestAnimationFrame(function () {
      lightboxEl.classList.add("is-open");
      const closeBtn = lightboxEl.querySelector(".asha-lightbox-close");
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove("is-open");
    document.removeEventListener("keydown", handleLightboxKeyDown);
    document.body.style.overflow = "";
    setTimeout(function () {
      lightboxEl.setAttribute("hidden", "");
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    }, 250);
  }

  function navigateLightbox(step) {
    if (!activeGallery.length) return;
    currentLightboxIdx = (currentLightboxIdx + step + activeGallery.length) % activeGallery.length;
    updateLightboxStage();
  }

  function updateLightboxStage() {
    if (!lightboxEl || !activeGallery.length) return;
    const item = activeGallery[currentLightboxIdx];
    const img = lightboxEl.querySelector(".asha-lightbox-img");
    const counter = lightboxEl.querySelector(".asha-lightbox-counter");
    const typeTag = lightboxEl.querySelector(".asha-lightbox-type-tag");
    const title = lightboxEl.querySelector(".asha-lightbox-title");
    const caption = lightboxEl.querySelector(".asha-lightbox-caption");
    const rawLink = lightboxEl.querySelector(".asha-lightbox-raw-link");

    if (img) {
      img.src = item.src || "";
      img.alt = item.alt || item.title || "Meeting photograph";
    }
    if (counter) {
      counter.textContent = (currentLightboxIdx + 1) + " of " + activeGallery.length;
    }
    if (typeTag) {
      if (item.type === "press-clipping" || item.isPress) {
        typeTag.textContent = "REGIONAL NEWSPAPER ARCHIVE";
        typeTag.style.background = "rgba(217, 107, 39, 0.16)";
        typeTag.style.color = "var(--accent-deep)";
      } else {
        typeTag.textContent = "EVENT PHOTOGRAPH";
        typeTag.style.background = "rgba(7, 50, 90, 0.1)";
        typeTag.style.color = "var(--navy)";
      }
    }
    if (title) {
      title.textContent = item.title || "";
    }
    if (caption) {
      caption.textContent = item.caption || item.alt || "";
    }
    if (rawLink) {
      rawLink.href = item.originalFile || item.src || "";
    }
  }

  window.ASHA_OPEN_LIGHTBOX = openLightbox;

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

    // Media Gallery Block if gallery present
    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
      const mediaBlock = document.createElement("div");
      mediaBlock.className = "news-card-media-block";

      const featBtn = document.createElement("button");
      featBtn.type = "button";
      featBtn.className = "news-featured-media";
      featBtn.setAttribute("aria-label", "View photo gallery and press coverage in full viewer");
      
      const featImg = document.createElement("img");
      featImg.src = item.image || item.gallery[0].src;
      featImg.alt = item.gallery[0].alt || item.title || "Meeting photo";
      featImg.loading = "lazy";
      featBtn.appendChild(featImg);

      const overlay = document.createElement("div");
      overlay.className = "news-featured-overlay";
      overlay.innerHTML = '<span class="news-featured-badge"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> View Photo Gallery & Media (' + item.gallery.length + ' Items)</span>';
      featBtn.appendChild(overlay);

      featBtn.addEventListener("click", function () {
        openLightbox(item.gallery, 0);
      });
      mediaBlock.appendChild(featBtn);

      const strip = document.createElement("div");
      strip.className = "news-gallery-strip";
      item.gallery.forEach(function (gItem, idx) {
        const tBtn = document.createElement("button");
        tBtn.type = "button";
        tBtn.className = "news-gallery-thumb-btn";
        tBtn.setAttribute("aria-label", "View photo " + (idx + 1) + ": " + (gItem.title || "Photograph"));
        
        const tImg = document.createElement("img");
        tImg.src = gItem.src;
        tImg.alt = gItem.alt || gItem.title || "";
        tImg.loading = "lazy";
        tBtn.appendChild(tImg);

        const tag = document.createElement("span");
        if (gItem.type === "press-clipping" || gItem.isPress) {
          tag.className = "news-gallery-thumb-tag news-gallery-thumb-tag--press";
          tag.textContent = "Newspaper";
        } else {
          tag.className = "news-gallery-thumb-tag";
          tag.textContent = "Photo " + (idx + 1);
        }
        tBtn.appendChild(tag);

        tBtn.addEventListener("click", function () {
          openLightbox(item.gallery, idx);
        });
        strip.appendChild(tBtn);
      });
      mediaBlock.appendChild(strip);
      card.appendChild(mediaBlock);
    } else if (item.image) {
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

    // Dedicated Press Coverage Box
    if (item.pressCoverage) {
      const pressCard = document.createElement("div");
      pressCard.className = "news-press-coverage-card";

      const pThumbBtn = document.createElement("button");
      pThumbBtn.type = "button";
      pThumbBtn.className = "news-press-thumb-wrap";
      pThumbBtn.setAttribute("aria-label", "Inspect Telugu newspaper clipping in high resolution");
      const pImg = document.createElement("img");
      pImg.src = item.pressCoverage.clippingSrc;
      pImg.alt = "Telugu newspaper report by Andhra Jyothy covering the Star Hotels Association meeting with the Chief Minister";
      pImg.loading = "lazy";
      pThumbBtn.appendChild(pImg);

      const clippingIndex = Array.isArray(item.gallery) ? item.gallery.findIndex(function (g) { return g.type === "press-clipping" || g.isPress; }) : -1;
      pThumbBtn.addEventListener("click", function () {
        if (Array.isArray(item.gallery)) {
          openLightbox(item.gallery, clippingIndex !== -1 ? clippingIndex : 0);
        }
      });
      pressCard.appendChild(pThumbBtn);

      const pInfo = document.createElement("div");
      pInfo.className = "news-press-content";
      pInfo.innerHTML = '<h4>Regional Press Coverage</h4>' +
        '<p class="news-press-source">Source: ' + item.pressCoverage.source + (item.pressCoverage.portal ? ' &middot; ' + item.pressCoverage.portal : '') + '</p>' +
        '<p class="news-press-desc">' + item.pressCoverage.caption + '</p>' +
        '<p class="news-press-notice">' + item.pressCoverage.verificationNotice + '</p>';
      pressCard.appendChild(pInfo);

      card.appendChild(pressCard);
    }

    const linksRow = document.createElement("div");
    linksRow.className = "card-links-row";
    
    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
      const galBtn = document.createElement("button");
      galBtn.type = "button";
      galBtn.className = "ks-button ks-button-secondary";
      galBtn.textContent = "View Photo Gallery (" + item.gallery.length + " Items) \u2197";
      galBtn.addEventListener("click", function () {
        openLightbox(item.gallery, 0);
      });
      linksRow.appendChild(galBtn);
    }

    if (item.detailUrl) {
      const detLink = document.createElement("a");
      detLink.className = "ks-button ks-button-primary";
      detLink.href = item.detailUrl;
      detLink.textContent = "Read Full Meeting Record \u2192";
      linksRow.appendChild(detLink);
    }

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

    // Media Gallery Block
    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
      const mediaBlock = document.createElement("div");
      mediaBlock.className = "news-card-media-block";

      const strip = document.createElement("div");
      strip.className = "news-gallery-strip";
      item.gallery.forEach(function (gItem, idx) {
        const tBtn = document.createElement("button");
        tBtn.type = "button";
        tBtn.className = "news-gallery-thumb-btn";
        tBtn.setAttribute("aria-label", "View photo " + (idx + 1) + ": " + (gItem.title || "Photograph"));
        
        const tImg = document.createElement("img");
        tImg.src = gItem.src;
        tImg.alt = gItem.alt || gItem.title || "";
        tImg.loading = "lazy";
        tBtn.appendChild(tImg);

        const tag = document.createElement("span");
        if (gItem.type === "press-clipping" || gItem.isPress) {
          tag.className = "news-gallery-thumb-tag news-gallery-thumb-tag--press";
          tag.textContent = "Newspaper";
        } else {
          tag.className = "news-gallery-thumb-tag";
          tag.textContent = "Photo " + (idx + 1);
        }
        tBtn.appendChild(tag);

        tBtn.addEventListener("click", function () {
          openLightbox(item.gallery, idx);
        });
        strip.appendChild(tBtn);
      });
      mediaBlock.appendChild(strip);
      body.appendChild(mediaBlock);
    } else if (item.image) {
      const img = document.createElement("img");
      img.className = "event-card-image";
      img.src = item.image;
      img.alt = item.title || "Event photograph";
      body.appendChild(img);
    }

    const linksRow = document.createElement("div");
    linksRow.className = "card-links-row";
    
    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
      const galBtn = document.createElement("button");
      galBtn.type = "button";
      galBtn.className = "ks-button ks-button-secondary";
      galBtn.textContent = "View Photo Gallery (" + item.gallery.length + " Items) \u2197";
      galBtn.addEventListener("click", function () {
        openLightbox(item.gallery, 0);
      });
      linksRow.appendChild(galBtn);
    }

    if (item.detailUrl) {
      const detLink = document.createElement("a");
      detLink.className = "ks-button ks-button-primary";
      detLink.href = item.detailUrl;
      detLink.textContent = "Event Record Details \u2192";
      linksRow.appendChild(detLink);
    }

    if (item.document || item.link) {
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
    }

    if (linksRow.children.length > 0) {
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
      const sortedNews = news.slice().sort(function (a, b) {
        return new Date(b.date || 0) - new Date(a.date || 0);
      });
      sortedNews.forEach(function (item) {
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
      const sortedEvents = events.slice().sort(function (a, b) {
        return new Date(b.date || 0) - new Date(a.date || 0);
      });
      sortedEvents.forEach(function (item) {
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
