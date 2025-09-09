import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Search, Sun, Moon, MapPin } from "lucide-react";

/**
 * Responsive Navbar (React + Tailwind)
 * - Sticky, translucent with scroll shadow
 * - Desktop dropdown example (Solutions)
 * - Mobile slide-over menu
 * - Search input (non-functional placeholder)
 * - Theme toggle (light/dark using data-theme on <html>)
 *
 * Usage:
 *   <Navbar brand="AISetu" ctaLabel="Get Demo" />
 */
export default function Navbar({ brand = "GatiShakti", ctaLabel = "Get Demo" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const navItemClass =
    "px-3 py-2 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors";

  const NavLink = ({ href = "#", children }) => (
    <a href={href} className={navItemClass}>
      {children}
    </a>
  );

  const solutions = [
    { name: "Signal Optimization", href: "#signals" },
    { name: "Dynamic Routing", href: "#routing" },
    { name: "Incident Alerts", href: "#alerts" },
    { name: "Analytics", href: "#analytics" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/60 ${
        scrolled ? "shadow-[0_6px_30px_-10px_rgba(0,0,0,0.25)]" : ""
      } transition-shadow`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-indigo-500 dark:to-purple-600 shadow-sm grid place-items-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                {brand}
              </span>
            </a>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="#features">Features</NavLink>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSolutionsOpen((v) => !v)}
                onBlur={() => setTimeout(() => setSolutionsOpen(false), 150)}
                className={`${navItemClass} flex items-center gap-1`}
                aria-haspopup="menu"
                aria-expanded={solutionsOpen}
              >
                Solutions <ChevronDown className="h-4 w-4" />
              </button>
              {solutionsOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 p-2 shadow-xl">
                  {solutions.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="block px-3 py-2 rounded-xl text-sm hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          {/* Right: Search, Theme, CTA */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 outline-none text-sm focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:opacity-95 active:scale-[0.99]"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu (Slide-over) */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white dark:bg-zinc-900 shadow-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{brand}</span>
                <button
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 outline-none text-sm focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <a href="#features" className={navItemClass} onClick={() => setMobileOpen(false)}>
                  Features
                </a>

                <details className="group rounded-xl">
                  <summary className={`${navItemClass} flex items-center justify-between cursor-pointer list-none`}>
                    <span>Solutions</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-1 ml-2 flex flex-col rounded-xl border border-black/5 dark:border-white/10 p-1">
                    {solutions.map((s) => (
                      <a key={s.name} href={s.href} className="px-3 py-2 rounded-xl text-sm hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                        {s.name}
                      </a>
                    ))}
                  </div>
                </details>

                <a href="#pricing" className={navItemClass} onClick={() => setMobileOpen(false)}>
                  Pricing
                </a>
                <a href="#about" className={navItemClass} onClick={() => setMobileOpen(false)}>
                  About
                </a>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3">
                <button
                  onClick={() => setDark((d) => !d)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10"
                >
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="text-sm">{dark ? "Light" : "Dark"} mode</span>
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow hover:opacity-95"
                  onClick={() => setMobileOpen(false)}
                >
                  {ctaLabel}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
