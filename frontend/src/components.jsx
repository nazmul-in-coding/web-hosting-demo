import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Cloud,
  CreditCard,
  Globe,
  HardDrive,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Server,
  Settings,
  Shield,
  X,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink-950 shadow-glow">
        <Cloud size={18} strokeWidth={2.4} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-snow">
        Nexora <span className="text-mist font-medium">Cloud</span>
      </span>
    </Link>
  )
}

export function StatusDot({ tone = 'ok' }) {
  const color = tone === 'ok' ? 'bg-accent' : tone === 'warn' ? 'bg-ember' : tone === 'bad' ? 'bg-rose' : 'bg-mist'
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
}

export function Badge({ children, tone = 'ok' }) {
  const map = {
    ok: 'bg-accent/10 text-accent border-accent/20',
    warn: 'bg-ember/10 text-ember border-ember/20',
    bad: 'bg-rose/10 text-rose border-rose/20',
    mute: 'bg-white/5 text-mist border-white/10',
    cyan: 'bg-cyan/10 text-cyan border-cyan/20',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${map[tone] || map.mute}`}>
      {children}
    </span>
  )
}

export function Button({ as: As = 'button', to, href, variant = 'primary', className = '', children, ...props }) {
  const styles = {
    primary: 'bg-accent text-ink-950 hover:bg-accent-dim shadow-glow',
    secondary: 'bg-white/5 text-snow hover:bg-white/10 border border-white/10',
    ghost: 'text-mist hover:text-snow hover:bg-white/5',
    danger: 'bg-rose/15 text-rose hover:bg-rose/25 border border-rose/20',
  }
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-11 ${styles[variant]} ${className}`
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} {...props}>{children}</a>
  return <As className={cls} {...props}>{children}</As>
}

const nav = [
  { to: '/web-hosting', label: 'Web Hosting' },
  { to: '/vps', label: 'VPS' },
  { to: '/dedicated', label: 'Dedicated' },
  { to: '/network', label: 'Network' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/status', label: 'Status' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${isActive ? 'text-snow bg-white/5' : 'text-mist hover:text-snow'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button to="/login" variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
          <Button to="/dashboard">Console</Button>
          <button
            className="grid h-11 w-11 place-items-center rounded-xl text-snow lg:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-ink-900 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-lg px-3 py-3 text-sm text-snow hover:bg-white/5">
                {n.label}
              </Link>
            ))}
            <Link to="/login" className="rounded-lg px-3 py-3 text-sm text-mist">Sign in</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export function SiteFooter() {
  const cols = [
    { h: 'Products', links: [['Web Hosting', '/web-hosting'], ['Cloud VPS', '/vps'], ['Dedicated', '/dedicated'], ['Domains', '/domains']] },
    { h: 'Company', links: [['About', '/about'], ['Network', '/network'], ['Status', '/status'], ['Contact', '/contact']] },
    { h: 'Resources', links: [['Pricing', '/pricing'], ['Documentation', '/docs'], ['Support', '/contact'], ['Console', '/dashboard']] },
  ]
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-mist">
            Sovereign-grade compute, NVMe storage, and Anycast DNS across 38 cities.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <p className="text-xs font-semibold uppercase tracking-wider text-mist">{c.h}</p>
            <ul className="mt-4 space-y-2">
              {c.links.map(([l, t]) => (
                <li key={l}><Link to={t} className="text-sm text-snow/80 hover:text-accent">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Nexora Cloud. All rights reserved.</p>
          <p>SOC 2 Type II · ISO 27001 · GDPR</p>
        </div>
      </div>
    </footer>
  )
}

export function MarketingLayout({ children }) {
  return (
    <div className="min-h-dvh bg-ink-950 text-snow">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-ink-950">Skip to content</a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  )
}

const dashNav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/services', label: 'Services', icon: Server },
  { to: '/dashboard/domains', label: 'Domains', icon: Globe },
  { to: '/dashboard/tickets', label: 'Support', icon: LifeBuoy },
  { to: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashLayout({ children }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return (
    <div className="min-h-dvh bg-ink-950 text-snow">
      <div className="flex min-h-dvh">
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-ink-900 transition-transform duration-200 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-5">
            <Logo />
            <button className="grid h-10 w-10 place-items-center lg:hidden cursor-pointer" onClick={() => setOpen(false)} aria-label="Close sidebar">
              <X size={18} />
            </button>
          </div>
          <nav className="px-3 py-4" aria-label="Dashboard">
            {dashNav.map((n) => {
              const Icon = n.icon
              return (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors duration-200 ${isActive ? 'bg-accent/10 text-accent' : 'text-mist hover:bg-white/5 hover:text-snow'}`
                  }
                >
                  <Icon size={18} />
                  {n.label}
                </NavLink>
              )
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-xs font-semibold text-accent">AR</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Alex Rivera</p>
                <p className="truncate text-xs text-mist">Business plan</p>
              </div>
              <Link to="/" className="ml-auto text-mist hover:text-snow" aria-label="Sign out">
                <LogOut size={16} />
              </Link>
            </div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/5 bg-ink-950/80 px-4 backdrop-blur-xl sm:px-6">
            <button className="grid h-11 w-11 place-items-center rounded-xl lg:hidden cursor-pointer" onClick={() => setOpen(true)} aria-label="Open sidebar">
              <Menu size={20} />
            </button>
            <div className="relative hidden flex-1 md:block">
              <input
                type="search"
                placeholder="Search services, domains, tickets"
                className="h-11 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-snow placeholder:text-mist/70"
                aria-label="Search"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative grid h-11 w-11 place-items-center rounded-xl text-mist hover:bg-white/5 hover:text-snow cursor-pointer" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
              </button>
              <Link to="/" className="hidden text-sm text-mist hover:text-snow sm:inline">Marketing site</Link>
            </div>
          </header>
          <div className="flex-1 p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function Spark({ data = [], color = '#22C55E', label }) {
  const max = Math.max(...data.map((d) => d.v), 1)
  const w = 560
  const h = 160
  const pts = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w
    const y = h - 16 - (d.v / max) * (h - 32)
    return `${x},${y}`
  })
  const d = pts.length ? `M ${pts.join(' L ')}` : ''
  const fill = pts.length ? `M 0,${h} L ${pts.join(' L ')} L ${w},${h} Z` : ''
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full" role="img" aria-label={label || 'Metric trend'}>
      <defs>
        <linearGradient id={`g-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#g-${color.replace('#', '')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2.2" />
    </svg>
  )
}

export function BarMeter({ value, max = 100, tone = 'ok' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const color = tone === 'warn' || pct > 80 ? 'bg-ember' : tone === 'bad' ? 'bg-rose' : 'bg-accent'
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Feature({ icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-ink-800/60 p-6 transition-colors duration-200 hover:border-accent/30">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-mist">{body}</p>
    </div>
  )
}

export function PriceCard({ name, price, period, desc, features, popular, cta, to }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 ${popular ? 'border-accent/50 bg-accent/5 shadow-glow' : 'border-white/10 bg-ink-800/50'}`}>
      {popular && <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-ink-950">Most popular</span>}
      <p className="text-sm font-medium text-mist">{name}</p>
      <p className="mt-3 flex items-end gap-1">
        <span className="font-mono text-4xl font-semibold tracking-tight">${price}</span>
        <span className="mb-1 text-sm text-mist">/{period}</span>
      </p>
      <p className="mt-2 text-sm text-mist">{desc}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button to={to || '/signup'} variant={popular ? 'primary' : 'secondary'} className="mt-8 w-full">
        {cta || 'Get started'} <ArrowRight size={16} />
      </Button>
    </div>
  )
}

export function PageHero({ kicker, title, body, actions, visual }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh" />
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="rise">
          {kicker && <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-mist">{kicker}</p>}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg text-mist">{body}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {visual}
      </div>
    </section>
  )
}

export { Shield, Zap, HardDrive, Server, Globe, Activity, ChevronRight, ArrowRight }
