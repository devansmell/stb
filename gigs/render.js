// Renders GIGS (from gigs-data.js) into the #gig-list element.
// Unknown slots (null) render as a fixed-width placeholder so the
// column layout doesn't jump around as real gigs get added.

const PLACEHOLDER = "?????????";

function renderGigs() {
  const list = document.getElementById("gig-list");
  if (!list || typeof GIGS === "undefined") return;

  const items = GIGS.map((gig) => {
    const li = document.createElement("li");

    if (gig && gig.moniker && gig.slug) {
      const a = document.createElement("a");
      a.className = "gig-entry";
      a.href = `/gigs/${gig.slug}.html`;
      a.textContent = `> ${gig.moniker}`;
      li.appendChild(a);
    } else {
      const span = document.createElement("span");
      span.className = "gig-entry is-placeholder";
      span.textContent = `> ${PLACEHOLDER}`;
      li.appendChild(span);
    }

    return li;
  });

  list.append(...items);
}

renderGigs();
