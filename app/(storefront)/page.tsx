import Image from "next/image"

import { CategoryBrowser } from "@/components/site/category-browser"
import { ContactSection } from "@/components/site/contact-section"
import { CourierAnnouncements } from "@/components/site/courier-announcements"
import { DemoNotice } from "@/components/site/demo-notice"
import { HomeHero } from "@/components/site/home-hero"
import { OperationsGallery } from "@/components/site/operations-gallery"
import { ProcessSteps } from "@/components/site/process-steps"
import { ProductShowcase } from "@/components/site/product-showcase"
import {
  PageContainer,
  SectionHeading,
} from "@/components/site/section-heading"
import { SourcingSection } from "@/components/site/sourcing-section"
import { TradeNetworkSection } from "@/components/site/trade-network-section"
import { TrustSection } from "@/components/site/trust-section"
import { images } from "@/lib/images"

export default function HomePage() {
  const port = images.containerPort

  return (
    <>
      <HomeHero />

      <TradeNetworkSection />

      <section
        aria-labelledby="categories-heading"
        className="border-t bg-card py-section"
      >
        <PageContainer className="flex flex-col gap-10">
          <SectionHeading
            id="categories-heading"
            eyebrow="Browse by category"
            title="Goods Tanzanian businesses source most often"
            description="Kanga and fabrics, abayas, skincare, phones and electronics, health products and more, sourced from suppliers across India."
          />
          <CategoryBrowser />
        </PageContainer>
      </section>

      <section
        id="catalogue-preview"
        aria-labelledby="featured-heading"
        className="py-section"
      >
        <PageContainer className="flex flex-col gap-8">
          <SectionHeading
            id="featured-heading"
            eyebrow="Products"
            title="Find products from Indian suppliers"
            description="Prices are indicative, in Tanzanian shillings. Freight, import duties and delivery are added in your written quotation."
          />
          <DemoNotice>
            These listings are sample products used to preview the store.
            They are not live supplier offers, and search covers only these
            samples.
          </DemoNotice>
          <ProductShowcase />
        </PageContainer>
      </section>

      <OperationsGallery />

      <SourcingSection />

      <section
        id="how-it-works"
        aria-labelledby="process-heading"
        className="py-section"
      >
        <PageContainer className="flex flex-col gap-10">
          <SectionHeading
            id="process-heading"
            eyebrow="How it works"
            title="From request to delivery, with one point of commitment"
            description="An inquiry, a quotation and an order are different things. You only commit when you accept a written quotation."
          />
          <ProcessSteps />
        </PageContainer>
      </section>

      <section
        id="shipping-updates"
        aria-labelledby="shipping-heading"
        className="bg-card py-section"
      >
        <PageContainer className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <SectionHeading
              id="shipping-heading"
              eyebrow="Shipping updates"
              title="Consolidation departures"
              description="Shared sea and air departures let smaller orders travel at container rates. The cut-off is the last day cargo can reach our origin warehouse. Departure dates are plans, not guarantees."
              className="lg:col-span-6"
            />
            <div className="relative aspect-editorial overflow-hidden rounded-3xl sm:aspect-[21/9] lg:col-span-6 lg:aspect-[16/7]">
              <Image
                src={port.src}
                alt={port.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: port.focus }}
              />
            </div>
          </div>
          <DemoNotice>
            This is a preview of how departure announcements will appear. The
            dates and references below are examples, not scheduled sailings.
          </DemoNotice>
          <CourierAnnouncements />
        </PageContainer>
      </section>

      <TrustSection />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-section"
      >
        <PageContainer>
          <ContactSection />
        </PageContainer>
      </section>
    </>
  )
}
