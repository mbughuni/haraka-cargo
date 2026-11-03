import * as React from "react"

import { cn } from "@/lib/utils"

function Field({
  className,
  invalid,
  ...props
}: React.ComponentProps<"div"> & { invalid?: boolean }) {
  return (
    <div
      data-slot="field"
      data-invalid={invalid || undefined}
      className={cn("group/field flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  optional,
  children,
  ...props
}: React.ComponentProps<"label"> & { optional?: boolean }) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "flex items-baseline gap-1.5 text-label text-foreground group-data-[invalid]/field:text-destructive",
        className
      )}
      {...props}
    >
      {children}
      {optional ? (
        <span className="text-meta font-normal text-muted-foreground">
          Optional
        </span>
      ) : null}
    </label>
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-meta text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  if (!props.children) {
    return null
  }

  return (
    <p
      data-slot="field-error"
      className={cn("text-meta font-medium text-destructive", className)}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldDescription, FieldError }
