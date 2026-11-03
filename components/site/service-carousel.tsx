"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import type { ImageAsset } from "@/lib/images"
import { cn } from "@/lib/utils"

export type ServiceCard = {
  title: string
  description: string
  href: string
  /** A rendered icon element (components cannot cross the server boundary). */
  icon: React.ReactNode
  image: ImageAsset
  /** The lead card is wider and carries its text over the photo. */
  lead?: boolean
}

/**
 * Horizontally scrolling row of service cards. The arrow buttons scroll the
 * row and are disabled at either end, so they never act as dead controls.
 */
function ServiceCarousel({
  services,
  headingId,
  intro,
}: {
  services: ServiceCard[]
  headingId: string
  /** Hero content shown beside the arrows on large screens. */
  intro?: React.ReactNode
}) {
  const trackRef = React.useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(true)

  const update = React.useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  React.useEffect(() => {
    update()
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => observer.disconnect()
  }, [update])

  function scroll(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("li:last-child")
    const step = (card?.offsetWidth ?? track.clientWidth / 3) + 16
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    track.scrollBy({
      left: direction * step,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  const arrowClass =
    "flex size-12 items-center justify-center rounded-full outline-none transition-[background-color,opacity] duration-(--duration-fast) focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40 sm:size-14"

  // Rendered twice: beside the headline on large screens, above the cards
  // on small ones. Only one copy is ever displayed.
  const arrows = (
    <>
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-controls={`${headingId}-track`}
        className={cn(arrowClass, "bg-card shadow-card hover:bg-muted")}
      >
        <ArrowLeftIcon aria-hidden="true" className="size-5" />
        <span className="sr-only">Previous services</span>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-controls={`${headingId}-track`}
        className={cn(
          arrowClass,
          "bg-brand text-brand-foreground hover:bg-brand-hover"
        )}
      >
        <ArrowRightIcon aria-hidden="true" className="size-5" />
        <span className="sr-only">Next services</span>
      </button>
    </>
  )

  return (
    <div className="flex flex-col gap-5">
      {intro ? (
        <div className="flex items-start justify-between gap-10">
          <div className="min-w-0 flex-1">{intro}</div>
          <div className="hidden shrink-0 gap-2.5 lg:flex">{arrows}</div>
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-4">
        <h2 id={headingId} className="text-subheading lg:sr-only">
          Our services
        </h2>
        <div className="flex gap-2.5 lg:hidden">{arrows}</div>
      </div>

      <ul
        id={`${headingId}-track`}
        ref={trackRef}
        onScroll={update}
        aria-labelledby={headingId}
        className="-mx-gutter flex snap-x snap-mandatory scroll-px-gutter [scrollbar-width:none] gap-4 overflow-x-auto px-gutter pb-2 [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => (
          <li
            key={service.title}
            className={cn(
              "flex h-[22rem] shrink-0 snap-start sm:h-[23rem] lg:h-[17.5rem] xl:h-[18.5rem]",
              service.lead
                ? "w-[86%] sm:w-[62%] lg:w-[calc(46%-0.5rem)]"
                : "w-[72%] sm:w-[40%] lg:w-[calc(27%-0.75rem)]"
            )}
          >
            <article className="group/service relative flex w-full overflow-hidden rounded-3xl bg-muted">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                placeholder="blur"
                sizes={
                  service.lead
                    ? "(min-width: 1024px) 46vw, 86vw"
                    : "(min-width: 1024px) 27vw, 72vw"
                }
                className="object-cover transition-transform duration-700 ease-standard group-hover/service:scale-[1.03] motion-reduce:transition-none"
                style={{ objectPosition: service.image.focus }}
              />
              {service.lead ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-surface-inverse/85 via-surface-inverse/25 to-transparent"
                  />
                  <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 sm:p-6">
                    <div className="flex max-w-xs flex-col gap-2 text-white">
                      <h3 className="text-heading leading-tight">
                        <Link
                          href={service.href}
                          className="outline-none after:absolute after:inset-0 focus-visible:underline"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-pretty text-white/85">
                        {service.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex size-14 shrink-0 items-center justify-center rounded-full bg-card text-brand shadow-card [&_svg]:size-6"
                    >
                      {service.icon}
                    </span>
                  </div>
                </>
              ) : (
                <div className="relative mt-auto w-full p-2.5">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-card">
                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="text-[1.125rem] leading-tight font-medium text-balance">
                        <Link
                          href={service.href}
                          className="outline-none after:absolute after:inset-0 focus-visible:underline"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="line-clamp-2 text-meta text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-colors duration-(--duration-fast) group-hover/service:bg-brand-hover [&_svg]:size-5"
                    >
                      {service.icon}
                    </span>
                  </div>
                </div>
              )}
              <ArrowUpRightIcon
                aria-hidden="true"
                className="absolute top-4 right-4 size-5 text-white opacity-0 transition-opacity duration-(--duration-base) group-hover/service:opacity-100"
              />
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ServiceCarousel }
