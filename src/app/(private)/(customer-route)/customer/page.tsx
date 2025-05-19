import React from 'react'
import KpisDashboard from '../components/dashboard/kpis-dashboard'
import RadialChartCustomer from '../components/dashboard/radial-chart-customer'
import { Sales } from '@/src/types/sales';
import { auth } from '@/auth';
import { Totals } from '@/src/types/totals';

interface GetData {
  org: string,
  com: string;
  dat: string;
}

async function getTotals({ org, com, dat }: GetData): Promise<Totals[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/totals`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
      // Authorization: `Bearer ${session?.user?.token}`
    },
    body: JSON.stringify({
      organization: org,
      company: com,
      date: dat
    })
  });

  // if (!res.ok) {
  //   throw new Error(`Erro ao listar totais: ${res.status}`);
  // }
  return res.json();
};

async function getSales({ org, com, dat }: GetData): Promise<Sales[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sales`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
      // Authorization: `Bearer ${session?.user?.token}`
    },
    body: JSON.stringify({
      organization: org,
      company: com,
      date: dat
    })
  });

  // if (!res.ok) {
  //   throw new Error(`Erro ao listar vendas: ${res.status}`);
  // }
  return res.json();
};

export default async function Customer() {
  const session = await auth() as any;

  // Replace these values with actual data as needed
  const params = { org: session?.user?.organizationId, com: '0', dat: '20240502' };

  const sales = await getSales(params);
  const totals = await getTotals(params);


  // const session = await auth();
  // console.log(session);

  return (
    <div className='flex flex-col gap-4'>
      {totals ?
        <>
          <KpisDashboard data={totals} />
          <RadialChartCustomer data={totals} />
        </> : <span className='text-sm text-gray-600'>Ops, não há dados para gerar análises...</span>}
    </div>
  )
}