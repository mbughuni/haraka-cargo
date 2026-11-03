"use client"

import * as React from "react"
import {
  CheckIcon,
  CircleAlertIcon,
  ClipboardCopyIcon,
  MailIcon,
  PencilIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { categories } from "@/lib/catalog"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type RequestValues = {
  product: string
  category: string
  quantity: string
  budget: string
  timeline: string
  destination: string
  referenceUrl: string
  name: string
  phone: string
  email: string
}

type FieldName = keyof RequestValues
type Errors = Partial<Record<FieldName, string>>

const timelines = [
  { value: "flexible", label: "Flexible" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-months-plus", label: "In more than 3 months" },
]

const fieldOrder: FieldName[] = [
  "product",
  "category",
  "quantity",
  "budget",
  "timeline",
  "destination",
  "referenceUrl",
  "name",
  "phone",
  "email",
]

function validate(values: RequestValues): Errors {
  const errors: Errors = {}

  if (values.product.trim().length < 10) {
    errors.product =
      "Describe the product in at least 10 characters so a sourcing agent can identify it."
  }
  if (!values.quantity.trim()) {
    errors.quantity = "Enter the quantity you need, with a unit."
  }
  if (!values.destination.trim()) {
    errors.destination = "Enter the town or city in Tanzania for delivery."
  }
  if (values.referenceUrl.trim()) {
    try {
      const url = new URL(values.referenceUrl.trim())
      if (!/^https?:$/.test(url.protocol)) {
        throw new Error("Unsupported protocol")
      }
    } catch {
      errors.referenceUrl = "Enter a full link starting with https://"
    }
  }
  if (!values.name.trim()) {
    errors.name = "Enter your name or business name."
  }
  if (values.phone.replace(/\D/g, "").length < 9) {
    errors.phone = "Enter a phone or WhatsApp number, including country code."
  }
  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email address, or leave this blank."
  }

  return errors
}

function buildSummary(values: RequestValues) {
  const category =
    categories.find((item) => item.id === values.category)?.name ??
    "Not specified"
  const timeline =
    timelines.find((item) => item.value === values.timeline)?.label ??
    "Flexible"

  return [
    "HARAKA CARGO: SOURCING REQUEST (not an order)",
    "",
    `Product: ${values.product.trim()}`,
    `Category: ${category}`,
    `Quantity: ${values.quantity.trim()}`,
    `Target price or budget: ${values.budget.trim() || "Not specified"}`,
    `Needed: ${timeline}`,
    `Deliver to: ${values.destination.trim()}, Tanzania`,
    `Reference link: ${values.referenceUrl.trim() || "None"}`,
    "",
    `Name: ${values.name.trim()}`,
    `Phone / WhatsApp: ${values.phone.trim()}`,
    `Email: ${values.email.trim() || "Not provided"}`,
  ].join("\n")
}

function SourcingRequestForm({
  initialProduct = "",
  initialCategory = "",
  idPrefix = "sourcing",
}: {
  initialProduct?: string
  initialCategory?: string
  idPrefix?: string
}) {
  const [values, setValues] = React.useState<RequestValues>({
    product: initialProduct,
    category: initialCategory,
    quantity: "",
    budget: "",
    timeline: "flexible",
    destination: "",
    referenceUrl: "",
    name: "",
    phone: "",
    email: "",
  })
  const [errors, setErrors] = React.useState<Errors>({})
  const [submitted, setSubmitted] = React.useState(false)
  const [mode, setMode] = React.useState<"editing" | "review">("editing")
  const formRef = React.useRef<HTMLFormElement>(null)
  const reviewHeadingRef = React.useRef<HTMLHeadingElement>(null)

  const id = (name: FieldName) => `${idPrefix}-${name}`

  function update(name: FieldName) {
    return (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const next = { ...values, [name]: event.target.value }
      setValues(next)
      if (submitted) {
        setErrors(validate(next))
      }
    }
  }

  function controlProps(name: FieldName) {
    const error = errors[name]
    return {
      id: id(name),
      name,
      value: values[name],
      onChange: update(name),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": [
        `${id(name)}-description`,
        error ? `${id(name)}-error` : null,
      ]
        .filter(Boolean)
        .join(" "),
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = fieldOrder.find((name) => nextErrors[name])
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`#${id(firstInvalid)}`)
        ?.focus()
      return
    }

    setMode("review")
  }

  React.useEffect(() => {
    if (mode === "review") {
      reviewHeadingRef.current?.focus()
    }
  }, [mode])

  if (mode === "review") {
    return (
      <RequestReview
        summary={buildSummary(values)}
        headingRef={reviewHeadingRef}
        onEdit={() => setMode("editing")}
      />
    )
  }

  const errorCount = Object.keys(errors).length

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-label="Sourcing request"
      className="flex flex-col gap-8"
    >
      {submitted && errorCount > 0 ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <CircleAlertIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0"
          />
          {errorCount === 1
            ? "One field needs attention before you can review your request."
            : `${errorCount} fields need attention before you can review your request.`}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 text-subheading">What do you need?</legend>

        <Field invalid={Boolean(errors.product)}>
          <FieldLabel htmlFor={id("product")}>Product description</FieldLabel>
          <Textarea
            {...controlProps("product")}
            rows={4}
            placeholder="e.g. 200 doti of kanga with a custom saying, or 10 Samsung Galaxy A55 phones, 128 GB"
          />
          <FieldDescription id={`${id("product")}-description`}>
            Include size, model, material, brand or standard if you know it.
          </FieldDescription>
          <FieldError id={`${id("product")}-error`}>
            {errors.product}
          </FieldError>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={id("category")} optional>
              Category
            </FieldLabel>
            <NativeSelect {...controlProps("category")}>
              <option value="">Not sure</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </NativeSelect>
            <FieldDescription id={`${id("category")}-description`}>
              Helps us route the request to the right supplier group.
            </FieldDescription>
          </Field>

          <Field invalid={Boolean(errors.quantity)}>
            <FieldLabel htmlFor={id("quantity")}>Quantity</FieldLabel>
            <Input
              {...controlProps("quantity")}
              placeholder="e.g. 20 units, 5,000 metres"
            />
            <FieldDescription id={`${id("quantity")}-description`}>
              An estimate is fine.
            </FieldDescription>
            <FieldError id={`${id("quantity")}-error`}>
              {errors.quantity}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor={id("budget")} optional>
              Target price or budget
            </FieldLabel>
            <Input
              {...controlProps("budget")}
              placeholder="e.g. TSh 5,000,000"
            />
            <FieldDescription id={`${id("budget")}-description`}>
              Lets us suggest options that fit.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor={id("timeline")}>
              When do you need it?
            </FieldLabel>
            <NativeSelect {...controlProps("timeline")}>
              {timelines.map((timeline) => (
                <option key={timeline.value} value={timeline.value}>
                  {timeline.label}
                </option>
              ))}
            </NativeSelect>
            <FieldDescription id={`${id("timeline")}-description`}>
              Delivered to you in Tanzania.
            </FieldDescription>
          </Field>

          <Field invalid={Boolean(errors.destination)}>
            <FieldLabel htmlFor={id("destination")}>
              Delivery town or city
            </FieldLabel>
            <Input
              {...controlProps("destination")}
              placeholder="e.g. Dar es Salaam, Arusha, Mwanza"
              autoComplete="address-level2"
            />
            <FieldDescription id={`${id("destination")}-description`}>
              Within Tanzania.
            </FieldDescription>
            <FieldError id={`${id("destination")}-error`}>
              {errors.destination}
            </FieldError>
          </Field>

          <Field invalid={Boolean(errors.referenceUrl)}>
            <FieldLabel htmlFor={id("referenceUrl")} optional>
              Reference link
            </FieldLabel>
            <Input
              {...controlProps("referenceUrl")}
              type="url"
              inputMode="url"
              placeholder="https://"
            />
            <FieldDescription id={`${id("referenceUrl")}-description`}>
              A product page or listing that shows what you mean.
            </FieldDescription>
            <FieldError id={`${id("referenceUrl")}-error`}>
              {errors.referenceUrl}
            </FieldError>
          </Field>
        </div>
      </fieldset>

      <div className="border-t pt-8">
        <fieldset className="flex flex-col gap-5">
          <legend className="mb-4 text-subheading">Your details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor={id("name")}>
                Name or business name
              </FieldLabel>
              <Input {...controlProps("name")} autoComplete="name" />
              <FieldDescription id={`${id("name")}-description`}>
                The quotation is addressed to this name.
              </FieldDescription>
              <FieldError id={`${id("name")}-error`}>{errors.name}</FieldError>
            </Field>

            <Field invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor={id("phone")}>
                Phone or WhatsApp number
              </FieldLabel>
              <Input
                {...controlProps("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+255"
              />
              <FieldDescription id={`${id("phone")}-description`}>
                Include the country code.
              </FieldDescription>
              <FieldError id={`${id("phone")}-error`}>
                {errors.phone}
              </FieldError>
            </Field>

            <Field invalid={Boolean(errors.email)} className="sm:col-span-2">
              <FieldLabel htmlFor={id("email")} optional>
                Email
              </FieldLabel>
              <Input
                {...controlProps("email")}
                type="email"
                autoComplete="email"
                className="sm:max-w-[calc(50%-0.625rem)]"
              />
              <FieldDescription id={`${id("email")}-description`}>
                For written quotations and documents.
              </FieldDescription>
              <FieldError id={`${id("email")}-error`}>
                {errors.email}
              </FieldError>
            </Field>
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-meta text-muted-foreground">
          This prepares a sourcing request for review. It is not an order, and
          nothing is sent, purchased or charged.
        </p>
        <Button type="submit" size="xl" className="shrink-0">
          Review request
        </Button>
      </div>
    </form>
  )
}

function RequestReview({
  summary,
  headingRef,
  onEdit,
}: {
  summary: string
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onEdit: () => void
}) {
  const [copyState, setCopyState] = React.useState<
    "idle" | "copied" | "failed"
  >("idle")
  const email = siteConfig.contact.email

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  return (
    <section
      aria-labelledby="request-review-heading"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <Badge variant="warning">Draft · not sent</Badge>
        <h3
          id="request-review-heading"
          ref={headingRef}
          tabIndex={-1}
          className="text-subheading outline-none"
        >
          Your sourcing request is ready to review
        </h3>
        <p className="text-sm text-muted-foreground">
          Online submission is not open yet, so this request has not been sent
          to Haraka Cargo. Copy the summary below to keep it. It is a request
          for a quotation, not an order. Nothing is bought until you accept a
          written quotation.
        </p>
      </div>

      <pre className="max-h-80 overflow-auto rounded-lg border bg-muted/60 p-4 font-mono text-[0.8125rem] leading-relaxed whitespace-pre-wrap">
        {summary}
      </pre>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" size="xl" onClick={copy}>
          {copyState === "copied" ? (
            <CheckIcon data-icon="inline-start" aria-hidden="true" />
          ) : (
            <ClipboardCopyIcon data-icon="inline-start" aria-hidden="true" />
          )}
          {copyState === "copied" ? "Copied" : "Copy request summary"}
        </Button>
        {email ? (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Sourcing request")}&body=${encodeURIComponent(summary)}`}
            className={buttonVariants({ variant: "outline", size: "xl" })}
          >
            <MailIcon data-icon="inline-start" aria-hidden="true" />
            Send by email
          </a>
        ) : null}
        <Button type="button" variant="outline" size="xl" onClick={onEdit}>
          <PencilIcon data-icon="inline-start" aria-hidden="true" />
          Edit request
        </Button>
      </div>

      <p
        aria-live="polite"
        className={cn(
          "text-meta",
          copyState === "failed" ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {copyState === "copied" && "Request summary copied to your clipboard."}
        {copyState === "failed" &&
          "Your browser blocked copying. Select the summary text above and copy it manually."}
      </p>
    </section>
  )
}

export { SourcingRequestForm }
