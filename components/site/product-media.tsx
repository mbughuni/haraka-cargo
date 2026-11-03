import Image from "next/image"

import { getCategory, type Product } from "@/lib/catalog"
import { cn } from "@/lib/utils"

/**
 * Shows the product's photo, or the category photo when the product has
 * none. Unless the photo is marked `exact` in the catalogue data, it is
 * labelled "Representative photo" so it is never mistaken for the item on
 * offer.
 */
function ProductMedia({
  product,
  sizes,
  preload = false,
  className,
}: {
  product: Product
  sizes: string
  preload?: boolean
  className?: string
}) {
  const category = getCategory(product.category)
  const image = product.image ?? category?.image
  const exact = Boolean(product.image?.exact)

  return (
    <div
      className={cn(
        "relative aspect-product overflow-hidden bg-muted",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={exact ? image.alt : `Representative photo: ${image.alt}`}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover"
            style={{ objectPosition: image.focus }}
          />
          {!exact ? (
            <span className="absolute bottom-2 left-2 rounded-full bg-card/90 px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
              Representative photo
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export { ProductMedia }
