import { FlaskConicalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge variant="demo" className={className}>
      <FlaskConicalIcon aria-hidden="true" />
      Demonstration data
    </Badge>
  )
}

function DemoNotice({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-brand-vivid/30 bg-tint-blue/50 px-4 py-3 text-sm text-foreground sm:flex-row sm:items-center sm:gap-3",
        className
      )}
    >
      <DemoBadge />
      <p className="text-muted-foreground">{children}</p>
    </div>
  )
}

export { DemoBadge, DemoNotice }
