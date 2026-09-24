import express from 'express'
import cors from 'cors'
import { dispatch } from '../lib/store.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.all(/^\/api(?:\/.*)?$/, (req, res) => {
  const parts = req.path.replace(/^\/api\/?/, '').split('/').filter(Boolean)
  const result = dispatch({
    method: req.method,
    body: req.body || {},
    parts,
  })
  res.status(result.status).json(result.json)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nexora API listening on ${PORT}`)
})
