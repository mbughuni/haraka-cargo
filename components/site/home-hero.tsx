import Link from "next/link"
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  FileCheckIcon,
  PlaneIcon,
  ShipIcon,
  WarehouseIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { PageContainer } from "@/components/site/section-heading"
import {
  ServiceCarousel,
  type ServiceCard,
} from "@/components/site/service-carousel"
import { images } from "@/lib/images"
import { cn } from "@/lib/utils"

const services: ServiceCard[] = [
  {
    title: "Sea Freight",
    description:
      "Shared-container (LCL) shipping from Nhava Sheva and Mundra to Dar es Salaam, so smaller orders travel at container rates.",
    href: "/#shipping-updates",
    icon: <ShipIcon />,
    image: images.seaFreight,
    lead: true,
  },
  {
    title: "Air Freight",
    description: "Consolidated air cargo for spares and urgent parcels.",
    href: "/#shipping-updates",
    icon: <PlaneIcon />,
    image: images.airFreight,
  },
  {
    title: "Product Sourcing",
    description: "Suppliers found and checked against your specification.",
    href: "/sourcing",
    icon: <BadgeCheckIcon />,
    image: images.supplierInspection,
  },
  {
    title: "Consolidation",
    description: "Goods from several suppliers packed and documented together.",
    href: "/#how-it-works",
    icon: <WarehouseIcon />,
    image: images.warehouseConsolidation,
  },
  {
    title: "Customs Clearance",
    description: "Clearance at Dar es Salaam and handover or onward delivery.",
    href: "/#how-it-works",
    icon: <FileCheckIcon />,
    image: images.containerPort,
  },
]

function HomeHero() {
  return (
    <section
      id="services"
      aria-labelledby="hero-heading"
      className="pt-6 pb-section sm:pt-10"
    >
      <PageContainer>
        <ServiceCarousel
          services={services}
          headingId="services-heading"
          intro={<HeroIntro />}
        />
      </PageContainer>
    </section>
  )
}

function HeroIntro() {
  return (
    <div className="flex flex-col gap-6 lg:gap-3">
      <h1 id="hero-heading" className="max-w-[16ch] text-hero text-balance">
        Sourcing and shipping from India to Tanzania, made simple
      </h1>

      <div className="flex min-w-0 flex-col gap-5 lg:ml-auto lg:max-w-[34rem]">
        <p className="text-pretty text-muted-foreground sm:text-[1.0625rem] sm:leading-relaxed">
          <span className="font-medium text-foreground">Haraka Cargo</span> is
          an international sourcing and freight company that connects Tanzanian
          businesses with checked suppliers in India. We find the products you
          need, quote the full landed cost in writing, and handle purchasing,
          sea and air freight and customs clearance to Dar es Salaam, so you can
          focus on running your business.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sourcing"
            className={cn(
              buttonVariants({ size: "xl" }),
              "h-12 px-6 text-[0.9375rem]"
            )}
          >
            Get a Quote
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Link>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "h-12 bg-card px-6 text-[0.9375rem]"
            )}
          >
            Browse Products
          </Link>
        </div>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-brand-green"
          />
          <span className="font-medium text-foreground">India → Tanzania</span>
          open now · China and UAE lanes planned
        </p>
      </div>
    </div>
  )
}

export { HomeHero }
