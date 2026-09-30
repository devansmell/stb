/*
  GIGS DATA
  ---------
  This is the ONLY place gig info gets typed in. Both the listing
  page (/gigs/) and each gig's own page (/gigs/<slug>.html) read
  from this file -nothing is duplicated by hand anymore.

  There are always 25 slots. Leave a slot as `null` if the gig
  isn't announced yet, it renders as a row of "?????????" on the
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
                  (optional -leave "" if there's no poster yet, and the
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
    gallery       optional. Leave this out entirely (or set to null)
                  until the gig's photos are back from whoever shot it.
                  Once they're in, add:

                    gallery: {
                      blurb: "a line or two about the night",
                      photos: [
                        {
                          src: "/gigs/photos/<slug>/01.jpg",
                          alt: "short description for screen readers",
                          credit: "Photographer Name",
                          instagram: "theirhandle"   // optional, "" to skip
                        },
                        ...
                      ]
                    }

                  Drop the actual image files in gigs/photos/<slug>/
                  (make the folder if it doesn't exist). Resize photos
                  to ~1600px on the long edge before adding them –
                  keeps the gallery fast to load (same reason the
                  posters got compressed). The gallery renders as a
                  click-to-expand grid automatically; nothing else to
                  build per gig.

  SEO NOTE: the meta tags / JSON-LD at the top of each gigs/<slug>.html
  file are NOT pulled from here – those have to stay as plain static
  text for search engines and social platforms that don't run
  JavaScript to read them. So when you fill in a gig here, you'll also
  paste the same venue/date/lineup into that page's <head> once. That's
  the one bit of duplication that can't be avoided – everything in the
  visible page body comes from this file only.
*/

const GIGS = [
  {
    slug: "stb1-rdubh-2026",
    moniker: "SPLIT THE BILL @ Róisín Dubh – 27th June 2026",
    venue: "Róisín Dubh",
    city: "GALWAY",
    dateISO: "2026-06-27",
    dateDisplay: "27 June 2026",
    doorsTime: "5pm",
    poster: "/gigs/posters/stb1-rdubh-2026.jpg",
    lineup: [
      { name: "TaLLLon", instagram: "talllon_band" },
      { name: "Cats!", instagram: "catsrealband" },
      { name: "Redline", instagram: "redline_galwayband" },
      { name: "Hell Yeah!", instagram: "hellyeahmakesmusic" },
      { name: "Villainessica", instagram: "villainessica" },
      { name: "Mentality", instagram: "mentalityband.ie" }
    ],
    cta: {
      ticketUrl: "https://instagram.com/splitthebillgig",
      viewGigUrl: "https://instagram.com/splitthebillgig"
    },
    gallery: {
      blurb: "moments from our first gig captured by the super talented media team :)",
      photos: [
        { src: "/gigs/photos/stb1-rdubh-2026/1.jpg", alt: "Cats! Shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
        { src: "/gigs/photos/stb1-rdubh-2026/2.jpg", alt: "Cats! Shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
        { src: "/gigs/photos/stb1-rdubh-2026/3.jpg", alt: "Mentality Shot by Ace", credit: "Ace (@tehya.jpeg)", instagram: "tehya.jpeg" },
        { src: "/gigs/photos/stb1-rdubh-2026/4.jpg", alt: "Hell Yeah! Shot by Aimee King", credit: "Aimee King", instagram: "aimeedotmusic" },
        { src: "/gigs/photos/stb1-rdubh-2026/5.jpg", alt: "Redline Shot By Kamile", credit: "Kamile (@withacinnamongirl)", instagram: "withacinnamongirl" },
        { src: "/gigs/photos/stb1-rdubh-2026/6.jpg", alt: "TaLLLon shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
        { src: "/gigs/photos/stb1-rdubh-2026/7.jpg", alt: "TaLLLon shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
        { src: "/gigs/photos/stb1-rdubh-2026/8.jpg", alt: "Villainessica shot by Ace", credit: "Ace (@tehya.jpeg)", instagram: "tehya.jpeg" }
      ]
    }
  }, // 1
  {
    slug: "culturenight-rdubh-2026",
    moniker: "Róisín Dubh – Culture Night 2026",
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
    },
    gallery: {
      blurb: "MEDIA FROM CULTURE NIGHT!!",
      photos: [
        { src: "/gigs/photos/culturenight-rdubh-2026/01.jpg", alt: "Cats! Shot by @bethanstills", credit: "@bethanstills", instagram: "bethanstills" },
        { src: "/gigs/photos/culturenight-rdubh-2026/02.jpg", alt: "Copernicus II shot by Kamile", credit: "Kamile (@withacinnamongirl)", instagram: "withacinnamongirl" },
        { src: "/gigs/photos/culturenight-rdubh-2026/03.jpg", alt: "Copernicus II shot by @shotbyaoifee", credit: "@shotbyaoifee", instagram: "shotbyaoifee" },
        { src: "/gigs/photos/culturenight-rdubh-2026/04.jpg", alt: "Crowd shot by Kamile", credit: "Kamile (@withacinnamongirl)", instagram: "withacinnamongirl" },
        { src: "/gigs/photos/culturenight-rdubh-2026/05.jpg", alt: "Copernicus II shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
        { src: "/gigs/photos/culturenight-rdubh-2026/06.jpg", alt: "Infared shot by Kamile", credit: "Kamile (@withacinnamongirl)", instagram: "withacinnamongirl" },
		{ src: "/gigs/photos/culturenight-rdubh-2026/07.jpg", alt: "Big Nothing shot by @shotbyaoifee", credit: "@shotbyaoifee", instagram: "shotbyaoifee" },
		{ src: "/gigs/photos/culturenight-rdubh-2026/08.jpg", alt: "Cats! Shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
		{ src: "/gigs/photos/culturenight-rdubh-2026/09.jpg", alt: "Crowd shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" },
		{ src: "/gigs/photos/culturenight-rdubh-2026/10.jpg", alt: "Big Nothing shot by Kamile", credit: "Kamile (@withacinnamongirl)", instagram: "withacinnamongirl" },
		{ src: "/gigs/photos/culturenight-rdubh-2026/11.jpg", alt: "Mentality shot by Dean Naylor", credit: "Dean Naylor", instagram: "deannaylorr" }
      ]
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
