export const now = () => new Date().toISOString()

export const user = {
  id: 'usr_8f21',
  name: 'Alex Rivera',
  email: 'alex@studioarc.io',
  company: 'Studio Arc',
  plan: 'Business',
  avatar: 'AR',
  joined: '2024-03-12',
  balance: 248.6,
}

export const services = [
  {
    id: 'srv_web_01',
    type: 'web',
    name: 'studioarc.io',
    plan: 'Business NVMe',
    status: 'active',
    region: 'Frankfurt',
    ip: '185.199.108.14',
    ssl: 'valid',
    php: '8.3',
    diskUsed: 42,
    diskTotal: 100,
    bandwidthUsed: 186,
    bandwidthTotal: 1000,
    renews: '2026-10-12',
    created: '2024-03-12',
  },
  {
    id: 'srv_web_02',
    type: 'web',
    name: 'arc-preview.com',
    plan: 'Starter',
    status: 'active',
    region: 'Amsterdam',
    ip: '185.199.109.22',
    ssl: 'valid',
    php: '8.2',
    diskUsed: 8,
    diskTotal: 20,
    bandwidthUsed: 24,
    bandwidthTotal: 200,
    renews: '2026-11-02',
    created: '2025-11-02',
  },
  {
    id: 'srv_vps_01',
    type: 'vps',
    name: 'prod-edge-01',
    plan: 'Compute M',
    status: 'running',
    region: 'New York',
    ip: '45.33.32.156',
    os: 'Ubuntu 24.04 LTS',
    cpu: 4,
    ram: 8,
    disk: 160,
    cpuLoad: 38,
    ramUsed: 61,
    diskUsed: 44,
    uptime: '47d 12h',
    renews: '2026-10-01',
    created: '2024-06-18',
  },
  {
    id: 'srv_vps_02',
    type: 'vps',
    name: 'staging-api',
    plan: 'Compute S',
    status: 'running',
    region: 'Singapore',
    ip: '139.180.191.44',
    os: 'Debian 12',
    cpu: 2,
    ram: 4,
    disk: 80,
    cpuLoad: 12,
    ramUsed: 33,
    diskUsed: 21,
    uptime: '12d 4h',
    renews: '2026-09-28',
    created: '2025-09-28',
  },
  {
    id: 'srv_vps_03',
    type: 'vps',
    name: 'gpu-render',
    plan: 'GPU L',
    status: 'stopped',
    region: 'London',
    ip: '51.38.82.201',
    os: 'Ubuntu 22.04 LTS',
    cpu: 8,
    ram: 32,
    disk: 400,
    cpuLoad: 0,
    ramUsed: 0,
    diskUsed: 18,
    uptime: '0d 0h',
    renews: '2026-12-04',
    created: '2025-12-04',
  },
]

export const tickets = [
  {
    id: 'TCK-1842',
    subject: 'Increase inbound firewall for staging-api',
    department: 'Network',
    status: 'open',
    priority: 'high',
    updated: '2026-09-23T16:40:00Z',
    messages: [
      { from: 'you', body: 'Need TCP 8443 open for the new webhook receiver on staging-api.', at: '2026-09-23T14:12:00Z' },
      { from: 'nexora', body: 'Opened a change window. Confirming source CIDR before applying.', at: '2026-09-23T16:40:00Z' },
    ],
  },
  {
    id: 'TCK-1790',
    subject: 'Invoice VAT ID correction',
    department: 'Billing',
    status: 'resolved',
    priority: 'low',
    updated: '2026-09-18T09:10:00Z',
    messages: [
      { from: 'you', body: 'Please update VAT ID on invoice INV-2044.', at: '2026-09-17T11:02:00Z' },
      { from: 'nexora', body: 'Updated and reissued. Credit note attached in billing.', at: '2026-09-18T09:10:00Z' },
    ],
  },
]

export const invoices = [
  { id: 'INV-2048', date: '2026-09-01', amount: 129.0, status: 'paid', method: 'Visa •• 4242' },
  { id: 'INV-2044', date: '2026-08-01', amount: 129.0, status: 'paid', method: 'Visa •• 4242' },
  { id: 'INV-2039', date: '2026-07-01', amount: 89.0, status: 'paid', method: 'Visa •• 4242' },
]

export const domains = [
  { name: 'studioarc.io', status: 'active', expires: '2027-03-12', dns: 'Nexora Anycast', lock: true, privacy: true },
  { name: 'arc-preview.com', status: 'active', expires: '2026-11-02', dns: 'Nexora Anycast', lock: true, privacy: true },
  { name: 'nexora-lab.dev', status: 'pending', expires: '2027-01-08', dns: 'External', lock: false, privacy: true },
]

export const activity = [
  { id: 1, text: 'VPS prod-edge-01 snapshot created', time: '12m ago', tone: 'ok' },
  { id: 2, text: 'SSL renewed for studioarc.io', time: '2h ago', tone: 'ok' },
  { id: 3, text: 'Firewall rule pending on staging-api', time: '4h ago', tone: 'warn' },
  { id: 4, text: 'Invoice INV-2048 settled', time: '1d ago', tone: 'ok' },
  { id: 5, text: 'gpu-render powered off on schedule', time: '2d ago', tone: 'muted' },
]

export function series(points, base, swing) {
  return Array.from({ length: points }, (_, i) => ({
    t: i,
    v: Math.max(4, Math.round(base + Math.sin(i / 3) * swing + ((i * 13) % 7) - 3)),
  }))
}

function json(status, payload) {
  return { status, json: payload }
}

export function dispatch({ method, body = {}, parts = [] }) {
  const [a, b, c] = parts
  const verb = (method || 'GET').toUpperCase()

  if (a === 'health' && verb === 'GET') {
    return json(200, { ok: true, service: 'nexora-api', time: now() })
  }

  if (a === 'me' && verb === 'GET') {
    return json(200, user)
  }

  if (a === 'overview' && verb === 'GET') {
    return json(200, {
      user,
      kpis: [
        { label: 'Active services', value: '4', hint: '1 powered off' },
        { label: 'Uptime (30d)', value: '99.99%', hint: '0 incidents' },
        { label: 'Bandwidth', value: '210 GB', hint: 'of 1.2 TB' },
        { label: 'Open tickets', value: '1', hint: 'high priority' },
      ],
      services,
      activity,
      cpu: series(24, 34, 18),
      net: series(24, 42, 22),
    })
  }

  if (a === 'services' && !b && verb === 'GET') {
    return json(200, { services })
  }

  if (a === 'services' && b && !c && verb === 'GET') {
    const item = services.find((s) => s.id === b)
    if (!item) return json(404, { error: 'Service not found' })
    return json(200, {
      service: item,
      metrics: {
        cpu: series(24, item.cpuLoad || 20, 16),
        ram: series(24, item.ramUsed || 30, 12),
        net: series(24, 40, 20),
      },
    })
  }

  if (a === 'services' && b && c === 'action' && verb === 'POST') {
    const item = services.find((s) => s.id === b)
    if (!item) return json(404, { error: 'Service not found' })
    const action = body.action
    if (item.type === 'vps') {
      if (action === 'start') item.status = 'running'
      if (action === 'stop') item.status = 'stopped'
      if (action === 'reboot' && item.status === 'running') item.status = 'running'
    }
    return json(200, { ok: true, service: item, action, at: now() })
  }

  if (a === 'tickets' && verb === 'GET') {
    return json(200, { tickets })
  }

  if (a === 'tickets' && verb === 'POST') {
    const { subject, department, priority, body: message } = body
    if (!subject || !message) {
      return json(400, { error: 'Subject and message are required' })
    }
    const ticket = {
      id: `TCK-${1800 + tickets.length + 1}`,
      subject,
      department: department || 'Support',
      status: 'open',
      priority: priority || 'medium',
      updated: now(),
      messages: [{ from: 'you', body: message, at: now() }],
    }
    tickets.unshift(ticket)
    return json(201, { ticket })
  }

  if (a === 'billing' && verb === 'GET') {
    return json(200, { invoices, balance: user.balance, method: 'Visa •• 4242', nextCharge: '2026-10-01' })
  }

  if (a === 'domains' && !b && verb === 'GET') {
    return json(200, { domains })
  }

  if (a === 'domains' && b === 'check' && verb === 'POST') {
    const name = (body.name || '').toLowerCase()
    if (!name) return json(400, { error: 'Domain required' })
    const taken = domains.some((d) => d.name === name) || name.includes('google')
    return json(200, {
      name,
      available: !taken,
      price: taken ? null : 12.99,
      premium: name.length < 5,
    })
  }

  if (a === 'status' && verb === 'GET') {
    return json(200, {
      overall: 'operational',
      updated: now(),
      regions: [
        { name: 'Frankfurt', latency: 8, status: 'operational' },
        { name: 'Amsterdam', latency: 12, status: 'operational' },
        { name: 'London', latency: 14, status: 'operational' },
        { name: 'New York', latency: 72, status: 'operational' },
        { name: 'Singapore', latency: 168, status: 'degraded' },
        { name: 'Sao Paulo', latency: 198, status: 'operational' },
      ],
      components: [
        { name: 'Control plane', status: 'operational' },
        { name: 'Anycast DNS', status: 'operational' },
        { name: 'Object storage', status: 'operational' },
        { name: 'Billing API', status: 'operational' },
        { name: 'Asia peering', status: 'degraded' },
      ],
    })
  }

  return json(404, { error: 'Not found' })
}
