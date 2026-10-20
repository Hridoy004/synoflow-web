import { Badge } from "@/components/ui/badge";

export function ContactHero() {
  return (
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
          We&apos;re here to help
        </Badge>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
          Let&apos;s talk about your workflow.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Have a question, need support, or want to explore Synoflow? We&apos;d
          love to hear from you.
        </p>
      </div>
    </section>
  );
}
