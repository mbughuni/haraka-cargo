"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog } from "@base-ui/react/dialog"
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { BrandMark } from "@/components/site/brand-mark"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

function isCurrent(pathname: string, href: string) {
  if (href.includes("#")) {
    return false
  }
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1.5">
        {siteConfig.nav.map((item) => {
          const current = isCurrent(pathname, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full bg-card px-4 text-sm shadow-card outline-none transition-colors duration-(--duration-fast) hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/50",
                  current
                    ? "font-semibold text-brand ring-1 ring-brand/25"
                    : "text-foreground/85"
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const links = [...siteConfig.nav, siteConfig.contactLink]

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "bg-card shadow-card lg:hidden"
        )}
        aria-label="Open menu"
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/30 transition-opacity duration-(--duration-base) data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,100vw)] flex-col border-l bg-background shadow-raised transition-transform duration-(--duration-base) ease-standard outline-none data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
          <div className="flex h-16 items-center justify-between border-b px-gutter">
            <Dialog.Title className="text-label">Menu</Dialog.Title>
            <Dialog.Close
              className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
              aria-label="Close menu"
            >
              <XIcon />
            </Dialog.Close>
          </div>
          <nav
            aria-label="Main"
            className="flex-1 overflow-y-auto px-gutter py-4"
          >
            <ul className="flex flex-col">
              {links.map((item) => {
                const current = isCurrent(pathname, item.href)
                return (
                  <li key={item.href} className="border-b last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-md py-3.5 text-subheading font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        current ? "text-brand" : "text-foreground/85"
                      )}
                    >
                      {item.label}
                      {current ? (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-brand-green"
                        />
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="border-t px-gutter py-5">
            <Link
              href={siteConfig.cta.href}
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: "xl" }), "w-full")}
            >
              {siteConfig.cta.label}
              <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </Link>
            <p className="mt-3 text-meta text-muted-foreground">
              A quote request is not an order. You only commit after accepting
              a written quotation.
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 w-full max-w-page items-center justify-between gap-4 px-gutter">
        <BrandMark />
        <DesktopNav />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={siteConfig.contactLink.href}
            className="hidden rounded-full px-2 text-sm font-medium text-foreground/85 outline-none hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/50 xl:inline"
          >
            {siteConfig.contactLink.label}
          </Link>
          <Link
            href={siteConfig.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden px-4 sm:inline-flex"
            )}
          >
            {siteConfig.cta.label}
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
