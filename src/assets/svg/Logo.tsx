import type { SVGProps } from "react";
import { useId } from "react";

type LogoProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children"> & {
  size?: number;
  title?: string;
};

export default function Logo({
  size,
  title = "Synoflow",
  className,
  ...props
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const tile = `sf-tile-${uid}`;
  const top = `sf-top-${uid}`;
  const bottom = `sf-bottom-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      className={className ?? (size === undefined ? "size-9" : undefined)}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      <defs>
        <linearGradient
          id={tile}
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5762FA" />
          <stop offset="1" stopColor="#3F49EC" />
        </linearGradient>
        <linearGradient
          id={top}
          x1="62"
          y1="27"
          x2="40"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F3F4FF" />
        </linearGradient>
        <linearGradient
          id={bottom}
          x1="40"
          y1="74"
          x2="62"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F3F4FF" />
        </linearGradient>
      </defs>

      <rect width="100" height="100" rx="25" fill={`url(#${tile})`} />

      <g strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M62 28 C48 31 33 33 33 43 C33 52 44 51.5 52 52"
          stroke={`url(#${top})`}
        />
        <path
          d="M39 73 C53 70 68 68 68 58 C68 49 57 49.5 49 49"
          stroke={`url(#${bottom})`}
        />
      </g>
    </svg>
  );
}
