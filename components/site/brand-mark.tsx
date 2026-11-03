import Image from "next/image"
import Link from "next/link"

import logo from "@/public/brand/haraka-cargo-logo.png"
import { cn } from "@/lib/utils"

/**
 * The official Haraka Cargo logo (globe, plane, ship and wordmark). The
 * source artwork is public/brand/haraka-cargo-logo.png; the globe-only
 * emblem in the same folder is used for the browser icon (app/icon.png).
 */
function BrandMark({
  className,
  size = "default",
}: {
  className?: string
  size?: "default" | "large"
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <Image
        src={logo}
        alt="Haraka Cargo, sourcing and freight"
        preload={size === "default"}
        sizes={size === "large" ? "180px" : "140px"}
        className={cn("w-auto", size === "large" ? "h-20" : "h-12 sm:h-14")}
      />
      <span className="sr-only">, home</span>
    </Link>
  )
}

export { BrandMark }
