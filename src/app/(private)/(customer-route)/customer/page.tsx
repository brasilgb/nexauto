import React from 'react'
import KpisDashboard from '../components/dashboard/kpis-dashboard'
import RadialChartCustomer from '../components/dashboard/radial-chart-customer'

export default function Customer() {
  return (
    <div className='flex flex-col gap-4'>
      <KpisDashboard />
      <RadialChartCustomer />
    </div>
  )
}