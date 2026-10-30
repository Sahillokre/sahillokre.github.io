/*
  Sahil Lokre — site settings.
  This is the only file you need to edit to fill in your details.
  Every concept reads from it, so a change here updates all five.
*/
window.SL_CONFIG = {
  // Your public email address, e.g. "name@example.com". Leave "" to show a placeholder.
  email: "sahil.lokre.05@gmail.com",

  // Full LinkedIn profile URL, e.g. "https://www.linkedin.com/in/your-handle". Leave "" to show a placeholder.
  linkedin: "https://www.linkedin.com/in/sahil-lokre-5756521a5/",

  // Path to your résumé PDF inside this folder, e.g. "assets/Sahil-Lokre-Resume.pdf". Leave "" to show a placeholder.
  resume: "assets/Sahil-Lokre-CV.pdf",

  // Instagram profile URL. Leave "" to show a placeholder.
  instagram: "https://www.instagram.com/saahil_12_05/",

  // Your photographs, in assets/photos/ (a full-size file and a "-t" thumbnail for each).
  photos: [
    { id: "watch-box", src: "assets/photos/watch-box.jpg", thumb: "assets/photos/watch-box-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 03", alt: "Green-dial wristwatch in a wooden box, with denim, a pen, a playing card and a lighter", ratio: [1920, 2400], tone: ["#1d1612", "#5a4636"] },
    { id: "earbuds-rope", src: "assets/photos/earbuds-rope.jpg", thumb: "assets/photos/earbuds-rope-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 05", alt: "Wireless earbuds case resting on coiled rope on dark wooden boards", ratio: [1920, 2400], tone: ["#1d1612", "#5a4636"] },
    { id: "cherry", src: "assets/photos/cherry.jpg", thumb: "assets/photos/cherry-t.jpg", category: "Still Life", tags: ["Still Life"], title: "No. 05", alt: "A single wet cherry on a wooden block in a beam of light", ratio: [1350, 2400], tone: ["#1d1612", "#5a4636"] },
    { id: "watch-dark", src: "assets/photos/watch-dark.jpg", thumb: "assets/photos/watch-dark-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 02", alt: "Wristwatch with a white dial on a dark table beside rope and a compass", ratio: [1350, 2400], tone: ["#1d1612", "#5a4636"] },
    { id: "garlic", src: "assets/photos/garlic.jpg", thumb: "assets/photos/garlic-t.jpg", category: "Still Life", tags: ["Still Life"], title: "No. 04", alt: "A garlic bulb on a wooden edge in a beam of light", ratio: [1350, 2400], tone: ["#1d1612", "#5a4636"] },
    { id: "handbag", src: "assets/photos/handbag.jpg", thumb: "assets/photos/handbag-t.jpg", category: "Commercial", tags: ["Commercial"], title: "No. 01", alt: "Quilted tan handbag with floating cosmetics on a turquoise background", ratio: [2110, 2400], tone: ["#1d1612", "#5a4636"] },
    { id: "handbag-duo", src: "assets/photos/handbag-duo.jpg", thumb: "assets/photos/handbag-duo-t.jpg", category: "Commercial", tags: ["Commercial"], title: "No. 02", alt: "Two quilted handbags, tan and black, floating on a soft teal background", ratio: [1800, 1560], tone: ["#1d1612", "#5a4636"] },
    { id: "backpack-split", src: "assets/photos/backpack-split.jpg", thumb: "assets/photos/backpack-split-t.jpg", category: "Commercial", tags: ["Commercial"], title: "No. 03", alt: "Quilted backpack split diagonally between blue and yellow", ratio: [1892, 1892], tone: ["#1d1612", "#5a4636"] },
    { id: "backpack-yellow", src: "assets/photos/backpack-yellow.jpg", thumb: "assets/photos/backpack-yellow-t.jpg", category: "Commercial", tags: ["Commercial"], title: "No. 04", alt: "Yellow quilted backpack floating on a yellow background", ratio: [1800, 1560], tone: ["#1d1612", "#5a4636"] },
    { id: "handbag-trio", src: "assets/photos/handbag-trio.jpg", thumb: "assets/photos/handbag-trio-t.jpg", category: "Commercial", tags: ["Commercial"], title: "No. 06", alt: "Three quilted handbags in tan, blush and black on a peach background", ratio: [1800, 1560], tone: ["#1d1612", "#5a4636"] },
    { id: "backpack-blue", src: "assets/photos/backpack-blue.jpg", thumb: "assets/photos/backpack-blue-t.jpg", category: "Commercial", tags: ["Commercial"], title: "No. 05", alt: "Blue quilted backpack floating on a blue background", ratio: [747, 642], tone: ["#1d1612", "#5a4636"] },
    { id: "smartwatch", src: "assets/photos/smartwatch.jpg", thumb: "assets/photos/smartwatch-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 07", alt: "White smartwatch and wireless earbuds on a rustic wooden crate", ratio: [736, 981], tone: ["#1d1612", "#5a4636"] },
    { id: "phone-desk", src: "assets/photos/phone-desk.jpg", thumb: "assets/photos/phone-desk-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 08", alt: "Smartphone on its box beside a laptop, a game controller, earbuds, a smartwatch and a charger", ratio: [736, 1104], tone: ["#1d1612", "#5a4636"] },
    { id: "tech-flatlay", src: "assets/photos/tech-flatlay.jpg", thumb: "assets/photos/tech-flatlay-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 06", alt: "Earbuds case on a world map with a watch, rope, keys, glasses, passport and compass", ratio: [736, 1308], tone: ["#1d1612", "#5a4636"] },
    { id: "watch-flat", src: "assets/photos/watch-flat.jpg", thumb: "assets/photos/watch-flat-t.jpg", category: "Watches & Tech", tags: ["Watches & Tech"], title: "No. 01", alt: "Steel wristwatch with a silver dial on a desk, with earbuds, a phone, glasses, coins and a notebook", ratio: [736, 1177], tone: ["#1d1612", "#5a4636"] },
    { id: "orange", src: "assets/photos/orange.jpg", thumb: "assets/photos/orange-t.jpg", category: "Still Life", tags: ["Still Life"], title: "No. 03", alt: "A peeled orange on a wooden post, side-lit in darkness", ratio: [1080, 1350], tone: ["#1d1612", "#5a4636"] },
    { id: "red-cup", src: "assets/photos/red-cup.jpg", thumb: "assets/photos/red-cup-t.jpg", category: "Still Life", tags: ["Still Life"], title: "No. 02", alt: "A red coffee cup among plants, jute and glassware", ratio: [735, 997], tone: ["#1d1612", "#5a4636"] },
    { id: "coffee", src: "assets/photos/coffee.jpg", thumb: "assets/photos/coffee-t.jpg", category: "Still Life", tags: ["Still Life"], title: "No. 01", alt: "A glass cup of tea with a moka pot and leaves in warm light", ratio: [736, 998], tone: ["#1d1612", "#5a4636"] },
    { id: "milkyway", src: "assets/photos/milkyway.jpg", thumb: "assets/photos/milkyway-t.jpg", category: "Astro", tags: ["Astro"], title: "Milky Way over a bicycle", ratio: [1501, 2400], tone: ["#05070f", "#27325a"] },
    { id: "me-wanderlust", src: "assets/photos/me-wanderlust.jpg", thumb: "assets/photos/me-wanderlust-t.jpg", category: "Personal", tags: ["Personal"], title: "Wanderlust, in the clouds", ratio: [2000, 1125], tone: ["#1d1612", "#5a4636"] },
    { id: "me-rainwalk", src: "assets/photos/me-rainwalk.jpg", thumb: "assets/photos/me-rainwalk-t.jpg", category: "Personal", tags: ["Personal"], title: "Walking in the rain", ratio: [1600, 2000], tone: ["#1d1612", "#5a4636"] },
    { id: "me-kothaligad", src: "assets/photos/me-kothaligad.jpg", thumb: "assets/photos/me-kothaligad-t.jpg", category: "Personal", tags: ["Personal"], title: "Kothaligad", ratio: [2000, 1125], tone: ["#1d1612", "#5a4636"] }
  ]
};
