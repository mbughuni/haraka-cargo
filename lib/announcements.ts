/**
 * DEMONSTRATION SHIPPING SCHEDULE
 *
 * Sample consolidation announcements used to design the storefront preview.
 * These are not live departures and must be replaced by the courier
 * announcement service before launch.
 */

export type AnnouncementStatus = "open" | "closing-soon" | "departed"

export type CourierAnnouncement = {
  reference: string
  mode: "sea" | "air"
  origin: { port: string; code: string }
  destination: { port: string; code: string }
  /** ISO date (YYYY-MM-DD) when cargo must reach the origin warehouse. */
  cutoff: string
  /** Planned sailing or flight window. Never a guaranteed date. */
  departure: string
  cargoType: string
  transit: string
  status: AnnouncementStatus
  note: string
}

export const courierAnnouncements: CourierAnnouncement[] = [
  {
    reference: "DEMO-SEA-2611",
    mode: "sea",
    origin: { port: "Nhava Sheva", code: "INNSA" },
    destination: { port: "Dar es Salaam", code: "TZDAR" },
    cutoff: "2026-11-14",
    departure: "Planned for the week of 23 Nov 2026",
    cargoType: "General cargo, textiles, tiles",
    transit: "Approx. 18–24 days port to port",
    status: "open",
    note: "Shared container (LCL). Space is confirmed only with a written booking.",
  },
  {
    reference: "DEMO-AIR-2607",
    mode: "air",
    origin: { port: "Mumbai", code: "BOM" },
    destination: { port: "Dar es Salaam", code: "DAR" },
    cutoff: "2026-11-06",
    departure: "Planned for 10 Nov 2026",
    cargoType: "Spare parts, samples, small parcels",
    transit: "Approx. 3–5 days airport to airport",
    status: "closing-soon",
    note: "Consolidated air freight for spares and small, urgent parcels.",
  },
  {
    reference: "DEMO-SEA-2610",
    mode: "sea",
    origin: { port: "Mundra", code: "INMUN" },
    destination: { port: "Dar es Salaam", code: "TZDAR" },
    cutoff: "2026-10-17",
    departure: "Sailed late Oct 2026",
    cargoType: "General cargo",
    transit: "Approx. 18–24 days port to port",
    status: "departed",
    note: "Bookings closed. Consignees will receive tracking references.",
  },
]

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function formatCutoff(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`))
}
