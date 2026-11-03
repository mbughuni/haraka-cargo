import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon, MessageSquarePlusIcon } from "lucide-react"

import { categories, type CategoryId } from "@/lib/catalog"
import { tintBackground } from "@/lib/tints"
import { cn } from "@/lib/utils"

/** Mosaic placement on large screens. Unlisted categories take one cell. */
const featureLayout: Partial<Record<CategoryId, string>> = {
  textiles: "col-span-2 lg:row-span-2",
}

function CategoryBrowser() {
  return (
    <ul className="grid auto-rows-[13rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] lg:grid-cols-4 lg:gap-4">
      {categories.map((category) => {
        const image = category.image
        const large = category.id === "textiles"
        return (
          <li
            key={category.id}
            className={cn("flex", featureLayout[category.id])}
          >
            <Link
              href={`/products?category=${category.id}`}
              className={cn(
                "group/category flex w-full flex-col gap-3 rounded-3xl p-2.5 outline-none transition-shadow duration-(--duration-base) hover:shadow-raised focus-visible:ring-3 focus-visible:ring-ring/60",
                tintBackground[category.tint]
              )}
            >
              <span className="flex items-start justify-between gap-3 px-2 pt-1.5">
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span
                    className={cn(
                      "font-medium text-balance",
                      large ? "text-subheading" : "text-sm sm:text-label"
                    )}
                  >
                    {category.name}
                  </span>
                  <span
                    className={cn(
                      "text-meta text-muted-foreground",
                      !large && "max-sm:hidden"
                    )}
                  >
                    {category.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card shadow-card transition-colors duration-(--duration-fast) group-hover/category:bg-brand group-hover/category:text-brand-foreground"
                >
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </span>
              <span className="relative min-h-0 flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes={
                    large
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, 50vw"
                  }
                  className="object-cover transition-transform duration-500 ease-standard group-hover/category:scale-[1.03] motion-reduce:transition-none"
                  style={{ objectPosition: image.focus }}
                />
              </span>
            </Link>
          </li>
        )
      })}
      <li className="flex">
        <Link
          href="/#sourcing-request"
          className="flex w-full flex-col justify-between gap-3 rounded-3xl bg-brand p-5 text-brand-foreground outline-none transition-colors hover:bg-brand-hover focus-visible:ring-3 focus-visible:ring-ring/60"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-vivid text-white">
            <MessageSquarePlusIcon aria-hidden="true" className="size-5" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-label">Something else?</span>
            <span className="text-meta text-surface-inverse-muted">
              Describe any product and we&apos;ll look for suppliers.
            </span>
          </span>
        </Link>
      </li>
    </ul>
  )
}

export { CategoryBrowser }
