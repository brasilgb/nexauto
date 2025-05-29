import React from 'react'
import { RadialChart } from '../charts/radial-chart'

export default function RadialChartCustomer({data}: any) {
  return (
    <div className='grid gap-4 lg:grid-cols-4 grid-cols-2'>
        <RadialChart data={data?.total_margem} title="Margem" />
        <RadialChart data={data?.total_permet} title="Perf. Meta" />
        <RadialChart data={data?.total_margem} title="Margem" />
        <RadialChart data={data?.total_permet} title="Perf. Meta" />
    </div>
  )
}