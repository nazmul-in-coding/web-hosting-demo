import { dispatch } from '../lib/store.js'

export default function handler(req, res) {
  const raw = req.query.path
  const parts = Array.isArray(raw) ? raw : raw ? [raw] : []
  const result = dispatch({
    method: req.method,
    body: req.body || {},
    parts,
  })
  res.status(result.status).json(result.json)
}
