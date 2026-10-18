import Link from "next/link";
import Logo from "@/assets/svg/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { name: "Services", url: "/services" },
      { name: "Pricing", url: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", url: "/about" },
      { name: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Log in", url: "/login" },
      { name: "Get started", url: "/register" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy policy", url: "/privacy" },
      { name: "Terms of service", url: "/terms" },
    ],
  },
];

const linkClass =
  "rounded text-sm text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] focus-visible:ring-offset-2";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_2.6fr] lg:px-8 lg:py-16">
        <div className="max-w-xs">
          <Link
            href="/"
            aria-label="Synoflow homepage"
            className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] focus-visible:ring-offset-2"
          >
            <Logo className="size-8" />
            <span className="text-xl font-bold tracking-tight text-[#10156F]">
              Synoflow
            </span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Project management that keeps tasks, timelines, and teams in one
            place.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link href={link.url} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Synoflow. All rights reserved.</p>
          <p>Built for teams that ship.</p>
        </div>
      </div>
    </footer>
  );
}
