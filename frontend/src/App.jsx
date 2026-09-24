import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import {
  About,
  Auth,
  Contact,
  Dedicated,
  Docs,
  DomainsMarketing,
  NetworkPage,
  Pricing,
  StatusPage,
  Vps,
  WebHosting,
} from './pages/Marketing.jsx'
import {
  Billing,
  Domains,
  Overview,
  ServiceDetail,
  Services,
  Settings,
  Tickets,
} from './pages/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/web-hosting" element={<WebHosting />} />
      <Route path="/vps" element={<Vps />} />
      <Route path="/dedicated" element={<Dedicated />} />
      <Route path="/network" element={<NetworkPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/domains" element={<DomainsMarketing />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route path="/dashboard" element={<Overview />} />
      <Route path="/dashboard/services" element={<Services />} />
      <Route path="/dashboard/services/:id" element={<ServiceDetail />} />
      <Route path="/dashboard/domains" element={<Domains />} />
      <Route path="/dashboard/tickets" element={<Tickets />} />
      <Route path="/dashboard/billing" element={<Billing />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
