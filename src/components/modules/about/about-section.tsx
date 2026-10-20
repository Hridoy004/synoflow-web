import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import { DashboardPreview } from "./about-preview";
import {
  Container,
  IconCard,
  LinkButton,
  SectionHeader,
} from "./about-primitives";
import {
  CAPABILITIES,
  HERO_HIGHLIGHTS,
  PURPOSE,
  SOLUTIONS,
  VALUES,
} from "./content";
import { AuthCtaButton } from "./cta-button";

function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background"
    >
      <div className="absolute -left-24 -top-24 size-[34rem] rounded-full bg-primary/25 blur-[110px]" />
      <div className="absolute -right-24 top-0 size-[30rem] rounded-full bg-violet-400/25 blur-[110px]" />
      <div className="absolute left-1/3 top-48 size-[26rem] rounded-full bg-sky-300/30 blur-[110px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.12)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]" />
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="relative isolate -mt-16 pt-16">
      <AuroraBackground />

      <Container className="grid items-center gap-12 pb-16 pt-10 sm:gap-16 sm:pb-24 sm:pt-20 lg:grid-cols-2 lg:gap-14 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl xl:text-6xl">
            Great work starts with better collaboration
          </h1>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:mt-7 sm:text-xl sm:leading-9">
            Synoflow brings projects, tasks, and people together in one
            connected workspace, helping teams stay organized and focus on
            meaningful progress.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start">
            <AuthCtaButton className="shadow-lg shadow-primary/25" />
            <LinkButton
              href="#our-mission"
              variant="outline"
              size="lg"
              className="h-12 w-full bg-background/80 px-6 backdrop-blur sm:w-auto"
            >
              Discover our mission
              <ArrowDown aria-hidden className="size-4" />
            </LinkButton>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {HERO_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckCircle2 aria-hidden className="size-4 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DashboardPreview />
      </Container>
    </section>
  );
}

export function MissionVision() {
  return (
    <section id="our-mission" className="scroll-mt-20 py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          title="Less chaos. More meaningful work."
          description="Managing projects should not be harder than doing the work itself. We want to help teams bring their work together and focus on what matters most."
        />
        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
          {PURPOSE.map(({ cardClass, ...item }) => (
            <IconCard key={item.title} tint={cardClass} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WhySynoflow() {
  return (
    <section className="border-y bg-muted/50 py-16 sm:py-24 lg:py-32">
      <Container className="grid gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            align="left"
            title="Work should flow, not get in the way"
            description="Too many disconnected tools can make teamwork confusing. Synoflow helps teams create a more organized and connected workflow."
          />
          <LinkButton
            href="/register"
            variant="link"
            className="mt-6 h-auto px-0 py-2 text-sm font-semibold"
          >
            Start organizing your work
            <ArrowRight aria-hidden className="size-4" />
          </LinkButton>
        </div>

        <div className="space-y-4">
          {SOLUTIONS.map((solution) => (
            <IconCard
              key={solution.title}
              layout="inline"
              chipClass="bg-primary/10 text-primary"
              {...solution}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Capabilities() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          title="Everything works better together"
          description="Bring your team's everyday work into a clear and organized workflow."
        />
        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3">
          {CAPABILITIES.map(({ cardClass, ...item }) => (
            <IconCard key={item.title} tint={cardClass} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Values() {
  return (
    <section className="border-t bg-muted/50 py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          title="The values behind our work"
          description="We believe better tools should make teamwork simpler, more focused, and more purposeful."
        />
        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((value) => (
            <IconCard key={value.title} {...value} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="py-12 sm:py-20 lg:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-violet-600 px-5 py-14 text-center text-primary-foreground sm:rounded-[32px] sm:px-12 sm:py-20 lg:py-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
          />
          <div className="mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              Ready to bring your work together?
            </h2>
            <p className="mt-4 text-base leading-7 text-primary-foreground/85 sm:mt-5 sm:text-lg sm:leading-8">
              Create an organized workspace, align your team, and make progress
              easier to manage with Synoflow.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row">
              <AuthCtaButton
                variant="secondary"
                className="bg-background text-primary shadow-lg hover:bg-background/90"
              />
              <LinkButton
                href="/contact"
                variant="outline"
                size="lg"
                className="h-12 w-full border-primary-foreground/40 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                Talk to us
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
