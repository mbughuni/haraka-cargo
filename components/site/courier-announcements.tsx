import Link from "next/link"
import { ArrowRightIcon, PlaneIcon, ShipIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  courierAnnouncements,
  formatCutoff,
  type AnnouncementStatus,
  type CourierAnnouncement,
} from "@/lib/announcements"

const statusDisplay: Record<
  AnnouncementStatus,
  { label: string; variant: "success" | "warning" | "muted" }
> = {
  open: { label: "Open for bookings", variant: "success" },
  "closing-soon": { label: "Closing soon", variant: "warning" },
  departed: { label: "Departed", variant: "muted" },
}

function AnnouncementCard({
  announcement,
}: {
  announcement: CourierAnnouncement
}) {
  const status = statusDisplay[announcement.status]
  const ModeIcon = announcement.mode === "sea" ? ShipIcon : PlaneIcon
  const departed = announcement.status === "departed"
  const headingId = `announcement-${announcement.reference}`

  return (
    <article
      aria-labelledby={headingId}
      className="flex w-full flex-col rounded-3xl border bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b px-5 py-3">
        <span className="flex items-center gap-2 text-meta text-muted-foreground">
          <ModeIcon aria-hidden="true" className="size-4 text-primary" />
          {announcement.mode === "sea" ? "Sea freight · LCL" : "Air freight"}
        </span>
        <Badge variant={status.variant}>{status.label}</Badge>
      </header>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <h3 id={headingId} className="sr-only">
          {announcement.origin.port} to {announcement.destination.port},{" "}
          {announcement.mode} freight, reference {announcement.reference}
        </h3>
        <div
          aria-hidden="true"
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"
        >
          <div>
            <p className="font-mono text-subheading text-primary">
              {announcement.origin.code}
            </p>
            <p className="text-meta text-muted-foreground">
              {announcement.origin.port}
            </p>
          </div>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-8 rounded-full bg-brand-green sm:w-12" />
            <ArrowRightIcon className="size-3.5 text-brand-green-ink" />
          </span>
          <div className="text-right">
            <p className="font-mono text-subheading text-primary">
              {announcement.destination.code}
            </p>
            <p className="text-meta text-muted-foreground">
              {announcement.destination.port}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4 text-sm">
          <div>
            <dt className="text-meta text-muted-foreground">
              {departed ? "Cut-off was" : "Booking cut-off"}
            </dt>
            <dd className="mt-0.5 font-medium tabular-nums">
              <time dateTime={announcement.cutoff}>
                {formatCutoff(announcement.cutoff)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="text-meta text-muted-foreground">Departure</dt>
            <dd className="mt-0.5">{announcement.departure}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted-foreground">Cargo</dt>
            <dd className="mt-0.5">{announcement.cargoType}</dd>
          </div>
          <div>
            <dt className="text-meta text-muted-foreground">Transit estimate</dt>
            <dd className="mt-0.5">
              {announcement.transit.replace("Approx. ", "≈ ")}
            </dd>
          </div>
        </dl>

        <p className="text-sm text-muted-foreground">{announcement.note}</p>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t px-5 py-3">
        <p className="font-mono text-meta text-muted-foreground">
          {announcement.reference}
        </p>
        {!departed ? (
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1 rounded-sm text-meta font-semibold text-primary outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Ask about this departure
            <span className="sr-only"> ({announcement.reference})</span>
          </Link>
        ) : null}
      </footer>
    </article>
  )
}

function CourierAnnouncements() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courierAnnouncements.map((announcement) => (
        <li key={announcement.reference} className="flex">
          <AnnouncementCard announcement={announcement} />
        </li>
      ))}
    </ul>
  )
}

export { CourierAnnouncements }
