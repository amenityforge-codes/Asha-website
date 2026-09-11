(function () {
  const proof = window.ASHA_PROOF || {};
  const figures = proof.figures || {};
  const districts = Array.isArray(window.ASHA_DISTRICTS) ? window.ASHA_DISTRICTS : [];
  const members = Array.isArray(window.ASHA_MEMBERS) ? window.ASHA_MEMBERS : [];

  const fromMembers = members
    .map(function (member) {
      return member && member.district;
    })
    .filter(Boolean);

  const listed = Array.isArray(proof.representedDistricts) ? proof.representedDistricts : [];
  const represented = listed.length ? listed : fromMembers;

  document.querySelectorAll("[data-proof-stats]").forEach(function (root) {
    const keys = ["members", "rooms", "employees", "districts"];
    let any = false;
    keys.forEach(function (key) {
      const value = figures[key];
      const node = root.querySelector('[data-stat="' + key + '"]');
      if (!node) return;
      if (value !== null && value !== undefined && value !== "") {
        node.textContent = String(value);
        node.classList.add("is-set");
        any = true;
      }
    });
    const flag = root.querySelector("[data-figures-needs]");
    if (flag) flag.hidden = any;
  });

  document.querySelectorAll("[data-ap-map]").forEach(function (root) {
    const board = root.querySelector("[data-ap-map-board]");
    if (!board) return;
    board.textContent = "";
    districts.forEach(function (name) {
      const item = document.createElement("li");
      item.setAttribute("data-district", name);
      item.textContent = name;
      if (represented.indexOf(name) !== -1) item.classList.add("is-represented");
      board.appendChild(item);
    });
  });
})();
