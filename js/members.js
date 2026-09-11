(function () {
  const directory = document.getElementById("member-directory");
  if (!directory) return;

  const members = Array.isArray(window.ASHA_MEMBERS) ? window.ASHA_MEMBERS : [];
  const form = document.getElementById("member-filters");
  const citySelect = document.getElementById("filter-city");
  const needs = document.getElementById("member-needs");
  const empty = document.getElementById("member-empty");
  const template = document.getElementById("member-card-template");

  const CATEGORY_LABEL = {
    hotel: "Hotel Members",
    industry: "Industry Partners",
    institution: "Institutional Partners",
  };

  function unique(values) {
    return values
      .filter(Boolean)
      .filter(function (value, index, list) {
        return list.indexOf(value) === index;
      })
      .sort(function (a, b) {
        return a.localeCompare(b);
      });
  }

  function fillCityOptions() {
    if (!citySelect) return;
    const cities = unique(
      members.map(function (member) {
        return member.city;
      })
    );
    const current = citySelect.value;
    citySelect.innerHTML = "";
    const all = document.createElement("option");
    all.value = "";
    all.textContent = cities.length ? "All cities" : "No cities yet";
    citySelect.appendChild(all);
    cities.forEach(function (city) {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.disabled = cities.length === 0;
    if (cities.indexOf(current) !== -1) citySelect.value = current;
  }

  function matches(member, filters) {
    if (filters.category && member.category !== filters.category) return false;
    if (filters.district && member.district !== filters.district) return false;
    if (filters.city && member.city !== filters.city) return false;
    if (filters.classification && member.classification !== filters.classification) return false;
    return true;
  }

  function cardFor(member) {
    const node = template.content.firstElementChild.cloneNode(true);
    const image = node.querySelector("[data-field='image']");
    const fallback = node.querySelector("[data-field='fallback']");
    const category = node.querySelector("[data-field='category']");
    const name = node.querySelector("[data-field='name']");
    const meta = node.querySelector("[data-field='meta']");
    const profile = node.querySelector("[data-field='profile']");
    const website = node.querySelector("[data-field='website']");

    if (member.image) {
      image.src = member.image;
      image.alt = member.name || "";
      image.hidden = false;
      fallback.hidden = true;
    } else {
      image.hidden = true;
      fallback.hidden = false;
      fallback.textContent = (member.name || "?").slice(0, 1).toUpperCase();
    }

    category.textContent = CATEGORY_LABEL[member.category] || "";
    name.textContent = member.name || "";

    const metaParts = [];
    if (member.classification) metaParts.push(member.classification);
    if (member.city && member.district) metaParts.push(member.city + ", " + member.district);
    else if (member.city || member.district) metaParts.push(member.city || member.district);
    meta.textContent = metaParts.join(" · ");

    profile.textContent = member.profile || "";

    if (member.website) {
      website.href = member.website;
      website.target = "_blank";
      website.hidden = false;
    } else {
      website.hidden = true;
    }

    return node;
  }

  function render() {
    const filters = {
      category: form.category.value,
      district: form.district.value,
      city: form.city.value,
      classification: form.classification.value,
    };

    const filtered = members.filter(function (member) {
      return matches(member, filters);
    });

    ["hotel", "industry", "institution"].forEach(function (category) {
      const list = directory.querySelector('[data-list="' + category + '"]');
      const section = directory.querySelector('[data-section="' + category + '"]');
      list.innerHTML = "";
      const group = filtered.filter(function (member) {
        return member.category === category;
      });
      group.forEach(function (member) {
        list.appendChild(cardFor(member));
      });
      section.hidden = group.length === 0;
    });

    if (needs) needs.hidden = members.length > 0;
    if (empty) {
      empty.hidden = !(members.length > 0 && filtered.length === 0);
    }
  }

  fillCityOptions();
  render();

  form.addEventListener("change", render);
  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      fillCityOptions();
      render();
    }, 0);
  });
})();
