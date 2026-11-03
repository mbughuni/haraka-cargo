import { project, smoothPath } from "@/lib/geo/project"
import {
  countryPaths,
  landPath,
  tradeMapProjection,
} from "@/lib/geo/trade-map-geometry"
import {
  describeTradeNetwork,
  laneStatusLabel,
  marketRegions,
  tradeLanes,
  tradeLocations,
  type LaneStatus,
  type TradeLocation,
} from "@/lib/trade-routes"
import { cn } from "@/lib/utils"

const { width, height } = tradeMapProjection

function toPercent([x, y]: readonly [number, number]) {
  return { left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }
}

const regionLabels = [
  { label: "Africa", at: [18, 8] as const },
  { label: "Asia", at: [92, 40] as const },
  { label: "Indian Ocean", at: [76, -16] as const },
]

function LocationMarker({ location }: { location: TradeLocation }) {
  const position = toPercent(project(location.coordinates))
  const active = location.status === "active"
  const destination = location.role === "destination"

  return (
    <div
      className={cn(
        "absolute",
        location.secondary && "max-sm:[&_[data-label]]:hidden"
      )}
      style={position}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 block -translate-x-1/2 -translate-y-1/2 rounded-full",
          destination
            ? "size-3.5 border-[3px] border-card bg-map-marker shadow-[0_0_0_1.5px_var(--map-marker)] sm:size-4"
            : active
              ? "size-3 border-2 border-map-marker bg-map-route-active sm:size-3.5"
              : "size-2.5 border-2 border-dashed border-map-route-planned bg-card sm:size-3"
        )}
      />
      <div
        data-label
        className={cn(
          "absolute flex w-max flex-col rounded-xl border bg-card/95 px-2.5 py-1 shadow-card",
          location.labelSide === "right" && "top-0 left-3 -translate-y-1/2",
          // Left labels flip right on narrow screens to stay inside the map.
          location.labelSide === "left" &&
            "top-0 left-3 -translate-y-1/2 sm:right-3 sm:left-auto",
          location.labelSide === "top" &&
            (location.labelAlign === "end"
              ? "bottom-2.5 -right-2"
              : "bottom-2.5 left-0 -translate-x-1/2"),
          !active && "border-dashed"
        )}
      >
        <span className="flex items-center gap-1.5 text-[0.6875rem] leading-tight font-semibold sm:text-meta">
          {location.name}
          <span
            className={cn(
              "rounded-full px-1.5 text-[0.625rem] leading-4 font-medium",
              active
                ? "bg-brand text-brand-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {destination ? "Destination" : laneStatusLabel[location.status]}
          </span>
        </span>
        {location.detail ? (
          <span className="hidden text-[0.6875rem] leading-tight text-muted-foreground sm:block">
            {location.detail}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function LegendSwatch({ status }: { status: LaneStatus }) {
  if (status === "unavailable") {
    return (
      <span
        aria-hidden="true"
        className="size-3 shrink-0 rounded-[3px] border border-map-land-stroke bg-[repeating-linear-gradient(135deg,var(--map-market)_0_3px,var(--map-land-stroke)_3px_4px)]"
      />
    )
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 6" className="h-1.5 w-6 shrink-0">
      <line
        x1="1"
        y1="3"
        x2="23"
        y2="3"
        strokeLinecap="round"
        className={
          status === "active"
            ? "stroke-map-route-active"
            : "stroke-map-route-planned"
        }
        strokeWidth={status === "active" ? 3 : 2}
        strokeDasharray={status === "planned" ? "3 3" : undefined}
      />
    </svg>
  )
}

/**
 * Africa–Asia trade network illustration. Land shapes are pre-projected
 * from Natural Earth; routes and markers come from lib/trade-routes.ts so the
 * same model can drive a future logistics page.
 */
function TradeRouteMap({
  className,
  showLegend = true,
}: {
  className?: string
  showLegend?: boolean
}) {
  const description = describeTradeNetwork()

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div
        className="relative w-full overflow-hidden rounded-3xl border bg-map-water"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
          className="absolute inset-0 size-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id="trade-map-hatch"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill="var(--map-market)" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="var(--map-land-stroke)"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>

          {/* Equator reference */}
          <line
            x1="0"
            x2={width}
            y1={project([0, 0])[1]}
            y2={project([0, 0])[1]}
            className="stroke-map-land-stroke"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={landPath}
            className="fill-map-land stroke-map-land-stroke"
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
          />

          {marketRegions.map((market) => (
            <path
              key={market.country}
              d={countryPaths[market.country]}
              fill="url(#trade-map-hatch)"
            />
          ))}

          {tradeLocations.map((location) => (
            <path
              key={location.id}
              d={countryPaths[location.country]}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className={cn(
                location.role === "destination"
                  ? "fill-map-destination stroke-map-marker/40"
                  : location.status === "active"
                    ? "fill-map-origin stroke-map-marker/25"
                    : "fill-map-origin/70"
              )}
            />
          ))}

          {regionLabels.map((region) => {
            const [x, y] = project(region.at)
            return (
              <text
                key={region.label}
                x={x}
                y={y}
                textAnchor="middle"
                className="hidden fill-map-route-planned text-[13px] font-medium tracking-[0.22em] uppercase sm:block"
              >
                {region.label}
              </text>
            )
          })}

          {tradeLanes
            .filter((lane) => lane.status !== "active")
            .map((lane) => (
              <path
                key={lane.id}
                d={smoothPath(lane.waypoints.map(project))}
                fill="none"
                className="stroke-map-route-planned"
                strokeWidth="1.75"
                strokeDasharray="5 6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}

          {tradeLanes
            .filter((lane) => lane.status === "active")
            .map((lane) => {
              const d = smoothPath(lane.waypoints.map(project))
              return (
                <g key={lane.id}>
                  <path
                    d={d}
                    fill="none"
                    className="stroke-card"
                    strokeWidth="6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={d}
                    fill="none"
                    className="stroke-map-route-active"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={d}
                    fill="none"
                    className="route-flow stroke-map-marker/70"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )
            })}
        </svg>

        {tradeLocations.map((location) => (
          <LocationMarker key={location.id} location={location} />
        ))}
      </div>

      {showLegend ? (
        <figcaption className="flex flex-col gap-2">
          <ul
            aria-label="Map legend"
            className="flex flex-wrap gap-x-5 gap-y-1.5 text-meta text-muted-foreground"
          >
            {(["active", "planned", "unavailable"] as const).map((status) => (
              <li key={status} className="flex items-center gap-2">
                <LegendSwatch status={status} />
                {status === "active"
                  ? "Active lane"
                  : status === "planned"
                    ? "Planned lane"
                    : "Neighbouring market, not yet served"}
              </li>
            ))}
          </ul>
          <p className="sr-only">
            Map of Africa and Asia showing Haraka Cargo trade lanes.{" "}
            {description.join(". ")}. Neighbouring East and Central African
            markets are shown for context and are not yet served.
          </p>
          <p className="text-[0.6875rem] text-muted-foreground/90">
            Illustrative map. Routes show trade lanes, not vessel tracks.
            Boundaries: Natural Earth, simplified.
          </p>
        </figcaption>
      ) : null}
    </figure>
  )
}

export { TradeRouteMap }
