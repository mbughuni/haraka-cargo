import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-nav"

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-brand px-3 py-2 text-label text-brand-foreground transition-transform focus-visible:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
