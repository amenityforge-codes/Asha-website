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

    const photoEl = document.getElementById("president-photo");
    if (photoEl) {
      if (data.president.photo) {
        const img = document.createElement("img");
        img.src = data.president.photo;
        img.alt = data.president.name || "President of the Star Hotels Association of Andhra Pradesh";
        photoEl.innerHTML = "";
        photoEl.appendChild(img);
      } else {
        photoEl.textContent = "RVS";
      }
    }
  }

  // 2. General Secretary dynamic update
  if (data.generalSecretary) {
    if (data.generalSecretary.verified && data.generalSecretary.name) {
      const nameEl = document.getElementById("general-secretary-name");
      if (nameEl) nameEl.textContent = data.generalSecretary.name;
    }

    if (data.generalSecretary.verified && data.generalSecretary.bio) {
      const bioEl = document.getElementById("general-secretary-bio");
      if (bioEl) bioEl.textContent = data.generalSecretary.bio;
    }

    const photoEl = document.getElementById("general-secretary-photo");
    if (photoEl) {
      if (data.generalSecretary.photo) {
        const img = document.createElement("img");
        img.src = data.generalSecretary.photo;
        img.alt = data.generalSecretary.name;
        photoEl.innerHTML = "";
        photoEl.appendChild(img);
      } else {
        photoEl.textContent = "SMC";
      }
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
        photoDiv.style.display = "grid";
        photoDiv.style.placeItems = "center";
        photoDiv.style.fontFamily = "var(--font-display)";
        photoDiv.style.fontSize = "1.8rem";
        photoDiv.style.fontWeight = "600";
        photoDiv.style.color = "var(--navy)";

        if (member.photo) {
          const img = document.createElement("img");
          img.src = member.photo;
          img.alt = member.name;
          photoDiv.appendChild(img);
        } else {
          const initials = member.name.split(" ").map(function (s) { return s[0]; }).join("").toUpperCase();
          photoDiv.textContent = initials || member.name.slice(0, 1).toUpperCase();
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
})();
