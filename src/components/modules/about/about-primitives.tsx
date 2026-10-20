import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

type SectionHeaderProps = {
  title: string;
  description: string;
  align?: "center" | "left";
};

export function SectionHeader({
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.08]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  );
}

type LinkButtonProps = Omit<
  ComponentProps<typeof Button>,
  "render" | "nativeButton"
> & {
  href: string;
};

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <Button nativeButton={false} render={<Link href={href} />} {...props} />
  );
}

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  chipClass: string;
  layout?: "stacked" | "inline";
  tint?: string;
};

export function IconCard({
  icon: Icon,
  title,
  text,
  chipClass,
  layout = "stacked",
  tint,
}: IconCardProps) {
  const inline = layout === "inline";

  return (
    <Card
      className={cn(
        "gap-0 rounded-3xl py-0 shadow-none",
        tint && "bg-gradient-to-br via-card to-card",
        tint,
      )}
    >
      <CardContent
        className={cn("p-6 sm:p-8", inline && "flex gap-4 sm:gap-5")}
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            chipClass,
          )}
        >
          <Icon aria-hidden className="size-5" />
        </span>
        <div className={inline ? undefined : "mt-6"}>
          <CardTitle className="text-lg leading-snug">{title}</CardTitle>
          <CardDescription className="mt-2 text-[15px] leading-7">
            {text}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
