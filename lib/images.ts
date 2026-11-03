/**
 * IMAGE MANIFEST
 *
 * Editorial and service photographs are registered here so they can be
 * replaced without editing page components. Category and product photos are
 * set directly in data/catalog/ (with their credits) so they can be edited
 * alongside the products. Swap `src` for an authorised
 * Haraka Cargo photograph when one is available and update the source notes.
 *
 * All current images are stock photography from Unsplash, used under the
 * Unsplash License (https://unsplash.com/license): free for commercial use,
 * attribution not required. They are illustrative. None shows Haraka Cargo
 * staff, premises, suppliers or shipments, and copy must never imply that
 * they do. Credits are kept here as good practice.
 *
 * Files are stored locally under /public/images (downloaded 2026-11-03) so
 * the site does not depend on remote image URLs.
 */
import type { StaticImageData } from "next/image"

import airFreight from "@/public/images/air-freight.jpg"
import containerPort from "@/public/images/container-port.jpg"
import seaFreight from "@/public/images/sea-freight.jpg"
import supplierInspection from "@/public/images/supplier-inspection.jpg"
import supplierMeeting from "@/public/images/supplier-meeting.jpg"
import textileManufacturing from "@/public/images/textile-manufacturing.jpg"
import warehouseConsolidation from "@/public/images/warehouse-consolidation.jpg"

export type ImageAsset = {
  src: StaticImageData
  alt: string
  /** CSS object-position used when the image is cropped. */
  focus?: string
  source: { photographer: string; url: string; licence: "Unsplash License" }
  notes?: string
}

function asset(image: ImageAsset) {
  return image
}

export const images = {
  seaFreight: asset({
    src: seaFreight,
    alt: "A container ship loaded with stacked containers leaves port under a blue sky, with a tug alongside",
    focus: "55% 60%",
    source: {
      photographer: "John Simmons",
      url: "https://unsplash.com/photos/N7_NUUtCkDU",
      licence: "Unsplash License",
    },
    notes:
      "The vessel and tug names are visible at small size. They are incidental and imply no relationship with Haraka Cargo. Do not caption it as a Haraka sailing.",
  }),
  airFreight: asset({
    src: airFreight,
    alt: "A white wide-body cargo aircraft on an airport apron with boarding stairs in place",
    focus: "35% 55%",
    source: {
      photographer: "Peaky_82",
      url: "https://unsplash.com/photos/PEf3deR3l_U",
      licence: "Unsplash License",
    },
    notes: "Plain livery. Only small engine-manufacturer markings are visible.",
  }),
  textileManufacturing: asset({
    src: textileManufacturing,
    alt: "Fabric finishing machinery in a bright textile mill, with red cloth running through rollers",
    focus: "30% 60%",
    source: {
      photographer: "Lalit Kumar",
      url: "https://unsplash.com/photos/HpPmiduLDC0",
      licence: "Unsplash License",
    },
  }),
  supplierInspection: asset({
    src: supplierInspection,
    alt: "A technician checks production equipment against a specification document",
    focus: "70% 30%",
    source: {
      photographer: "TECNIC Bioprocess Solutions",
      url: "https://unsplash.com/photos/VFrbWve7eAs",
      licence: "Unsplash License",
    },
    notes:
      "The photographer's company name appears on a folder and clothing. Crop with the focus point above so the folder stays out of frame, and replace with a Haraka inspection photo when available.",
  }),
  supplierMeeting: asset({
    src: supplierMeeting,
    alt: "Two people review a printed document together at a meeting table",
    focus: "45% 50%",
    source: {
      photographer: "Olena Kholina",
      url: "https://unsplash.com/photos/MhqUBTxQ3Hw",
      licence: "Unsplash License",
    },
  }),
  warehouseConsolidation: asset({
    src: warehouseConsolidation,
    alt: "A forklift in a warehouse aisle between tall racks of palletised goods",
    focus: "50% 60%",
    source: {
      photographer: "AFINIS Group",
      url: "https://unsplash.com/photos/OnbSOhz0oig",
      licence: "Unsplash License",
    },
  }),
  containerPort: asset({
    src: containerPort,
    alt: "Aerial view of stacked shipping containers and gantry cranes in a container port",
    focus: "50% 50%",
    source: {
      photographer: "CHUTTERSNAP",
      url: "https://unsplash.com/photos/kyCNGGKCvyw",
      licence: "Unsplash License",
    },
    notes:
      "Shot in Singapore. Shipping-line markings on containers are incidental and small. Do not caption it as Dar es Salaam or an Indian port.",
  }),
} satisfies Record<string, ImageAsset>

export type ImageKey = keyof typeof images
