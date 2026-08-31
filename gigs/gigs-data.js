/*
  GIGS DATA
  ---------
  One entry per slot on the gigs page. There are always 25 slots.

  Leave a slot as `null` if the gig isn't announced yet — it will render
  as a row of "?????????" placeholders (not clickable, no hover state).

  To add a real gig, replace `null` with an object like:

    { moniker: "Whelans, Dublin — 12 Sept", slug: "whelans-dublin-2026" }

  - "moniker" is the text shown on the gigs page.
  - "slug" builds the link: it will point to /gigs/<slug>.html
    So the above example links to /gigs/whelans-dublin-2026.html
    Copy gigs/_template.html to that filename and edit it for the gig.

  Don't add or remove slots — just swap null <-> object. Keeping all
  25 slots present keeps the two-column layout stable.
*/

const GIGS = [
  { moniker: "SPLIT THE BILL @ Róisín Dubh — 27th June 2026", slug: "stb1-rdubh-2026" }, // 1
  { moniker: "Róisín Dubh — Culture Night 2026", slug: "culturenight-rdubh-2026" }, //2
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
