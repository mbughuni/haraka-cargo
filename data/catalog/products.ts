/**
 * PRODUCTS — edit this file to change the products on the site.
 *
 * DEMONSTRATION DATA: every product, price and minimum order below is a
 * sample for designing the store. Replace them with real supplier offers
 * before launch. The site labels them as demonstration data.
 *
 * Order matters: products appear on the site in the order listed here. The
 * homepage previews the first product of each category (in category order),
 * so put the product you want to feature first within its category.
 *
 * Prices are indicative, in Tanzanian shillings (TSh), whole numbers without
 * commas: write 2150000, not 2,150,000. They exclude freight, import duties
 * and delivery, which are added in the written quotation.
 *
 * To add a product, copy a block, change the `slug` and `reference` so they
 * are unique, and set `category` to an `id` from categories.ts. If you leave
 * out `image`, the category photo is shown.
 */
import type { CategoryId } from "@/lib/catalog"
import type { ProductInput } from "@/lib/catalog-types"

export const products: ProductInput<CategoryId>[] = [
  // ---------------------------------------------------------------- Textiles
  {
    slug: "kanga-tanzanian-style",
    reference: "DEMO-TX-0102",
    name: "Kanga, Tanzanian style with Swahili sayings",
    category: "textiles",
    summary:
      "Printed cotton kanga sold in pairs (doti), with border, centre motif and jina (saying) designed for the Tanzanian market.",
    origin: "Ahmedabad, Gujarat",
    price: { min: 9000, max: 14000, unit: "doti (pair)" },
    minimumOrder: "100 doti per design",
    leadTime: "3–5 weeks to dispatch",
    keywords: ["khanga", "leso", "doti", "kitenge", "vitenge"],
    specifications: [
      { label: "Composition", value: "100% cotton" },
      { label: "Size", value: "Approx. 110 × 165 cm per piece" },
      { label: "Sold as", value: "Pairs (doti), folded and bagged" },
      { label: "Printing", value: "Custom designs and sayings on request" },
    ],
    image: {
      src: "/images/kanga-prints.jpg",
      alt: "Brightly patterned African wax-print fabric",
      focus: "60% 60%",
      credit: "Barney Goodman, Unsplash License (unsplash.com/photos/jjWXuu3Ewhg)",
    },
  },
  {
    slug: "printed-cotton-fabric",
    reference: "DEMO-TX-0101",
    name: "Printed cotton fabric, 44 in width",
    category: "textiles",
    summary:
      "Wax-style and block prints on 100% cotton poplin, supplied in bales by the metre.",
    origin: "Surat, Gujarat",
    price: { min: 2200, max: 3600, unit: "metre" },
    minimumOrder: "3,000 metres per design",
    leadTime: "3–4 weeks to dispatch",
    keywords: ["kitambaa", "vitambaa"],
    specifications: [
      { label: "Composition", value: "100% cotton poplin" },
      { label: "Width", value: "44 in (112 cm)" },
      { label: "Weight", value: "Approx. 100–110 GSM" },
      { label: "Packing", value: "Bales of 1,000 m" },
    ],
    image: {
      src: "/images/fabric-rolls.jpg",
      alt: "Rolls of patterned fabric in many colours stacked on shelves",
      credit: "Bernd Dittrich, Unsplash License (unsplash.com/photos/mAktH366U_k)",
    },
  },

  // ------------------------------------------------------------------ Abayas
  {
    slug: "black-nida-abaya-embroidered",
    reference: "DEMO-AB-0201",
    name: "Black nida abaya with embroidered sleeves",
    category: "abaya",
    summary:
      "Flowing everyday abaya in soft nida fabric, with subtle embroidery on the sleeves and a matching scarf.",
    origin: "Surat, Gujarat",
    price: { min: 45000, max: 70000, unit: "piece" },
    minimumOrder: "20 pieces, mixed sizes",
    leadTime: "2–4 weeks to dispatch",
    keywords: ["buibui", "hijab", "dress"],
    specifications: [
      { label: "Fabric", value: "Nida (soft, crease-resistant)" },
      { label: "Sizes", value: "52 to 60" },
      { label: "Colours", value: "Black, navy, maroon" },
      { label: "Packing", value: "Individually bagged with scarf" },
    ],
    image: {
      src: "/images/abaya-portrait.jpg",
      alt: "A woman wearing a black abaya and hijab against a plain wall",
      focus: "50% 30%",
      credit: "Good Faces, Unsplash License (unsplash.com/photos/2eC_-0yRrGU)",
    },
  },
  {
    slug: "open-front-kimono-abaya",
    reference: "DEMO-AB-0202",
    name: "Open-front kimono abaya with belt",
    category: "abaya",
    summary:
      "Lightweight crepe abaya worn open over a dress or tied with its belt, for work and occasions.",
    origin: "Mumbai, Maharashtra",
    price: { min: 38000, max: 60000, unit: "piece" },
    minimumOrder: "20 pieces, mixed sizes",
    leadTime: "2–4 weeks to dispatch",
    keywords: ["buibui", "kimono"],
    specifications: [
      { label: "Fabric", value: "Crepe" },
      { label: "Sizes", value: "S to XXL" },
      { label: "Colours", value: "Black, beige, olive, dusty pink" },
    ],
    image: {
      src: "/images/products/abaya-street.jpg",
      alt: "A woman in a black abaya and headscarf standing outdoors among trees",
      focus: "50% 35%",
      credit: "kilarov, Unsplash License (unsplash.com/photos/56fPjVSHM3o)",
    },
  },

  // ------------------------------------------------------------- Electronics
  {
    slug: "apple-iphone-15-128gb",
    reference: "DEMO-EL-0301",
    name: "Apple iPhone 15, 128 GB",
    category: "electronics",
    summary:
      "New, sealed iPhone 15 units sourced from distributors in India. Colour availability confirmed at quotation.",
    origin: "Chennai, Tamil Nadu",
    price: { min: 2150000, max: 2450000, unit: "unit" },
    minimumOrder: "2 units",
    leadTime: "1–2 weeks to dispatch",
    keywords: ["simu", "phone", "smartphone", "apple"],
    note: "Phones need TCRA type approval and import documents. Manufacturer warranty terms outside India are not guaranteed; we confirm them in your quotation.",
    specifications: [
      { label: "Storage", value: "128 GB" },
      { label: "Condition", value: "New, sealed box" },
      { label: "SIM", value: "Nano-SIM and eSIM" },
      { label: "Warranty", value: "Confirmed per order" },
    ],
    image: {
      src: "/images/products/iphone.jpg",
      alt: "A hand holding four iPhones in different colours",
      credit: "Daniel Romero, Unsplash License (unsplash.com/photos/q-RQba-XCgU)",
    },
  },
  {
    slug: "samsung-galaxy-a55-128gb",
    reference: "DEMO-EL-0302",
    name: "Samsung Galaxy A55 5G, 128 GB",
    category: "electronics",
    summary:
      "New Samsung Galaxy A-series smartphones from distributors in India. Other Galaxy models quoted on request.",
    origin: "Noida, Uttar Pradesh",
    price: { min: 950000, max: 1150000, unit: "unit" },
    minimumOrder: "2 units",
    leadTime: "1–2 weeks to dispatch",
    keywords: ["simu", "phone", "smartphone", "android"],
    note: "Phones need TCRA type approval and import documents. Manufacturer warranty terms outside India are not guaranteed; we confirm them in your quotation.",
    specifications: [
      { label: "Storage", value: "128 GB, 8 GB RAM" },
      { label: "Network", value: "5G, dual SIM" },
      { label: "Condition", value: "New, sealed box" },
    ],
    image: {
      src: "/images/products/samsung-galaxy.jpg",
      alt: "A dark grey Samsung smartphone standing upright, showing its rear cameras",
      credit: "Phước Sang, Unsplash License (unsplash.com/photos/_VmhMw5cEwU)",
    },
  },
  {
    slug: "a4-document-scanner-duplex",
    reference: "DEMO-EL-0303",
    name: "A4 document scanner, duplex, 30 pages per minute",
    category: "electronics",
    summary:
      "Sheet-fed office scanner with automatic document feeder and two-sided scanning, for offices, schools and clinics.",
    origin: "New Delhi, Delhi",
    price: { min: 750000, max: 1100000, unit: "unit" },
    minimumOrder: "1 unit",
    leadTime: "1–3 weeks to dispatch",
    keywords: ["scanner", "office", "printer"],
    specifications: [
      { label: "Speed", value: "Approx. 30 pages per minute" },
      { label: "Feeder", value: "50-sheet automatic document feeder" },
      { label: "Connection", value: "USB, Wi-Fi on selected models" },
      { label: "Power", value: "230 V adapter included" },
    ],
    image: {
      src: "/images/products/document-scanner.jpg",
      alt: "A person using a scanner with a document on the glass and a touch panel",
      focus: "40% 70%",
      credit: "Olena Kholina, Unsplash License (unsplash.com/photos/CHisgnotgwk)",
    },
  },

  // ------------------------------------------------------ Cosmetics & Skincare
  {
    slug: "cerave-moisturising-cream-454g",
    reference: "DEMO-CS-0401",
    name: "CeraVe Moisturising Cream, 454 g",
    category: "cosmetics",
    summary:
      "Rich moisturising cream with ceramides for dry skin, sourced from distributors in India.",
    origin: "Mumbai, Maharashtra",
    price: { min: 52000, max: 65000, unit: "tub" },
    minimumOrder: "24 tubs",
    leadTime: "1–2 weeks to dispatch",
    keywords: ["lotion", "cream", "skincare", "mafuta"],
    note: "Cosmetics must meet TMDA requirements before import into Tanzania. We confirm this in your quotation.",
    specifications: [
      { label: "Size", value: "454 g tub" },
      { label: "Skin type", value: "Dry to very dry" },
      { label: "Shelf life", value: "At least 12 months at dispatch (target)" },
    ],
  },
  {
    slug: "minimalist-niacinamide-serum-30ml",
    reference: "DEMO-CS-0402",
    name: "Minimalist 10% Niacinamide Face Serum, 30 ml",
    category: "cosmetics",
    summary:
      "Lightweight serum from the Indian skincare brand Minimalist, for oily and blemish-prone skin.",
    origin: "Jaipur, Rajasthan",
    price: { min: 18000, max: 25000, unit: "bottle" },
    minimumOrder: "36 bottles",
    leadTime: "1–2 weeks to dispatch",
    keywords: ["serum", "skincare", "face"],
    note: "Cosmetics must meet TMDA requirements before import into Tanzania. We confirm this in your quotation.",
    specifications: [
      { label: "Size", value: "30 ml dropper bottle" },
      { label: "Active", value: "10% niacinamide, 1% zinc" },
      { label: "Shelf life", value: "At least 12 months at dispatch (target)" },
    ],
    image: {
      src: "/images/products/serum-gold.jpg",
      alt: "A clear glass serum bottle with a gold cap and dropper",
      credit: "Avtar Singh, Unsplash License (unsplash.com/photos/x0Opr053RHg)",
    },
  },
  {
    slug: "fixderma-shadow-spf50-gel-75g",
    reference: "DEMO-CS-0403",
    name: "Fixderma Shadow SPF 50+ Sunscreen Gel, 75 g",
    category: "cosmetics",
    summary:
      "Broad-spectrum sunscreen gel from the Indian dermatology brand Fixderma, suited to hot climates.",
    origin: "New Delhi, Delhi",
    price: { min: 20000, max: 27000, unit: "tube" },
    minimumOrder: "36 tubes",
    leadTime: "1–2 weeks to dispatch",
    keywords: ["sunscreen", "spf", "skincare"],
    note: "Cosmetics must meet TMDA requirements before import into Tanzania. We confirm this in your quotation.",
    specifications: [
      { label: "Size", value: "75 g tube" },
      { label: "Protection", value: "SPF 50+, broad spectrum" },
      { label: "Texture", value: "Non-greasy gel" },
    ],
  },

  // ------------------------------------------------------- Health & Wellness
  {
    slug: "ashwagandha-gummies-60",
    reference: "DEMO-HW-0501",
    name: "Ashwagandha gummies, 60 per bottle",
    category: "health",
    summary:
      "Non-prescription herbal supplement in chewable gummy form. Sold as a food supplement, not a medicine.",
    origin: "Bengaluru, Karnataka",
    price: { min: 25000, max: 35000, unit: "bottle" },
    minimumOrder: "50 bottles",
    leadTime: "2–3 weeks to dispatch",
    keywords: ["supplement", "vitamins", "gummy", "herbal"],
    note: "Food supplements need TMDA registration or an import permit before shipping to Tanzania. No medical claims are made.",
    specifications: [
      { label: "Format", value: "Chewable gummies" },
      { label: "Count", value: "60 per bottle" },
      { label: "Labelling", value: "English" },
    ],
  },
  {
    slug: "whey-protein-1kg-chocolate",
    reference: "DEMO-HW-0502",
    name: "Whey protein powder, 1 kg, chocolate",
    category: "health",
    summary:
      "Sports nutrition protein powder in sealed tubs, from established Indian nutrition brands.",
    origin: "Ahmedabad, Gujarat",
    price: { min: 85000, max: 120000, unit: "tub" },
    minimumOrder: "20 tubs",
    leadTime: "2–3 weeks to dispatch",
    keywords: ["protein", "gym", "supplement", "whey"],
    note: "Food supplements need TMDA registration or an import permit before shipping to Tanzania.",
    specifications: [
      { label: "Size", value: "1 kg tub" },
      { label: "Flavour", value: "Chocolate; others on request" },
      { label: "Protein", value: "Approx. 24 g per serving" },
    ],
  },

  // ------------------------------------------------- Motorcycle & Auto Parts
  {
    slug: "motorcycle-clutch-plates",
    reference: "DEMO-AP-0307",
    name: "Motorcycle clutch plate sets",
    category: "auto-parts",
    summary:
      "Friction and steel plate kits for popular 100–150 cc commuter motorcycles.",
    origin: "Ludhiana, Punjab",
    price: { min: 6500, max: 10500, unit: "set" },
    minimumOrder: "500 sets per model",
    leadTime: "2–3 weeks to dispatch",
    keywords: ["pikipiki", "bodaboda", "spare"],
    specifications: [
      { label: "Fitment", value: "100–150 cc models, by part number" },
      { label: "Contents", value: "Friction plates and steel plates" },
      { label: "Packing", value: "Individually boxed, 50 per carton" },
    ],
  },

  // ------------------------------------------------------ Building Materials
  {
    slug: "vitrified-floor-tiles",
    reference: "DEMO-BM-0520",
    name: "Glazed vitrified floor tiles, 600 × 600 mm",
    category: "building",
    summary:
      "Polished and matt finishes for residential and commercial floors, shipped by the container.",
    origin: "Morbi, Gujarat",
    price: { min: 10500, max: 16000, unit: "m²" },
    minimumOrder: "One 20 ft container",
    leadTime: "2–4 weeks to dispatch",
    keywords: ["tiles", "vigae"],
    specifications: [
      { label: "Size", value: "600 × 600 mm" },
      { label: "Thickness", value: "Approx. 9 mm" },
      { label: "Finish", value: "Polished, matt or satin" },
      { label: "Packing", value: "4 tiles per box, palletised" },
    ],
  },

  // --------------------------------------------------------------- Packaging
  {
    slug: "pp-woven-sacks",
    reference: "DEMO-PK-0705",
    name: "PP woven sacks, 50 kg",
    category: "packaging",
    summary:
      "Laminated or unlaminated polypropylene sacks for grain, flour, fertiliser and cement.",
    origin: "Ahmedabad, Gujarat",
    price: { min: 280, max: 480, unit: "sack" },
    minimumOrder: "50,000 sacks",
    leadTime: "3 weeks to dispatch",
    keywords: ["magunia", "bags"],
    specifications: [
      { label: "Capacity", value: "50 kg" },
      { label: "Options", value: "Laminated, liner, custom print" },
      { label: "Packing", value: "Pressed bales of 500" },
    ],
  },
]
