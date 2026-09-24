import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Cpu,
  Globe,
  HardDrive,
  Play,
  RefreshCw,
  Server,
  Square,
} from 'lucide-react'
import { api } from '../api.js'
import { Badge, BarMeter, Button, DashLayout, Spark, StatusDot } from '../components.jsx'

function toneFor(status) {
  if (['active', 'running', 'paid', 'operational', 'valid'].includes(status)) return 'ok'
  if (['degraded', 'pending', 'open', 'high'].includes(status)) return 'warn'
  if (['stopped', 'failed', 'overdue'].includes(status)) return 'mute'
  return 'mute'
}

function useFetch(fn, deps = []) {
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let on = true
    setLoading(true)
    fn()
      .then((d) => { if (on) setData(d) })
      .catch((e) => { if (on) setErr(e.message) })
      .finally(() => { if (on) setLoading(false) })
    return () => { on = false }
  }, deps)
  return { data, err, loading, setData }
}

function Skeleton({ className }) {
  return <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />
}

export function Overview() {
  const { data, err, loading } = useFetch(() => api.overview())
  return (
    <DashLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-mist">Studio Arc · {data?.user?.plan || '…'} plan</p>
        </div>
        <Button to="/dashboard/services">Deploy <ArrowRight size={16} /></Button>
      </div>
      {err && <p className="mb-4 text-sm text-rose">{err}</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(loading ? [1, 2, 3, 4] : data.kpis).map((k, i) =>
          loading ? <Skeleton key={i} className="h-28" /> : (
            <div key={k.label} className="rounded-2xl border border-white/8 bg-ink-800/50 p-5">
              <p className="text-xs uppercase tracking-wide text-mist">{k.label}</p>
              <p className="mt-2 font-mono text-3xl font-semibold">{k.value}</p>
              <p className="mt-1 text-xs text-mist">{k.hint}</p>
            </div>
          )
        )}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-white/8 bg-ink-800/40 p-5 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Fleet CPU · 24h</h2>
            <span className="font-mono text-xs text-mist">10s samples</span>
          </div>
          {loading ? <Skeleton className="mt-4 h-40" /> : <Spark data={data.cpu} label="Fleet CPU over 24 hours" />}
        </div>
        <div className="rounded-2xl border border-white/8 bg-ink-800/40 p-5 lg:col-span-2">
          <h2 className="font-semibold">Activity</h2>
          <ul className="mt-4 space-y-3">
            {(data?.activity || []).map((a) => (
              <li key={a.id} className="flex items-start gap-2 text-sm">
                <StatusDot tone={a.tone === 'ok' ? 'ok' : a.tone === 'warn' ? 'warn' : 'mute'} />
                <span className="flex-1">{a.text}</span>
                <span className="shrink-0 text-xs text-mist">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-white/8 bg-ink-800/40 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Services</h2>
          <Link to="/dashboard/services" className="text-sm text-accent hover:underline">View all</Link>
        </div>
        <div className="divide-y divide-white/5">
          {(data?.services || []).map((s) => (
            <Link key={s.id} to={`/dashboard/services/${s.id}`} className="flex flex-wrap items-center gap-3 py-3 text-sm hover:bg-white/5">
              {s.type === 'vps' ? <Server size={16} className="text-cyan" /> : <Globe size={16} className="text-accent" />}
              <span className="font-medium">{s.name}</span>
              <Badge tone={toneFor(s.status)}>{s.status}</Badge>
              <span className="ml-auto font-mono text-xs text-mist">{s.ip} · {s.region}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashLayout>
  )
}

export function Services() {
  const { data, err, loading } = useFetch(() => api.services())
  const [filter, setFilter] = useState('all')
  const list = (data?.services || []).filter((s) => filter === 'all' || s.type === filter)
  return (
    <DashLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Services</h1>
        <div className="flex gap-2">
          {['all', 'web', 'vps'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`min-h-11 rounded-xl px-3 text-sm capitalize cursor-pointer ${filter === f ? 'bg-white/10 text-snow' : 'text-mist hover:text-snow'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {err && <p className="text-sm text-rose">{err}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {loading && <><Skeleton className="h-40" /><Skeleton className="h-40" /></>}
        {list.map((s) => (
          <Link key={s.id} to={`/dashboard/services/${s.id}`} className="rounded-2xl border border-white/8 bg-ink-800/40 p-5 transition-colors hover:border-accent/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-mist">{s.plan} · {s.region}</p>
              </div>
              <Badge tone={toneFor(s.status)}>{s.status}</Badge>
            </div>
            <p className="mt-4 font-mono text-xs text-mist">{s.ip}</p>
            {'cpuLoad' in s && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-mist"><span>CPU</span><span className="font-mono">{s.cpuLoad}%</span></div>
                <BarMeter value={s.cpuLoad} />
              </div>
            )}
            {'diskUsed' in s && s.type === 'web' && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-mist"><span>Disk</span><span className="font-mono">{s.diskUsed}/{s.diskTotal} GB</span></div>
                <BarMeter value={s.diskUsed} max={s.diskTotal} />
              </div>
            )}
          </Link>
        ))}
      </div>
    </DashLayout>
  )
}

export function ServiceDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { data, err, loading, setData } = useFetch(() => api.service(id), [id])
  const [busy, setBusy] = useState('')
  const s = data?.service
  async function act(action) {
    setBusy(action)
    try {
      const res = await api.action(id, action)
      setData((d) => ({ ...d, service: res.service }))
    } catch (e) {
      alert(e.message)
    } finally {
      setBusy('')
    }
  }
  return (
    <DashLayout>
      <button type="button" onClick={() => nav('/dashboard/services')} className="mb-4 text-sm text-mist hover:text-snow cursor-pointer">← Services</button>
      {loading && <Skeleton className="h-64" />}
      {err && <p className="text-sm text-rose">{err}</p>}
      {s && (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">{s.name}</h1>
              <p className="mt-1 text-sm text-mist">{s.plan} · {s.region} · {s.ip}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={toneFor(s.status)}>{s.status}</Badge>
              {s.type === 'vps' && (
                <>
                  <Button variant="secondary" disabled={!!busy || s.status === 'running'} onClick={() => act('start')}>
                    <Play size={14} /> {busy === 'start' ? 'Starting…' : 'Start'}
                  </Button>
                  <Button variant="secondary" disabled={!!busy || s.status !== 'running'} onClick={() => act('reboot')}>
                    <RefreshCw size={14} /> {busy === 'reboot' ? 'Rebooting…' : 'Reboot'}
                  </Button>
                  <Button variant="danger" disabled={!!busy || s.status !== 'running'} onClick={() => act('stop')}>
                    <Square size={14} /> {busy === 'stop' ? 'Stopping…' : 'Stop'}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/8 p-4">
              <p className="flex items-center gap-2 text-xs text-mist"><Cpu size={14} /> CPU</p>
              <p className="mt-2 font-mono text-2xl">{s.cpuLoad ?? '—'}%</p>
            </div>
            <div className="rounded-2xl border border-white/8 p-4">
              <p className="flex items-center gap-2 text-xs text-mist"><Server size={14} /> RAM</p>
              <p className="mt-2 font-mono text-2xl">{s.ramUsed ?? '—'}%</p>
            </div>
            <div className="rounded-2xl border border-white/8 p-4">
              <p className="flex items-center gap-2 text-xs text-mist"><HardDrive size={14} /> Disk</p>
              <p className="mt-2 font-mono text-2xl">{s.diskUsed}{s.diskTotal ? `/${s.diskTotal}` : ''}{s.type === 'web' ? ' GB' : '%'}</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/8 p-5">
            <h2 className="font-semibold">CPU trend</h2>
            <Spark data={data.metrics?.cpu || []} color="#22D3EE" label="CPU trend" />
          </div>
          <dl className="mt-6 grid gap-3 rounded-2xl border border-white/8 p-5 text-sm sm:grid-cols-2">
            {[
              ['Created', s.created],
              ['Renews', s.renews],
              ['OS', s.os || `PHP ${s.php}`],
              ['Uptime', s.uptime || 'n/a'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-white/5 py-2">
                <dt className="text-mist">{k}</dt>
                <dd className="font-mono">{v}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </DashLayout>
  )
}

export function Domains() {
  const { data, err } = useFetch(() => api.domains())
  const [q, setQ] = useState('')
  const [res, setRes] = useState(null)
  const [busy, setBusy] = useState(false)
  async function check(e) {
    e.preventDefault()
    setBusy(true)
    try { setRes(await api.checkDomain(q.trim().toLowerCase())) } catch (e2) { setRes({ error: e2.message }) }
    finally { setBusy(false) }
  }
  return (
    <DashLayout>
      <h1 className="text-2xl font-semibold">Domains</h1>
      <form onSubmit={check} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="q">Search domain</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} required placeholder="newbrand.com" className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-3" />
        <Button type="submit" disabled={busy}>{busy ? 'Checking…' : 'Check availability'}</Button>
      </form>
      {res && (
        <p className="mt-3 text-sm text-mist">{res.error || (res.available ? `${res.name} is available for $${res.price}/yr` : `${res.name} is taken`)}</p>
      )}
      {err && <p className="mt-4 text-sm text-rose">{err}</p>}
      <div className="mt-8 divide-y divide-white/5 rounded-2xl border border-white/8">
        {(data?.domains || []).map((d) => (
          <div key={d.name} className="flex flex-wrap items-center gap-3 px-5 py-4">
            <div>
              <p className="font-medium">{d.name}</p>
              <p className="text-xs text-mist">{d.dns} · expires {d.expires}</p>
            </div>
            <Badge tone={toneFor(d.status)}>{d.status}</Badge>
            <span className="ml-auto text-xs text-mist">{d.lock ? 'Transfer lock' : 'Unlocked'} · {d.privacy ? 'WHOIS privacy' : 'Public'}</span>
          </div>
        ))}
      </div>
    </DashLayout>
  )
}

export function Tickets() {
  const { data, err, setData } = useFetch(() => api.tickets())
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ subject: '', department: 'Support', priority: 'medium', body: '' })
  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      const res = await api.createTicket(form)
      setData((d) => ({ tickets: [res.ticket, ...(d?.tickets || [])] }))
      setOpen(false)
      setForm({ subject: '', department: 'Support', priority: 'medium', body: '' })
    } catch (e2) {
      alert(e2.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <DashLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Support</h1>
        <Button onClick={() => setOpen((v) => !v)}>{open ? 'Cancel' : 'New ticket'}</Button>
      </div>
      {open && (
        <form onSubmit={submit} className="mb-8 space-y-3 rounded-2xl border border-white/10 bg-ink-800/40 p-5">
          <label className="block text-sm">Subject
            <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">Department
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-ink-800 px-3">
                {['Support', 'Network', 'Billing', 'Abuse'].map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="block text-sm">Priority
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-ink-800 px-3">
                {['low', 'medium', 'high'].map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
          </div>
          <label className="block text-sm">Message
            <textarea required rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          </label>
          <Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Open ticket'}</Button>
        </form>
      )}
      {err && <p className="text-sm text-rose">{err}</p>}
      <div className="space-y-3">
        {(data?.tickets || []).map((t) => (
          <article key={t.id} className="rounded-2xl border border-white/8 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{t.subject}</p>
              <Badge tone={t.status === 'open' ? 'warn' : 'ok'}>{t.status}</Badge>
              <Badge tone={t.priority === 'high' ? 'bad' : 'mute'}>{t.priority}</Badge>
              <span className="ml-auto font-mono text-xs text-mist">{t.id}</span>
            </div>
            <p className="mt-2 text-xs text-mist">{t.department} · updated {new Date(t.updated).toLocaleString()}</p>
            <ul className="mt-4 space-y-2">
              {t.messages.map((m, i) => (
                <li key={i} className={`rounded-xl px-3 py-2 text-sm ${m.from === 'you' ? 'bg-white/5' : 'bg-accent/10'}`}>
                  <span className="text-xs uppercase tracking-wide text-mist">{m.from}</span>
                  <p>{m.body}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </DashLayout>
  )
}

export function Billing() {
  const { data, err } = useFetch(() => api.billing())
  return (
    <DashLayout>
      <h1 className="text-2xl font-semibold">Billing</h1>
      {err && <p className="mt-4 text-sm text-rose">{err}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/8 p-5">
          <p className="text-xs text-mist">Credit</p>
          <p className="mt-2 font-mono text-3xl">${data?.balance?.toFixed?.(2) || '—'}</p>
        </div>
        <div className="rounded-2xl border border-white/8 p-5">
          <p className="text-xs text-mist">Payment method</p>
          <p className="mt-2">{data?.method || '—'}</p>
        </div>
        <div className="rounded-2xl border border-white/8 p-5">
          <p className="text-xs text-mist">Next charge</p>
          <p className="mt-2 font-mono">{data?.nextCharge || '—'}</p>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-mist">
            <tr className="border-b border-white/10">
              {['Invoice', 'Date', 'Amount', 'Status', 'Method'].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {(data?.invoices || []).map((inv) => (
              <tr key={inv.id} className="border-b border-white/5">
                <td className="px-4 py-3 font-mono">{inv.id}</td>
                <td className="px-4 py-3 text-mist">{inv.date}</td>
                <td className="px-4 py-3 font-mono">${inv.amount.toFixed(2)}</td>
                <td className="px-4 py-3"><Badge tone="ok">{inv.status}</Badge></td>
                <td className="px-4 py-3 text-mist">{inv.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  )
}

export function Settings() {
  const [saved, setSaved] = useState(false)
  return (
    <DashLayout>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <form
        className="mt-6 max-w-lg space-y-4"
        onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000) }}
      >
        <label className="block text-sm">Display name
          <input defaultValue="Alex Rivera" className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
        </label>
        <label className="block text-sm">Company
          <input defaultValue="Studio Arc" className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
        </label>
        <label className="block text-sm">Email
          <input type="email" defaultValue="alex@studioarc.io" className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3" />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-accent" />
          Email me when a VPS reboots or a certificate is 14 days from expiry
        </label>
        <Button type="submit">Save changes</Button>
        {saved && <p className="text-sm text-accent" role="status">Saved.</p>}
      </form>
    </DashLayout>
  )
}
