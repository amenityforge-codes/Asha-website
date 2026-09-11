(function () {
  const updates = Array.isArray(window.ASHA_UPDATES) ? window.ASHA_UPDATES : [];

  function kindsFrom(root) {
    return (root.getAttribute("data-kind") || "")
      .split(",")
      .map(function (value) {
        return value.trim();
      })
      .filter(Boolean);
  }

  function formatDate(value) {
    if (!value) return "";
    const parsed = new Date(value + (String(value).indexOf("T") === -1 ? "T00:00:00" : ""));
    if (isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function cardFor(item) {
    const article = document.createElement("article");
    article.className = "update-item";

    if (item.date) {
      const date = document.createElement("p");
      date.className = "update-date";
      date.textContent = formatDate(item.date);
      article.appendChild(date);
    }

    const title = document.createElement("h2");
    title.textContent = item.title || "";
    article.appendChild(title);

    if (item.description) {
      const description = document.createElement("p");
      description.className = "update-copy";
      description.textContent = item.description;
      article.appendChild(description);
    }

    if (item.image) {
      const image = document.createElement("img");
      image.className = "update-image";
      image.src = item.image;
      image.alt = item.title || "";
      article.appendChild(image);
    }

    if (item.link) {
      const link = document.createElement("a");
      link.className = "update-link";
      link.href = item.link;
      if (/^https?:/i.test(item.link)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      link.textContent = "Read more";
      article.appendChild(link);
    }

    return article;
  }

  document.querySelectorAll("[data-updates]").forEach(function (root) {
    const list = root.querySelector("[data-updates-list]");
    if (!list) return;

    const kinds = kindsFrom(root);
    const limit = parseInt(root.getAttribute("data-limit") || "0", 10);
    let rows = updates.filter(function (item) {
      return !kinds.length || kinds.indexOf(item.kind) !== -1;
    });
    rows.sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    if (limit > 0) rows = rows.slice(0, limit);

    list.textContent = "";
    rows.forEach(function (item) {
      list.appendChild(cardFor(item));
    });

    const needs = root.querySelector("[data-updates-needs]");
    if (needs) needs.hidden = rows.length > 0;

    const empty = root.querySelector("[data-updates-empty]");
    if (empty) empty.hidden = !(updates.length > 0 && rows.length === 0);
  });
})();
