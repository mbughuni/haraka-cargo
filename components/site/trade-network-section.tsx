import { PlaneIcon, ShipIcon } from "lucide-react"

import { PageContainer, SectionHeading } from "@/components/site/section-heading"
import { TradeRouteMap } from "@/components/site/trade-route-map"
import { getLocation, laneStatusLabel, tradeLanes } from "@/lib/trade-routes"
import { cn } from "@/lib/utils"

function TradeNetworkSection() {
  return (
    <section aria-labelledby="network-heading" className="py-section">
      <PageContainer className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-4">
          <SectionHeading
            id="network-heading"
            eyebrow="Trade lanes"
            title="Asia to East Africa, one lane at a time"
            description="We open a lane only when suppliers, consolidation and clearance are in place. India to Tanzania is open today."
          />
          <ul className="flex flex-col gap-2.5">
            {tradeLanes.map((lane) => {
              const active = lane.status === "active"
              return (
                <li
                  key={lane.id}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-2xl p-4",
                    active ? "bg-tint-blue" : "border border-dashed bg-card"
                  )}
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="font-medium">
                      {getLocation(lane.from)?.name} →{" "}
                      {getLocation(lane.to)?.name}
                    </p>
                    <p className="flex items-center gap-1.5 text-meta text-muted-foreground">
                      {lane.modes.includes("sea") ? (
                        <ShipIcon aria-hidden="true" className="size-3.5" />
                      ) : null}
                      {lane.modes.includes("air") ? (
                        <PlaneIcon aria-hidden="true" className="size-3.5" />
                      ) : null}
                      {lane.modes
                        .map((mode) => (mode === "sea" ? "Sea" : "Air"))
                        .join(" and ")}{" "}
                      freight
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-meta font-medium",
                      active
                        ? "bg-brand text-brand-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {laneStatusLabel[lane.status]}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        <TradeRouteMap className="min-w-0 lg:col-span-8" />
      </PageContainer>
    </section>
  )
}

export { TradeNetworkSection }
