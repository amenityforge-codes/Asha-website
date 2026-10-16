/**
 * ASHA Leadership Dynamic Ingestion
 *
 * Inspects window.ASHA_LEADERSHIP and dynamically renders verified leadership records
 * if provided. If fields are missing/unverified, preserves the client-data-required state.
 */
(function () {
  const data = window.ASHA_LEADERSHIP;
  if (!data) return;

  // Helper: safely sanitize URL
  function isValidUrl(url) {
    if (typeof url !== "string") return false;
    return /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url.trim());
  }

  // 1. President dynamic update
  if (data.president) {
    if (data.president.verified && data.president.name) {
      const nameEl = document.getElementById("president-name");
      if (nameEl) nameEl.textContent = data.president.name;
    }

    if (data.president.verified && data.president.bio) {
      const bioEl = document.getElementById("president-bio");
      if (bioEl) bioEl.textContent = data.president.bio;
    }

    if (data.president.photo) {
      const photoEl = document.getElementById("president-photo");
      if (photoEl) {
        const img = document.createElement("img");
        img.src = data.president.photo;
        img.alt = data.president.name || "President of the Star Hotels Association of Andhra Pradesh";
        img.className = "leader-photo-img";
        photoEl.innerHTML = "";
        photoEl.className = "leader-photo-wrap";
        photoEl.appendChild(img);
      }
    }
  }

  // 2. General Secretary dynamic update
  if (data.generalSecretary && data.generalSecretary.verified && data.generalSecretary.name) {
    const nameEl = document.getElementById("general-secretary-name");
    if (nameEl) nameEl.textContent = data.generalSecretary.name;

    const bioEl = document.getElementById("general-secretary-bio");
    if (bioEl && data.generalSecretary.bio) bioEl.textContent = data.generalSecretary.bio;

    const photoEl = document.getElementById("general-secretary-photo");
    if (photoEl && data.generalSecretary.photo) {
      const img = document.createElement("img");
      img.src = data.generalSecretary.photo;
      img.alt = data.generalSecretary.name;
      img.className = "leader-photo-img";
      photoEl.innerHTML = "";
      photoEl.className = "leader-photo-wrap";
      photoEl.appendChild(img);
    }
  }

  // 3. Executive Committee dynamic rendering
  if (Array.isArray(data.executiveCommittee) && data.executiveCommittee.length > 0) {
    const committeeContainer = document.getElementById("executive-committee-state");
    if (committeeContainer) {
      committeeContainer.className = "leader-committee-grid";
      committeeContainer.innerHTML = "";
      data.executiveCommittee.forEach(function (member) {
        if (!member || !member.name) return;
        const card = document.createElement("article");
        card.className = "leader-slot";

        const photoDiv = document.createElement("div");
        photoDiv.className = "leader-photo";
        if (member.photo) {
          const img = document.createElement("img");
          img.src = member.photo;
          img.alt = member.name;
          photoDiv.appendChild(img);
        } else {
          photoDiv.textContent = member.name.slice(0, 1).toUpperCase();
        }

        const role = document.createElement("p");
        role.className = "leader-role";
        role.textContent = member.role || "Executive Committee Member";

        const name = document.createElement("h4");
        name.style.margin = "4px 0 0";
        name.textContent = member.name;

        card.appendChild(photoDiv);
        card.appendChild(role);
        card.appendChild(name);
        committeeContainer.appendChild(card);
      });
    }
  }

  // 4. ASHA in Action / Field Engagements dynamic rendering
  if (Array.isArray(data.events) && data.events.length > 0) {
    const eventsContainer = document.getElementById("events-state");
    if (eventsContainer) {
      eventsContainer.className = "leadership-events-list";
      eventsContainer.innerHTML = "";
      data.events.forEach(function (evt) {
        if (!evt || !evt.title) return;
        const card = document.createElement("article");
        card.className = "event-action-card";

        if (evt.photo) {
          const img = document.createElement("img");
          img.className = "event-action-img";
          img.src = evt.photo;
          img.alt = evt.title;
          img.loading = "lazy";
          card.appendChild(img);
        }

        const info = document.createElement("div");
        info.className = "event-action-info";

        const meta = document.createElement("p");
        meta.className = "event-action-meta";
        meta.textContent = (evt.eventType || "Official Engagement") + " \u2022 " + (evt.date || "") + (evt.location ? " \u2022 " + evt.location : "");
        info.appendChild(meta);

        const h3 = document.createElement("h3");
        h3.className = "event-action-title";
        h3.textContent = evt.title;
        info.appendChild(h3);

        if (evt.description) {
          const desc = document.createElement("p");
          desc.className = "event-action-desc";
          desc.textContent = evt.description;
          info.appendChild(desc);
        }

        const links = document.createElement("div");
        links.className = "card-links-row";
        links.innerHTML = '<a class="ks-button ks-button-primary" href="' + (evt.detailUrl || "news.html") + '">View Meeting Record & Media &rarr;</a> ' +
                          '<a class="ks-button ks-button-secondary" href="news.html">News & Events Registry &rarr;</a>';
        info.appendChild(links);

        card.appendChild(info);
        eventsContainer.appendChild(card);
      });

      // Hide trailing placeholder note if present
      const photoReqNotice = eventsContainer.nextElementSibling;
      if (photoReqNotice && photoReqNotice.tagName === "P" && photoReqNotice.querySelector(".client-data-required")) {
        photoReqNotice.style.display = "none";
      }
    }
  }
})();
