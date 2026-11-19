import Link from "next/link";
import Logo from "@/assets/svg/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { name: "Services", url: "/services" },
      { name: "Pricing", url: "/pricing" },
      { name: "FAQ", url: "/#faq" },
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
    title: "Resources",
    links: [
      { name: "Help center", url: "/contact#faq" },
      { name: "Contact support", url: "/contact?inquiry=support#contact-form" },
      {
        name: "GitHub project",
        url: "https://github.com/Hridoy004/synoflow-web",
      },
    ],
  },
];

const linkClass =
  "rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.35fr_2.65fr] lg:px-8 lg:py-14">
        <div className="max-w-xs">
          <Link
            href="/"
            aria-label="Synoflow homepage"
            className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Logo className="size-8" />
            <span className="text-xl font-bold tracking-tight text-brand-800">
              Synoflow
            </span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Project management that keeps tasks, timelines, and teams in one
            place.
          </p>
          <Link
            href="/contact?inquiry=support#contact-form"
            className="mt-4 inline-block rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contact support
          </Link>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className={linkClass}
                      target={link.url.startsWith("https://") ? "_blank" : undefined}
                      rel={
                        link.url.startsWith("https://")
                          ? "noreferrer noopener"
                          : undefined
                      }
                    >
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Synoflow. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            Built for teams that ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
