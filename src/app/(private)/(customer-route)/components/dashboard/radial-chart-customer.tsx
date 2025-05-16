import React from 'react'
import { RadialChart } from '../charts/radial-chart'

export default function RadialChartCustomer() {
  return (
    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        <RadialChart />
        <RadialChart />
        <RadialChart />
        <RadialChart />
    </div>
  )
}
