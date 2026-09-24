const headers = { 'Content-Type': 'application/json' }

async function request(path, options = {}) {
  const res = await fetch(path, { headers, ...options })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  overview: () => request('/api/overview'),
  services: () => request('/api/services'),
  service: (id) => request(`/api/services/${id}`),
  action: (id, action) => request(`/api/services/${id}/action`, { method: 'POST', body: JSON.stringify({ action }) }),
  tickets: () => request('/api/tickets'),
  createTicket: (payload) => request('/api/tickets', { method: 'POST', body: JSON.stringify(payload) }),
  billing: () => request('/api/billing'),
  domains: () => request('/api/domains'),
  checkDomain: (name) => request('/api/domains/check', { method: 'POST', body: JSON.stringify({ name }) }),
  status: () => request('/api/status'),
  me: () => request('/api/me'),
}
