import { cn } from "@/lib/utils"

function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-eyebrow text-brand-ink uppercase",
        className
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-brand-green" />
      {children}
    </p>
  )
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  id?: string
  eyebrow?: string
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex max-w-prose flex-col gap-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 id={id} className="text-heading text-balance text-primary">
          {title}
        </h2>
        {description ? (
          <p className="text-pretty text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

function PageContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-page px-gutter", className)}
      {...props}
    />
  )
}

export { Eyebrow, SectionHeading, PageContainer }
