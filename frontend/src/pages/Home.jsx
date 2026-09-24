import {
  Activity,
  ArrowRight,
  Globe,
  HardDrive,
  Server,
  Shield,
  Zap,
} from 'lucide-react'
import { Button, Feature, MarketingLayout, PageHero, PriceCard, StatusDot } from '../components.jsx'

function ConsolePreview() {
  return (
    <div className="rise relative rounded-2xl border border-white/10 bg-ink-800/80 p-4 shadow-card" style={{ animationDelay: '120ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-mist">
          <StatusDot />
          <span>Control plane · live</span>
        </div>
        <span className="font-mono text-xs text-mist">fra1 · 8ms</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ['CPU', '38%', 'ok'],
          ['RAM', '61%', 'ok'],
          ['Net', '2.1 Gbps', 'ok'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-white/8 bg-ink-900 p-3">
            <p className="text-[11px] uppercase tracking-wide text-mist">{k}</p>
            <p className="mt-1 font-mono text-lg font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 h-28 overflow-hidden rounded-xl border border-white/8 bg-ink-900 p-3">
        <svg viewBox="0 0 400 80" className="h-full w-full" aria-hidden="true">
          <path d="M0,50 C40,42 70,58 110,36 C150,16 180,48 220,28 C260,10 300,40 340,22 C370,12 390,30 400,24" fill="none" stroke="#22C55E" strokeWidth="2" />
          <path d="M0,62 C50,55 90,70 140,52 C190,34 240,60 290,48 C330,40 370,52 400,46" fill="none" stroke="#22D3EE" strokeWidth="1.5" opacity="0.7" />
        </svg>
      </div>
      <div className="mt-4 space-y-2">
        {['prod-edge-01 · running', 'studioarc.io · healthy', 'staging-api · running'].map((row) => (
          <div key={row} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
            <span className="flex items-center gap-2"><StatusDot /> {row}</span>
            <span className="font-mono text-xs text-mist">99.99%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <MarketingLayout>
      <PageHero
        kicker={<><StatusDot /> 38 PoPs online · 99.99% SLA</>}
        title={<>Infrastructure that feels like a product, not a ticket queue.</>}
        body="NVMe web hosting, AMD EPYC VPS, and bare metal — all on a private backbone with Anycast DNS, instant snapshots, and a console built for operators."
        actions={
          <>
            <Button to="/signup">Start free trial <ArrowRight size={16} /></Button>
            <Button to="/pricing" variant="secondary">View plans</Button>
          </>
        }
        visual={<ConsolePreview />}
      />

      <section className="border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {[
            ['38', 'global cities'],
            ['<12ms', 'EU median RTT'],
            ['99.99%', 'network SLA'],
            ['<60s', 'VPS provision'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-mono text-3xl font-semibold text-snow">{v}</p>
              <p className="mt-1 text-sm text-mist">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-medium text-accent">Platform</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to ship, scale, and sleep.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Feature icon={Zap} title="NVMe everywhere" body="Gen4 NVMe arrays with 500k IOPS class storage. No spinning rust, no noisy neighbors on Business and above." />
          <Feature icon={Shield} title="DDoS & WAF" body="Always-on L3/L4 mitigation plus optional L7 WAF. Attack traffic never touches your origin." />
          <Feature icon={Globe} title="Anycast DNS" body="Global DNS with health-checked failover. Cutover in seconds, not TTL roulette." />
          <Feature icon={Server} title="Instant VPS" body="AMD EPYC cores, dedicated vCPU on Pro, GPU SKUs, and cloud-init in under a minute." />
          <Feature icon={HardDrive} title="Hourly snapshots" body="Crash-consistent snapshots, offsite replicas, and one-click restore from the console." />
          <Feature icon={Activity} title="Live telemetry" body="CPU, RAM, disk, and net graphs with 10s resolution. Pause, inspect, act." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-ink-800/50 p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-accent">How it works</p>
              <h2 className="mt-2 text-3xl font-semibold">Provision in three moves.</h2>
              <ol className="mt-8 space-y-6">
                {[
                  ['Choose compute or web', 'Pick a region, OS image or CMS stack. Transparent hourly and monthly pricing.'],
                  ['Ship with the API or console', 'Cloud-init, SSH keys, and Git deploy. No control-panel tax.'],
                  ['Operate with live graphs', 'Alerts, snapshots, firewall, and tickets in one surface.'],
                ].map(([t, b], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-sm text-accent">{i + 1}</span>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="mt-1 text-sm text-mist">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-white/8 bg-ink-950 p-6 font-mono text-sm text-mist">
              <p className="text-accent">$ nexora vps create --region fra1 --plan compute-m</p>
              <p className="mt-3">allocating 4 vCPU / 8 GB / 160 GB NVMe</p>
              <p>injecting ssh-ed25519 AAAA...</p>
              <p>cloud-init ready</p>
              <p className="mt-3 text-snow">ipv4  45.33.32.156</p>
              <p className="text-snow">status running · 47s</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Pricing</p>
            <h2 className="mt-2 text-3xl font-semibold">Start small. Scale without a sales call.</h2>
          </div>
          <Button to="/pricing" variant="ghost">Full comparison <ArrowRight size={16} /></Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <PriceCard name="Web Starter" price="9" period="mo" desc="For sites that need speed, not a VPS." features={['20 GB NVMe', 'Free SSL & CDN', 'Daily backups', '2 isolated apps']} />
          <PriceCard popular name="Compute M" price="24" period="mo" desc="Production VPS for APIs and stores." features={['4 vCPU / 8 GB RAM', '160 GB NVMe', '32 TB transfer', 'Snapshots & API']} />
          <PriceCard name="Metal S" price="149" period="mo" desc="Single-tenant AMD EPYC, no noisy neighbors." features={['8c / 32 GB ECC', '2× 960 GB NVMe', '100 Gbps DDoS', 'Private VLAN']} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { q: 'Cut our p95 from 420ms to 90ms after moving the storefront to Frankfurt NVMe.', n: 'Maya Chen', r: 'CTO, Northline' },
            { q: 'Snapshots and the firewall UI replaced three tools. Support actually reads the ticket.', n: 'Jonas Berg', r: 'Founder, Kitepay' },
            { q: 'GPU nodes for overnight renders, then we power them off. Billing is boring — in a good way.', n: 'Priya Nair', r: 'Studio Arc' },
          ].map((t) => (
            <blockquote key={t.n} className="rounded-2xl border border-white/8 bg-ink-800/50 p-6">
              <p className="text-sm leading-relaxed text-snow/90">“{t.q}”</p>
              <footer className="mt-4 text-sm">
                <p className="font-medium">{t.n}</p>
                <p className="text-mist">{t.r}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-accent/20 bg-accent/5 px-8 py-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Ready when your stack is.</h2>
              <p className="mt-2 text-mist">14-day trial on Compute S. Card held, never charged unless you keep the node.</p>
            </div>
            <Button to="/signup">Create account <ArrowRight size={16} /></Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
