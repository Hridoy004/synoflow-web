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
      { name: "About us", url: "/about-us" },
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
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_2fr] lg:px-8">
        <div className="max-w-xs">
          <Link
            href="/"
            aria-label="Synoflow homepage"
            className="flex items-center gap-2.5"
          >
            <Logo className="size-9" />
            <span className="text-[21px] font-bold tracking-tight text-[#10156F]">
              Synoflow
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Project management that keeps tasks, timelines and teams in one
            place.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-slate-900">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-slate-600 transition-colors hover:text-[#3A43D6]"
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

      <div className="border-t border-slate-100 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Synoflow. All rights reserved.
      </div>
    </footer>
  );
}
