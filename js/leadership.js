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
  if (data.president && data.president.verified && data.president.name) {
    const nameEl = document.getElementById("president-name");
    if (nameEl) nameEl.textContent = data.president.name;

    const bioEl = document.getElementById("president-bio");
    if (bioEl && data.president.bio) bioEl.textContent = data.president.bio;

    const photoEl = document.getElementById("president-photo");
    if (photoEl && data.president.photo) {
      const img = document.createElement("img");
      img.src = data.president.photo;
      img.alt = data.president.name;
      img.className = "leader-photo-img";
      photoEl.innerHTML = "";
      photoEl.className = "leader-photo-wrap";
      photoEl.appendChild(img);
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

  // 4. President's Statement dynamic ingestion (if verified client content is supplied)
  const statementData = window.ASHA_PRESIDENT_STATEMENT || (data && data.presidentStatement);
  if (statementData && statementData.verified && statementData.content) {
    const cardEl = document.getElementById("president-statement-state");
    const bodyEl = document.getElementById("president-statement-body");
    const photoEl = document.getElementById("president-statement-photo");

    if (bodyEl) {
      bodyEl.innerHTML = statementData.content;
      bodyEl.hidden = false;
    }

    if (photoEl && statementData.photo) {
      const img = document.createElement("img");
      img.src = statementData.photo;
      img.alt = statementData.title || "President of ASHA";
      img.className = "leader-photo-img";
      photoEl.innerHTML = "";
      photoEl.className = "leader-photo-wrap";
      photoEl.style.width = "140px";
      photoEl.style.height = "140px";
      photoEl.style.margin = "0 auto 18px";
      photoEl.appendChild(img);
    }

    const reqBadge = cardEl ? cardEl.querySelector(".client-data-required") : null;
    if (reqBadge) reqBadge.hidden = true;
  }
})();
