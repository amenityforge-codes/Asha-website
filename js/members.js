/**
 * ASHA Member and Partner Directory Logic
 *
 * Implements accessible segmented tabs, per-category filtering (search, classification, partner type,
 * institution type, district, dynamic city), data validation, and dedicated empty states.
 */
(function () {
  const ecosystem = document.getElementById("member-ecosystem");
  if (!ecosystem) return;

  const template = document.getElementById("member-card-template");
  if (!template) return;

  // --- 1. DATA VALIDATION & EXTRACTION ---
  function isValidUrl(url) {
    if (typeof url !== "string") return false;
    var trimmed = url.trim();
    if (!trimmed) return false;
    try {
      var parsed = new URL(trimmed, window.location.origin);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  function validateHotel(item) {
    return Boolean(item && typeof item.name === "string" && item.name.trim());
  }

  function validateIndustry(item) {
    return Boolean(item && typeof item.name === "string" && item.name.trim());
  }

  function validateInstitution(item) {
    return Boolean(item && typeof item.name === "string" && item.name.trim());
  }

  function loadDatasets() {
    var hotels = Array.isArray(window.ASHA_HOTEL_MEMBERS) ? window.ASHA_HOTEL_MEMBERS.slice() : [];
    var industry = Array.isArray(window.ASHA_INDUSTRY_PARTNERS) ? window.ASHA_INDUSTRY_PARTNERS.slice() : [];
    var institutions = Array.isArray(window.ASHA_INSTITUTIONAL_PARTNERS) ? window.ASHA_INSTITUTIONAL_PARTNERS.slice() : [];

    // Support unified ASHA_MEMBERS array
    if (Array.isArray(window.ASHA_MEMBERS) && window.ASHA_MEMBERS.length > 0) {
      window.ASHA_MEMBERS.forEach(function (item) {
        if (!item || !item.name) return;
        var cat = (item.category || "").toLowerCase();
        if (cat === "hotel") hotels.push(item);
        else if (cat === "industry") industry.push(item);
        else if (cat === "institution") institutions.push(item);
      });
    }

    return {
      hotel: hotels.filter(validateHotel),
      industry: industry.filter(validateIndustry),
      institution: institutions.filter(validateInstitution),
    };
  }

  var datasets = loadDatasets();

  // --- 2. ACCESSIBLE TAB SWITCHING ---
  var tabButtons = Array.from(document.querySelectorAll('.member-tab[role="tab"]'));
  var tabPanels = {
    hotel: document.getElementById("panel-hotel"),
    industry: document.getElementById("panel-industry"),
    institution: document.getElementById("panel-institution"),
  };

  var activeCategory = "hotel";

  function switchTab(category, setFocus) {
    if (!tabPanels[category]) return;
    activeCategory = category;

    tabButtons.forEach(function (button) {
      var controls = button.getAttribute("aria-controls");
      var isTarget = controls === "panel-" + category;
      button.classList.toggle("is-active", isTarget);
      button.setAttribute("aria-selected", isTarget ? "true" : "false");
      button.setAttribute("tabindex", isTarget ? "0" : "-1");
      if (isTarget && setFocus) {
        button.focus();
      }
    });

    Object.keys(tabPanels).forEach(function (cat) {
      var panel = tabPanels[cat];
      if (!panel) return;
      var isTarget = cat === category;
      panel.hidden = !isTarget;
    });

    // Update URL hash without scroll jump
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + category);
    }
  }

  tabButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var controls = button.getAttribute("aria-controls");
      var category = controls ? controls.replace("panel-", "") : "hotel";
      switchTab(category, false);
    });

    button.addEventListener("keydown", function (e) {
      var targetIndex = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        targetIndex = (index + 1) % tabButtons.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        targetIndex = tabButtons.length - 1;
      }

      if (targetIndex !== -1) {
        var targetButton = tabButtons[targetIndex];
        var controls = targetButton.getAttribute("aria-controls");
        var category = controls ? controls.replace("panel-", "") : "hotel";
        switchTab(category, true);
      }
    });
  });

  // Handle URL hash on page load
  var initialHash = (window.location.hash || "").replace("#", "").toLowerCase();
  if (initialHash === "industry" || initialHash === "industry-partners") {
    switchTab("industry", false);
  } else if (initialHash === "institution" || initialHash === "institutional" || initialHash === "institutional-partners") {
    switchTab("institution", false);
  } else if (initialHash === "hotel" || initialHash === "hotel-members") {
    switchTab("hotel", false);
  }

  // --- 3. FILTER CONTROLS & CITY DROPDOWN ---
  var hotelForm = document.getElementById("hotel-filters");
  var industryForm = document.getElementById("industry-filters");
  var institutionForm = document.getElementById("institution-filters");
  var hotelCitySelect = document.getElementById("hotel-city");

  function uniqueSorted(values) {
    return values
      .filter(Boolean)
      .map(function (v) { return String(v).trim(); })
      .filter(function (val, idx, arr) { return val && arr.indexOf(val) === idx; })
      .sort(function (a, b) { return a.localeCompare(b); });
  }

  function setupHotelCities() {
    if (!hotelCitySelect) return;
    var cities = uniqueSorted(datasets.hotel.map(function (h) { return h.city; }));
    hotelCitySelect.innerHTML = "";

    var defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = cities.length ? "All cities" : "All cities";
    hotelCitySelect.appendChild(defaultOpt);

    cities.forEach(function (city) {
      var opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      hotelCitySelect.appendChild(opt);
    });

    hotelCitySelect.disabled = cities.length === 0;
  }

  // --- 4. FORMATTING & CARD CREATION ---
  function formatClassification(classification) {
    if (!classification) return "Classified Star Hotel";
    var c = String(classification).toLowerCase();
    if (c === "3-star" || c === "3 star" || c === "3") return "3-Star Hotel";
    if (c === "4-star" || c === "4 star" || c === "4") return "4-Star Hotel";
    if (c === "5-star" || c === "5 star" || c === "5") return "5-Star Hotel";
    if (c.indexOf("deluxe") !== -1 || c.indexOf("heritage") !== -1) return "Deluxe / Heritage";
    return classification;
  }

  function cardFor(item, category) {
    var node = template.content.firstElementChild.cloneNode(true);
    var img = node.querySelector("[data-field='image']");
    var fallback = node.querySelector("[data-field='fallback']");
    var badge = node.querySelector("[data-field='badge']");
    var name = node.querySelector("[data-field='name']");
    var meta = node.querySelector("[data-field='meta']");
    var profile = node.querySelector("[data-field='profile']");
    var websiteLink = node.querySelector("[data-field='website']");
    var websiteLabel = node.querySelector("[data-field='website-label']");

    // Title / Name
    if (name) name.textContent = item.name || "";

    // Image / Monogram fallback
    if (item.image && typeof item.image === "string" && item.image.trim()) {
      img.src = item.image.trim();
      img.alt = (item.name || "Member") + " logo or property";
      img.hidden = false;
      fallback.hidden = true;
      img.addEventListener("error", function () {
        img.hidden = true;
        fallback.hidden = false;
      });
    } else {
      img.hidden = true;
      fallback.hidden = false;
      var initial = (item.name || "?").trim().slice(0, 1).toUpperCase();
      fallback.textContent = initial;
    }

    // Category-specific Badge & Location
    if (category === "hotel") {
      if (badge) badge.textContent = formatClassification(item.classification);
      var locParts = [];
      if (item.city) locParts.push(item.city);
      if (item.district) locParts.push(item.district + (item.district.toLowerCase().indexOf("district") === -1 ? " District" : ""));
      if (meta) meta.textContent = locParts.join(", ") || "Andhra Pradesh";
      if (websiteLabel) websiteLabel.textContent = "View Website";
    } else if (category === "industry") {
      if (badge) badge.textContent = item.partnerType || "Industry Partner";
      var indLoc = [];
      if (item.city) indLoc.push(item.city);
      if (item.district) indLoc.push(item.district);
      if (meta) meta.textContent = indLoc.join(", ") || "Andhra Pradesh";
      if (websiteLabel) websiteLabel.textContent = "Visit Website";
    } else if (category === "institution") {
      if (badge) badge.textContent = item.institutionType || "Institutional Partner";
      var instLoc = [];
      if (item.city) instLoc.push(item.city);
      if (item.district) instLoc.push(item.district);
      if (meta) meta.textContent = instLoc.join(", ") || "Andhra Pradesh";
      if (websiteLabel) websiteLabel.textContent = "Visit Website";
    }

    // Profile / Description
    if (profile) {
      if (item.profile && typeof item.profile === "string" && item.profile.trim()) {
        profile.textContent = item.profile.trim();
        profile.hidden = false;
      } else {
        profile.hidden = true;
      }
    }

    // Website Link (safe check)
    if (websiteLink) {
      if (isValidUrl(item.website)) {
        websiteLink.href = item.website.trim();
        websiteLink.hidden = false;
      } else {
        websiteLink.hidden = true;
      }
    }

    return node;
  }

  // --- 5. CATEGORY RENDER FUNCTIONS ---
  function renderHotelCategory() {
    var emptyCard = document.getElementById("hotel-empty-state");
    var noMatch = document.getElementById("hotel-no-match");
    var grid = document.getElementById("hotel-grid");
    var records = datasets.hotel;

    if (records.length === 0) {
      if (emptyCard) emptyCard.hidden = false;
      if (noMatch) noMatch.hidden = true;
      if (grid) { grid.hidden = true; grid.innerHTML = ""; }
      return;
    }

    if (emptyCard) emptyCard.hidden = true;

    var searchVal = (hotelForm ? hotelForm.search.value : "").trim().toLowerCase();
    var classVal = (hotelForm ? hotelForm.classification.value : "").trim().toLowerCase();
    var distVal = (hotelForm ? hotelForm.district.value : "").trim().toLowerCase();
    var cityVal = (hotelForm ? hotelForm.city.value : "").trim().toLowerCase();

    var filtered = records.filter(function (h) {
      if (searchVal && (h.name || "").toLowerCase().indexOf(searchVal) === -1) return false;
      if (classVal) {
        var hClass = (h.classification || "").toLowerCase();
        if (classVal === "deluxe-heritage") {
          if (hClass.indexOf("deluxe") === -1 && hClass.indexOf("heritage") === -1) return false;
        } else if (hClass.indexOf(classVal) === -1) {
          return false;
        }
      }
      if (distVal && (h.district || "").toLowerCase() !== distVal) return false;
      if (cityVal && (h.city || "").toLowerCase() !== cityVal) return false;
      return true;
    });

    grid.innerHTML = "";
    if (filtered.length === 0) {
      if (noMatch) noMatch.hidden = false;
      grid.hidden = true;
    } else {
      if (noMatch) noMatch.hidden = true;
      grid.hidden = false;
      filtered.forEach(function (h) {
        grid.appendChild(cardFor(h, "hotel"));
      });
    }
  }

  function renderIndustryCategory() {
    var emptyCard = document.getElementById("industry-empty-state");
    var noMatch = document.getElementById("industry-no-match");
    var grid = document.getElementById("industry-grid");
    var records = datasets.industry;

    if (records.length === 0) {
      if (emptyCard) emptyCard.hidden = false;
      if (noMatch) noMatch.hidden = true;
      if (grid) { grid.hidden = true; grid.innerHTML = ""; }
      return;
    }

    if (emptyCard) emptyCard.hidden = true;

    var searchVal = (industryForm ? industryForm.search.value : "").trim().toLowerCase();
    var typeVal = (industryForm ? industryForm.partnerType.value : "").trim().toLowerCase();
    var distVal = (industryForm ? industryForm.district.value : "").trim().toLowerCase();

    var filtered = records.filter(function (p) {
      if (searchVal && (p.name || "").toLowerCase().indexOf(searchVal) === -1) return false;
      if (typeVal && (p.partnerType || "").toLowerCase() !== typeVal) return false;
      if (distVal && (p.district || "").toLowerCase() !== distVal) return false;
      return true;
    });

    grid.innerHTML = "";
    if (filtered.length === 0) {
      if (noMatch) noMatch.hidden = false;
      grid.hidden = true;
    } else {
      if (noMatch) noMatch.hidden = true;
      grid.hidden = false;
      filtered.forEach(function (p) {
        grid.appendChild(cardFor(p, "industry"));
      });
    }
  }

  function renderInstitutionCategory() {
    var emptyCard = document.getElementById("institution-empty-state");
    var noMatch = document.getElementById("institution-no-match");
    var grid = document.getElementById("institution-grid");
    var records = datasets.institution;

    if (records.length === 0) {
      if (emptyCard) emptyCard.hidden = false;
      if (noMatch) noMatch.hidden = true;
      if (grid) { grid.hidden = true; grid.innerHTML = ""; }
      return;
    }

    if (emptyCard) emptyCard.hidden = true;

    var searchVal = (institutionForm ? institutionForm.search.value : "").trim().toLowerCase();
    var typeVal = (institutionForm ? institutionForm.institutionType.value : "").trim().toLowerCase();
    var distVal = (institutionForm ? institutionForm.district.value : "").trim().toLowerCase();

    var filtered = records.filter(function (i) {
      if (searchVal && (i.name || "").toLowerCase().indexOf(searchVal) === -1) return false;
      if (typeVal && (i.institutionType || "").toLowerCase() !== typeVal) return false;
      if (distVal && (i.district || "").toLowerCase() !== distVal) return false;
      return true;
    });

    grid.innerHTML = "";
    if (filtered.length === 0) {
      if (noMatch) noMatch.hidden = false;
      grid.hidden = true;
    } else {
      if (noMatch) noMatch.hidden = true;
      grid.hidden = false;
      filtered.forEach(function (i) {
        grid.appendChild(cardFor(i, "institution"));
      });
    }
  }

  function renderAll() {
    renderHotelCategory();
    renderIndustryCategory();
    renderInstitutionCategory();
  }

  // --- 6. EVENT LISTENERS ---
  if (hotelForm) {
    hotelForm.addEventListener("input", renderHotelCategory);
    hotelForm.addEventListener("change", renderHotelCategory);
    hotelForm.addEventListener("reset", function () {
      setTimeout(renderHotelCategory, 0);
    });
  }

  if (industryForm) {
    industryForm.addEventListener("input", renderIndustryCategory);
    industryForm.addEventListener("change", renderIndustryCategory);
    industryForm.addEventListener("reset", function () {
      setTimeout(renderIndustryCategory, 0);
    });
  }

  if (institutionForm) {
    institutionForm.addEventListener("input", renderInstitutionCategory);
    institutionForm.addEventListener("change", renderInstitutionCategory);
    institutionForm.addEventListener("reset", function () {
      setTimeout(renderInstitutionCategory, 0);
    });
  }

  setupHotelCities();
  renderAll();
})();
