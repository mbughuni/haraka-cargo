export type ContactChannels = {
  email: string | null
  whatsapp: string | null
  phone: string | null
}

export const siteConfig = {
  name: "Haraka Cargo",
  description:
    "Source products from suppliers in India and have them quoted, purchased, shipped and cleared to Tanzania.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/#services" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Shipping Updates", href: "/#shipping-updates" },
  ],
  contactLink: { label: "Contact Us", href: "/#contact" },
  cta: { label: "Get a Quote", href: "/sourcing" },
  footer: {
    company: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Shipping Updates", href: "/#shipping-updates" },
      { label: "Contact Us", href: "/#contact" },
    ],
    policies: [
      { label: "Sourcing Policy", href: "/policies/sourcing" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
    ],
  },
  destination: { country: "Tanzania", hub: "Dar es Salaam" },
  // Contact channels are not yet published. Set real values here to enable
  // the contact section and the "send by email" option on sourcing requests.
  contact: {
    email: null,
    whatsapp: null,
    phone: null,
  } as ContactChannels,
}

export function hasContactChannels(contact: ContactChannels) {
  return Boolean(contact.email || contact.whatsapp || contact.phone)
}
