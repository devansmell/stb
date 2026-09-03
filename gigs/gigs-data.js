/*
  GIGS DATA
  ---------
  This is the ONLY place gig info gets typed in. Both the listing
  page (/gigs/) and each gig's own page (/gigs/<slug>.html) read
  from this file — nothing is duplicated by hand anymore.

  There are always 25 slots. Leave a slot as `null` if the gig
  isn't announced yet — it renders as a row of "?????????" on the
  listing page. Don't add or remove slots, just swap null <-> object.

  FIELDS (all required unless marked optional):

    slug          matches the filename: gigs/<slug>.html
    moniker       the text shown on the /gigs/ listing page
    venue         e.g. "Róisín Dubh"
    city          e.g. "Galway"
    dateISO       "YYYY-MM-DD", drives the ticket -> "view the gig" swap
    dateDisplay   human date, e.g. "27 June 2026"
    doorsTime     human time, e.g. "8pm" or "tba"
    poster        path to the poster image, e.g. "/gigs/posters/<slug>.jpg"
                  (optional — leave "" if there's no poster yet, and the
                  poster slot just won't render)
    lineup        array of { name, instagram }. instagram is optional,
                  leave it "" for acts without one / not linking it.
                  Leave the whole array empty ([]) if there's no lineup
                  breakdown for this gig.
    cta           either:
                    { fixed: { label: "...", url: "..." } }
                  for a link that's always the same regardless of date
                  (e.g. a free show pointing at the venue's listing), or:
                    { ticketUrl: "...", viewGigUrl: "..." }
                  for the automatic swap: shows "tickets" -> ticketUrl
                  before the gig, "view the gig" -> viewGigUrl the day
                  after (viewGigUrl can just be the main instagram as a
                  placeholder until photos are up).

  SEO NOTE: the meta tags / JSON-LD at the top of each gigs/<slug>.html
  file are NOT pulled from here — those have to stay as plain static
  text for search engines and social platforms that don't run
  JavaScript to read them. So when you fill in a gig here, you'll also
  paste the same venue/date/lineup into that page's <head> once. That's
  the one bit of duplication that can't be avoided — everything in the
  visible page body comes from this file only.
*/

const GIGS = [
  {
    slug: "stb1-rdubh-2026",
    moniker: "SPLIT THE BILL @ Róisín Dubh — 27th June 2026",
    venue: "Róisín Dubh",
    city: "GALWAY",
    dateISO: "2026-06-27",
    dateDisplay: "27 June 2026",
    doorsTime: "5pm",
    poster: "/gigs/posters/stb1-rdubh-2026.jpg",
    lineup: [],
    cta: {
      ticketUrl: "https://instagram.com/splitthebillgig",
      viewGigUrl: "https://instagram.com/splitthebillgig"
    }
  }, // 1
  {
    slug: "culturenight-rdubh-2026",
    moniker: "Róisín Dubh — Culture Night 2026",
    venue: "Róisín Dubh",
    city: "Galway",
    dateISO: "2026-09-18",
    dateDisplay: "18 Sept 2026",
    doorsTime: "5pm",
    poster: "/gigs/posters/culturenight-rdubh-2026.jpg",
    lineup: [
      { name: "Copernicus II", instagram: "copernicus_ii" },
      { name: "Big Nothing", instagram: "bignothing.band" },
      { name: "Cats!", instagram: "catsrealband" },
      { name: "Infared", instagram: "infared_band" },
      { name: "Mentality", instagram: "mentalityband.ie" }
    ],
    cta: {
      // free show, always points at the venue's own listing
      // no ticket/view-gig swap needed
      fixed: { label: "free in", url: "https://roisindubh.net/listings/split-the-bill-culture-night-takeover-2026-09-18-170000-81600" }
    }
  }, // 2
  null, // 3
  null, // 4
  null, // 5
  null, // 6
  null, // 7
  null, // 8
  null, // 9
  null, // 10
  null, // 11
  null, // 12
  null, // 13
  null, // 14
  null, // 15
  null, // 16
  null, // 17
  null, // 18
  null, // 19
  null, // 20
  null, // 21
  null, // 22
  null, // 23
  null, // 24
  null, // 25
];
