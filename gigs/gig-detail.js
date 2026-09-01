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
      posterImg.alt = `${gig.venue} gig poster`;
    } else {
      posterImg.closest(".gig-poster-wrap")?.remove();
    }
  }

  // venue / date
  const venueEl = document.getElementById("gig-venue");
  if (venueEl) venueEl.textContent = `${gig.venue}, ${gig.city}`;

  const dateEl = document.getElementById("gig-datetime");
  if (dateEl) dateEl.textContent = `${gig.dateDisplay} \u00B7 doors ${gig.doorsTime}`;

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

  // ticket / view-gig / fixed CTA
  const ctaEl = document.getElementById("gig-cta");
  if (ctaEl && gig.cta) {
    const a = document.createElement("a");
    a.className = "gig-cta-link";
    a.target = "_blank";
    a.rel = "noopener";

    if (gig.cta.fixed) {
      a.href = gig.cta.fixed.url;
      a.textContent = gig.cta.fixed.label;
    } else {
      // gig counts as "past" once the day itself has fully elapsed
      const eventEnd = new Date(`${gig.dateISO}T23:59:59`);
      const isPast = new Date() > eventEnd;

      if (isPast) {
        a.href = gig.cta.viewGigUrl || "https://instagram.com/splitthebill.ie";
        a.textContent = "view the gig";
      } else {
        a.href = gig.cta.ticketUrl;
        a.textContent = "tickets";
      }
    }

    ctaEl.appendChild(a);
  }
}

renderGigDetail();
