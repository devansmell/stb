// Runs on individual gig pages (gigs/<slug>.html).
//
// Each gig page only needs to declare which gig it is:
//
//   <script>const PAGE_SLUG = "whelans-dublin-2026";</script>
//   <script src="/gigs/gigs-data.js"></script>
//   <script src="/gigs/gig-detail.js"></script>
//
// Everything else — poster, venue, date, lineup, ticket/view-gig link —
// is looked up from the matching entry in gigs-data.js. There's nothing
// else to edit on the page itself.

function renderGigDetail() {
  if (typeof PAGE_SLUG === "undefined" || typeof GIGS === "undefined") return;

  const gig = GIGS.find((g) => g && g.slug === PAGE_SLUG);
  if (!gig) {
    console.warn(`gig-detail.js: no entry in gigs-data.js with slug "${PAGE_SLUG}"`);
    return;
  }

  // poster
  const posterImg = document.getElementById("gig-poster");
  if (posterImg) {
    if (gig.poster) {
      posterImg.src = gig.poster;
      posterImg.alt = gig.title ? `${gig.title} poster` : `${gig.venue} gig poster`;
    } else {
      posterImg.closest(".gig-poster-wrap")?.remove();
    }
  }

  // venue / date
  const venueEl = document.getElementById("gig-venue");
  if (venueEl) venueEl.textContent = gig.title || `${gig.venue}, ${gig.city}`;

  const dateEl = document.getElementById("gig-datetime");
  if (dateEl) {
    const when = `${gig.dateDisplay} \u00B7 doors ${gig.doorsTime}`;
    if (gig.title) {
      dateEl.replaceChildren(`${gig.venue}, ${gig.city}`, document.createElement("br"), when);
    } else {
      dateEl.textContent = when;
    }
  }

  // lineup
  const lineupList = document.getElementById("lineup-list");
  if (lineupList) {
    if (gig.lineup && gig.lineup.length) {
      gig.lineup.forEach((band) => {
        const li = document.createElement("li");
        if (band.instagram) {
          const a = document.createElement("a");
          a.className = "lineup-link";
          a.href = `https://instagram.com/${band.instagram}`;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = band.name;
          li.appendChild(a);
        } else {
          li.textContent = band.name;
        }
        lineupList.appendChild(li);
      });
    } else {
      lineupList.remove();
    }
  }

  // ticket / view-gig / fixed / calendar CTA
  const ctaEl = document.getElementById("gig-cta");
  if (ctaEl && gig.cta) {
    // gig counts as "past" once the day itself has fully elapsed
    const isPast = new Date() > new Date(`${gig.dateISO}T23:59:59`);
    const links = [];

    if (gig.cta.fixed) {
      links.push({ label: gig.cta.fixed.label, url: gig.cta.fixed.url, external: true });
    } else if (isPast) {
      links.push({
        label: "view the gig",
        url: gig.cta.viewGigUrl || "https://instagram.com/splitthebill.ie",
        external: true
      });
    } else if (gig.cta.ticketUrl) {
      links.push({ label: "tickets", url: gig.cta.ticketUrl, external: true });
    }

    if (gig.cta.calendar && !isPast) {
      links.push({
        label: gig.cta.calendar.label || "add event to calendar",
        url: gig.cta.calendar.url,
        external: false,
        button: true
      });
    }

    links.forEach((item) => {
      const a = document.createElement("a");
      a.className = item.button ? "gig-cta-link gig-cta-button" : "gig-cta-link";
      a.href = item.url;
      a.textContent = item.label;
      if (item.external) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      ctaEl.appendChild(a);
    });
  }

  // expose the matched record so gallery.js (loaded after this file)
  // doesn't have to repeat the PAGE_SLUG lookup
  window.CURRENT_GIG = gig;
  document.dispatchEvent(new CustomEvent("gig:ready", { detail: gig }));
}

renderGigDetail();
