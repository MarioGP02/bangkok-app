import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoleSelectorPage from '@/pages/RoleSelectorPage'
import CustomerLayout from '@/components/layout/CustomerLayout'
import WorkerLayout from '@/components/layout/WorkerLayout'
import MenuPage from '@/pages/customer/MenuPage'
import CartPage from '@/pages/customer/CartPage'
import TrackingPage from '@/pages/customer/TrackingPage'
import DashboardPage from '@/pages/worker/DashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing — role selector */}
        <Route path="/" element={<RoleSelectorPage />} />

        {/* Customer app — wrapped in phone frame */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="menu" replace />} />
          <Route path="menu"     element={<MenuPage />} />
          <Route path="cart"     element={<CartPage />} />
          <Route path="tracking" element={<TrackingPage />} />
        </Route>

        {/* Worker dashboard */}
        <Route path="/worker" element={<WorkerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
