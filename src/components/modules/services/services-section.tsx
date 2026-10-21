import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SERVICES, type Service, type ServiceTone } from "./content";

const REGISTER_HREF = "/register";
const CONTACT_HREF = "/contact";

const TONES: Record<ServiceTone, { tint: string; chip: string }> = {
  indigo: {
    tint: "from-primary/10",
    chip: "bg-primary text-primary-foreground shadow-primary/30",
  },
  sky: { tint: "from-sky-50", chip: "bg-sky-500 text-white shadow-sky-500/30" },
  violet: {
    tint: "from-violet-50",
    chip: "bg-violet-500 text-white shadow-violet-500/30",
  },
  emerald: {
    tint: "from-emerald-50",
    chip: "bg-emerald-500 text-white shadow-emerald-500/30",
  },
  amber: {
    tint: "from-amber-50",
    chip: "bg-amber-500 text-white shadow-amber-500/30",
  },
  pink: {
    tint: "from-pink-50",
    chip: "bg-pink-500 text-white shadow-pink-500/30",
  },
};

function ServiceCard({ service }: { service: Service }) {
  const { id, title, description, features, icon: Icon, tone } = service;
  const styles = TONES[tone];

  return (
    <li>
      <Card
        aria-labelledby={`service-${id}`}
        className={cn(
          "h-full gap-0 rounded-2xl bg-gradient-to-br via-card to-card py-0 shadow-none transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-md",
          styles.tint,
        )}
      >
        <CardContent className="flex h-full flex-col p-5 lg:p-6">
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-xl",
              styles.chip,
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
    <div className="relative isolate mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-violet-600 px-5 py-12 text-center text-primary-foreground sm:mt-16 sm:rounded-[32px] sm:px-12 sm:py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
      />
      <div className="mx-auto max-w-xl">
        <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          Ready to simplify the way your team works?
        </h3>
        <p className="mt-4 text-base leading-7 text-primary-foreground/85 sm:text-lg sm:leading-8">
          Bring your projects, tasks, and team collaboration into one organized
          workspace.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href={REGISTER_HREF} />}
            variant="secondary"
            size="lg"
            className="h-12 w-full bg-background px-6 text-primary shadow-lg hover:bg-background/90 sm:w-auto"
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
            Everything your team needs to succeed
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            From planning projects to delivering results, Synoflow gives your
            team the tools to stay organized, collaborate effortlessly, and move
            work forward.
          </p>
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
