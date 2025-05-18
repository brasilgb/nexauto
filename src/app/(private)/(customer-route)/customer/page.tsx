import React from 'react'
import KpisDashboard from '../components/dashboard/kpis-dashboard'
import RadialChartCustomer from '../components/dashboard/radial-chart-customer'
import { Sales } from '@/src/types/sales';
import { auth } from '@/auth';
import { Totals } from '@/src/types/totals';

async function getTotals(): Promise<Totals[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/totals`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
      // Authorization: `Bearer ${session?.user?.token}`
    },
    body: JSON.stringify({
      organization: '4bbc410e-5217-4d46-bd40-b969afa0b207',
      company: '0',
      date: '20240502'
    })
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar totais: ${res.status}`);
  }
  return res.json();
};

async function getSales(): Promise<Sales[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sales`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
      // Authorization: `Bearer ${session?.user?.token}`
    },
    body: JSON.stringify({
      organization: '4bbc410e-5217-4d46-bd40-b969afa0b207',
      company: '0',
      date: '20240502'
    })
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar vendas: ${res.status}`);
  }
  return res.json();
};

export default async function Customer() {
  const sales = await getSales();
  const totals = await getTotals();
  // const session = await auth();
  // console.log(session);
  
  return (
    <div className='flex flex-col gap-4'>
      <KpisDashboard data={totals} />
      <RadialChartCustomer data={totals} />
    </div>
  )
}