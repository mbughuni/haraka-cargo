import Link from "next/link"
import {
  ArrowRightIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { hasContactChannels, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

function ContactChannelList() {
  const { email, whatsapp, phone } = siteConfig.contact
  const channels = [
    whatsapp
      ? {
          label: "WhatsApp",
          value: whatsapp,
          href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
          icon: MessageCircleIcon,
        }
      : null,
    phone
      ? {
          label: "Phone",
          value: phone,
          href: `tel:${phone.replace(/\s/g, "")}`,
          icon: PhoneIcon,
        }
      : null,
    email
      ? {
          label: "Email",
          value: email,
          href: `mailto:${email}`,
          icon: MailIcon,
        }
      : null,
  ].filter((channel) => channel !== null)

  return (
    <ul className="flex flex-col divide-y rounded-lg border bg-card">
      {channels.map((channel) => (
        <li key={channel.label}>
          <a
            href={channel.href}
            className="flex items-center gap-3 px-5 py-4 outline-none hover:bg-accent/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
          >
            <channel.icon aria-hidden="true" className="size-5 text-primary" />
            <span className="text-meta text-muted-foreground">
              {channel.label}
            </span>
            <span className="ml-auto text-label">{channel.value}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function ContactSection() {
  const ready = hasContactChannels(siteConfig.contact)

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col gap-4 lg:col-span-6">
        <h2 id="contact-heading" className="text-heading text-balance text-primary">
          Talk to the Haraka Cargo team
        </h2>
        <p className="max-w-prose text-pretty text-muted-foreground">
          For questions about a product, a quotation or a shipment, the quickest
          route is a sourcing request with as much detail as you have. We reply
          by phone or WhatsApp, with written quotations by email.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-6">
        {ready ? (
          <ContactChannelList />
        ) : (
          <div className="rounded-lg border border-dashed bg-card p-5">
            <p className="text-label">Contact channels open at launch</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Our WhatsApp, phone and email details will be published here when
              the service opens. Until then, you can prepare a sourcing request
              and keep a copy of it.
            </p>
          </div>
        )}
        <Link
          href="/sourcing"
          className={cn(
            buttonVariants({ variant: "outline", size: "xl" }),
            "w-full sm:w-fit"
          )}
        >
          Prepare a sourcing request
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export { ContactSection }
