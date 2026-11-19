import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SERVICES, type Service } from "./content";

const REGISTER_HREF = "/register";
const CONTACT_HREF = "/contact";

function ServiceCard({ service }: { service: Service }) {
  const { id, title, description, features, icon: Icon } = service;

  return (
    <li>
      <Card
        aria-labelledby={`service-${id}`}
        className={cn(
          "h-full gap-0 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card py-0 shadow-none transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md",
        )}
      >
        <CardContent className="flex h-full flex-col p-5 lg:p-6">
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20",
            )}
          >
            <Icon aria-hidden className="size-5" />
          </span>

          <h3
            id={`service-${id}`}
            className="mt-5 text-lg font-semibold leading-snug text-foreground"
          >
            {title}
          </h3>
          <CardDescription className="mt-2 text-sm leading-6">
            {description}
          </CardDescription>

          <ul className="mt-5 space-y-3 border-t pt-5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm text-foreground/80"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check aria-hidden className="size-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </li>
  );
}

function ServicesCta() {
  return (
    <div className="brand-gradient relative isolate mt-12 overflow-hidden rounded-3xl px-5 py-12 text-center text-white sm:mt-16 sm:rounded-[32px] sm:px-12 sm:py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
      />
      <div className="mx-auto max-w-xl">
        <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          Ready to simplify the way your team works?
        </h3>
        <p className="mt-4 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
          Bring your projects, tasks, and team collaboration into one organized
          workspace.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href={REGISTER_HREF} />}
            variant="secondary"
            size="lg"
            className="h-12 w-full bg-white px-6 text-brand-800 shadow-lg hover:bg-white/90 sm:w-auto"
          >
            Get started free
            <ArrowRight className="size-4" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={CONTACT_HREF} />}
            variant="outline"
            size="lg"
            className="h-12 w-full border-primary-foreground/40 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
          >
            Talk to us
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <>
      <section className="relative isolate -mt-16 overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background pt-16">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        />

        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 text-center sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
          <Badge
            variant="outline"
            className="mt-8 gap-1.5 rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            Our services
          </Badge>
          <h1
            id="services-heading"
            className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl"
          >
            One workspace. Every team. Clearer work.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Plan projects, manage tasks, collaborate across teams, and turn
            progress into predictable delivery.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href={REGISTER_HREF} />}
              size="lg"
              className="h-12 w-full px-6 sm:w-auto"
            >
              Get started free
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="#services" />}
              variant="outline"
              size="lg"
              className="h-12 w-full px-6 sm:w-auto"
            >
              Explore services
            </Button>
          </div>
        </div>
      </section>

      <section
        id="services"
        aria-labelledby="services-heading"
        className="scroll-mt-20 py-12 sm:py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ul>

          <ServicesCta />
        </div>
      </section>
    </>
  );
}
