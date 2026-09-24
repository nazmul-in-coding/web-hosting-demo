import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  Cpu,
  Globe,
  Network,
  Server,
  Shield,
  Sparkles,
  Wifi,
} from 'lucide-react'
import { api } from '../api.js'
import { Badge, Button, Feature, MarketingLayout, PageHero, PriceCard, StatusDot } from '../components.jsx'

export function WebHosting() {
  return (
    <MarketingLayout>
      <PageHero
        kicker="Managed web hosting"
        title="NVMe hosting for sites that cannot wait on spinning disks."
        body="Isolated PHP/Node stacks, HTTP/3, free SSL, and a global CDN. Deploy WordPress, Laravel, or static in minutes."
        actions={<><Button to="/signup">Launch a site</Button><Button to="/pricing" variant="secondary">Compare plans</Button></>}
        visual={
          <div className="rounded-2xl border border-white/10 bg-ink-800 p-6 shadow-card">
            <p className="text-sm text-mist">studioarc.io</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[['TTFB', '38 ms'], ['HTTP/3', 'On'], ['PHP', '8.3'], ['CDN', '38 PoPs']].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-ink-950 p-4">
                  <p className="text-xs text-mist">{k}</p>
                  <p className="mt-1 font-mono text-xl">{v}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-3">
        <Feature icon={Sparkles} title="LiteSpeed + Redis" body="Object cache, HTTP/3, and Brotli out of the box. No plugin gymnastics." />
        <Feature icon={Shield} title="Isolated accounts" body="Each site in its own container. One compromise never becomes a fleet event." />
        <Feature icon={Globe} title="Free CDN & SSL" body="Let’s Encrypt auto-renew plus Anycast edge cache for static assets." />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          <PriceCard name="Starter" price="9" period="mo" desc="Personal sites and staging." features={['20 GB NVMe', '200 GB transfer', '2 sites', 'Daily backups']} />
          <PriceCard popular name="Business" price="29" period="mo" desc="Stores and client work." features={['100 GB NVMe', '1 TB transfer', '10 sites', 'Staging + Git']} />
          <PriceCard name="Agency" price="79" period="mo" desc="Teams shipping many brands." features={['400 GB NVMe', 'Unmetered*', 'Unlimited sites', 'White-label']} />
        </div>
      </section>
    </MarketingLayout>
  )
}

export function Vps() {
  return (
    <MarketingLayout>
      <PageHero
        kicker="Cloud VPS"
        title="Dedicated vCPU. Honest RAM. Provisioned in under a minute."
        body="AMD EPYC, NVMe, 20 Gbps ports, and hourly billing. GPU SKUs for render and inference when you need them."
        actions={<><Button to="/signup">Deploy a VPS</Button><Button to="/network" variant="secondary">See network</Button></>}
        visual={
          <div className="rounded-2xl border border-white/10 bg-ink-800 p-6 font-mono text-sm shadow-card">
            <p className="text-mist"># cloud-init</p>
            <p className="mt-2 text-accent">users:</p>
            <p>  - name: deploy</p>
            <p>    ssh_authorized_keys: [ed25519]</p>
            <p className="mt-2 text-accent">runcmd:</p>
            <p>  - ufw allow 22,443/tcp</p>
            <p>  - systemctl enable --now caddy</p>
          </div>
        }
      />
      <section className="mx-auto max-w-7xl overflow-x-auto px-4 pb-24 sm:px-6">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-mist">
            <tr className="border-b border-white/10">
              {['Plan', 'vCPU', 'RAM', 'NVMe', 'Transfer', 'Monthly'].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Compute S', '2', '4 GB', '80 GB', '8 TB', '$12'],
              ['Compute M', '4', '8 GB', '160 GB', '32 TB', '$24'],
              ['Compute L', '8', '16 GB', '320 GB', '48 TB', '$48'],
              ['GPU L', '8', '32 GB', '400 GB', '32 TB', '$199'],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-white/5">
                {row.map((c, i) => (
                  <td key={i} className={`px-3 py-4 ${i === 0 ? 'font-medium' : 'font-mono text-mist'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </MarketingLayout>
  )
}

export function Dedicated() {
  return (
    <MarketingLayout>
      <PageHero
        kicker="Bare metal"
        title="Single-tenant EPYC. No hypervisor. No noisy neighbors."
        body="Shipped in hours, not weeks. Dual 25G, private VLAN, IPMI, and 100 Gbps DDoS included."
        actions={<><Button to="/contact">Talk to metal ops</Button><Button to="/pricing" variant="secondary">See SKUs</Button></>}
        visual={
          <div className="grid gap-3 sm:grid-cols-2">
            {[['Metal S', '8c / 32G', '$149'], ['Metal M', '16c / 64G', '$249'], ['Metal L', '32c / 128G', '$449'], ['Metal XL', '64c / 256G', '$799']].map(([n, s, p]) => (
              <div key={n} className="rounded-2xl border border-white/10 bg-ink-800 p-5">
                <p className="text-sm text-mist">{n}</p>
                <p className="mt-1 font-medium">{s}</p>
                <p className="mt-2 font-mono text-accent">{p}/mo</p>
              </div>
            ))}
          </div>
        }
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-24 sm:px-6 md:grid-cols-3">
        <Feature icon={Cpu} title="AMD EPYC 9004" body="ZEN4 cores, ECC DDR5, and RAID-1 NVMe on every SKU." />
        <Feature icon={Network} title="Dual 25G uplinks" body="LACP into our private backbone. Optional 100G on XL." />
        <Feature icon={Wifi} title="Remote hands 24/7" body="KVM over IP, smart hands, and hardware replacement SLA." />
      </section>
    </MarketingLayout>
  )
}

export function NetworkPage() {
  return (
    <MarketingLayout>
      <PageHero
        kicker="Network"
        title="A private backbone, not a best-effort internet hop."
        body="38 cities, Anycast DNS, 20+ Tbps of DDoS capacity, and peering with the networks your users already sit on."
        actions={<Button to="/status">Live status</Button>}
      />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Frankfurt', 'Amsterdam', 'London', 'Paris', 'Madrid', 'New York', 'Ashburn', 'Chicago', 'Sao Paulo', 'Singapore', 'Tokyo', 'Sydney'].map((c) => (
            <div key={c} className="flex items-center justify-between rounded-xl border border-white/8 bg-ink-800/50 px-4 py-4">
              <span className="flex items-center gap-2"><StatusDot /> {c}</span>
              <span className="font-mono text-xs text-mist">operational</span>
            </div>
          ))}
        </div>
      </section>
    </MarketingLayout>
  )
}

export function Pricing() {
  const [annual, setAnnual] = useState(true)
  const mul = annual ? 0.8 : 1
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight">Simple pricing. No surprise bandwidth bills.</h1>
        <p className="mt-3 max-w-2xl text-mist">Annual billing saves 20%. Bandwidth is unmetered on fair-use Agency and included on VPS as listed.</p>
        <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-ink-800 p-1">
          <button type="button" onClick={() => setAnnual(false)} className={`min-h-11 rounded-lg px-4 text-sm cursor-pointer ${!annual ? 'bg-white/10 text-snow' : 'text-mist'}`}>Monthly</button>
          <button type="button" onClick={() => setAnnual(true)} className={`min-h-11 rounded-lg px-4 text-sm cursor-pointer ${annual ? 'bg-white/10 text-snow' : 'text-mist'}`}>Annual · 20% off</button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <PriceCard name="Web Business" price={Math.round(29 * mul)} period="mo" desc="Managed hosting for revenue sites." features={['100 GB NVMe', '10 sites', 'Git + staging', 'WAF included']} />
          <PriceCard popular name="Compute M" price={Math.round(24 * mul)} period="mo" desc="The production default." features={['4 vCPU / 8 GB', '160 GB NVMe', '32 TB transfer', 'API + snapshots']} />
          <PriceCard name="Metal S" price={Math.round(149 * mul)} period="mo" desc="Dedicated, no hypervisor." features={['8c / 32 GB ECC', 'RAID-1 NVMe', '25G dual uplink', 'IPMI']} />
        </div>
        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-mist">
                {['', 'Starter', 'Business', 'Compute M', 'Metal S'].map((h) => <th key={h} className="px-3 py-3 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ['Root / SSH', '—', '—', 'Yes', 'Yes'],
                ['Managed stack', 'Yes', 'Yes', 'Optional', 'No'],
                ['Snapshots', 'Daily', 'Hourly', 'Hourly', 'Hardware RAID'],
                ['DDoS', '20 Gbps', '20 Gbps', '20 Gbps', '100 Gbps'],
                ['Support', 'Ticket', 'Priority', 'Priority', 'Metal ops'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-white/5">
                  {row.map((c, i) => <td key={i} className="px-3 py-3">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MarketingLayout>
  )
}

export function StatusPage() {
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    api.status().then(setData).catch((e) => setErr(e.message))
  }, [])
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="flex items-center gap-2 text-sm text-mist"><StatusDot tone={data?.overall === 'operational' ? 'ok' : 'warn'} /> System status</p>
        <h1 className="mt-2 text-4xl font-semibold">
          {data?.overall === 'operational' ? 'All systems operational' : data ? 'Partial degradation' : 'Checking…'}
        </h1>
        {err && <p className="mt-4 text-sm text-rose">{err}</p>}
        <div className="mt-10 space-y-3">
          {(data?.components || []).map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-xl border border-white/8 bg-ink-800/50 px-4 py-4">
              <span>{c.name}</span>
              <Badge tone={c.status === 'operational' ? 'ok' : 'warn'}>{c.status}</Badge>
            </div>
          ))}
        </div>
        <h2 className="mt-14 text-xl font-semibold">Regions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(data?.regions || []).map((r) => (
            <div key={r.name} className="flex items-center justify-between rounded-xl border border-white/8 px-4 py-4">
              <span className="flex items-center gap-2"><StatusDot tone={r.status === 'operational' ? 'ok' : 'warn'} /> {r.name}</span>
              <span className="font-mono text-sm text-mist">{r.latency} ms</span>
            </div>
          ))}
        </div>
      </div>
    </MarketingLayout>
  )
}

export function About() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-semibold">Built by operators, for operators.</h1>
        <p className="mt-5 text-mist">Nexora started as an internal platform for studios that outgrew shared hosting but refused the complexity tax of hyperscalers. We run our own racks in carrier hotels, write our own provisioner, and staff support with people who have SSH’d into production at 3am.</p>
        <ul className="mt-8 space-y-3 text-sm">
          {['Founded 2019 · privately held', '38 points of presence', 'SOC 2 Type II and ISO 27001', 'Carbon-matched power in EU metros'].map((x) => (
            <li key={x} className="flex gap-2"><Check size={16} className="mt-0.5 text-accent" /> {x}</li>
          ))}
        </ul>
      </div>
    </MarketingLayout>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-semibold">Talk to us.</h1>
        <p className="mt-3 text-mist">Sales, migrations, or a stubborn BGP session — we read every message.</p>
        {sent ? (
          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm">Thanks. A human will reply within one business hour.</p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
          >
            <label className="block text-sm">Name
              <input required className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
            </label>
            <label className="block text-sm">Work email
              <input type="email" required className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
            </label>
            <label className="block text-sm">Message
              <textarea required rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
            </label>
            <Button type="submit" className="w-full">Send</Button>
          </form>
        )}
      </div>
    </MarketingLayout>
  )
}

export function Docs() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-semibold">Documentation</h1>
        <p className="mt-3 text-mist">High-signal guides. No 40-page getting started novels.</p>
        <div className="mt-10 space-y-3">
          {[
            ['Create a VPS with cloud-init', 'Pass SSH keys, UFW, and Caddy in one YAML blob.'],
            ['Point a domain to Anycast DNS', 'Glue, DS records, and health-checked failover.'],
            ['Snapshot and restore', 'Crash-consistent disks and offsite copies.'],
            ['API tokens', 'Scoped tokens for CI. Never put root keys in Git.'],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-white/8 bg-ink-800/40 p-5">
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm text-mist">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </MarketingLayout>
  )
}

export function DomainsMarketing() {
  const [q, setQ] = useState('studio.io')
  const [res, setRes] = useState(null)
  const [busy, setBusy] = useState(false)
  async function check(e) {
    e.preventDefault()
    setBusy(true)
    try {
      setRes(await api.checkDomain(q.trim().toLowerCase()))
    } catch (err) {
      setRes({ error: err.message })
    } finally {
      setBusy(false)
    }
  }
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-semibold">Find a domain. Park it on Anycast DNS.</h1>
        <form onSubmit={check} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="dom">Domain</label>
          <input id="dom" value={q} onChange={(e) => setQ(e.target.value)} className="h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4" placeholder="yourbrand.com" />
          <Button type="submit" disabled={busy}>{busy ? 'Checking…' : 'Check'}</Button>
        </form>
        {res && !res.error && (
          <div className="mt-6 rounded-2xl border border-white/10 p-5">
            <p className="font-medium">{res.name}</p>
            <p className="mt-1 text-sm text-mist">{res.available ? `Available from $${res.price}/yr` : 'Not available'}</p>
            {res.available && <Button to="/signup" className="mt-4">Register</Button>}
          </div>
        )}
      </div>
    </MarketingLayout>
  )
}

export function Auth({ mode }) {
  const signup = mode === 'signup'
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold">{signup ? 'Create your Nexora account' : 'Welcome back'}</h1>
        <p className="mt-2 text-sm text-mist">{signup ? '14-day trial. No charge unless you keep a service.' : 'Sign in to the console.'}</p>
        <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard' }}>
          {signup && (
            <label className="block text-sm">Name
              <input required className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
            </label>
          )}
          <label className="block text-sm">Email
            <input type="email" required defaultValue="alex@studioarc.io" className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" autoComplete="email" />
          </label>
          <label className="block text-sm">Password
            <input type="password" required defaultValue="password" className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" autoComplete={signup ? 'new-password' : 'current-password'} />
          </label>
          <Button type="submit" className="w-full">{signup ? 'Create account' : 'Sign in'} <ArrowRight size={16} /></Button>
        </form>
        <p className="mt-6 text-sm text-mist">
          {signup ? <>Already have an account? <a href="/login" className="text-accent">Sign in</a></> : <>New here? <a href="/signup" className="text-accent">Create account</a></>}
        </p>
      </div>
    </MarketingLayout>
  )
}
