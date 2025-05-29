'use client'
import React, { useEffect, useState } from 'react'
import KpisDashboard from '../components/dashboard/kpis-dashboard'
import RadialChartCustomer from '../components/dashboard/radial-chart-customer'
import { Totals } from '@/src/types/totals';
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/src/contexts/AppContext';
import moment from 'moment';
import Loading from './loading';
import CompositeChartApp from '../components/charts/CompositeChartApp';

export default function Customer() {
  const { data: session, status } = useSession();
  const { selectedDate, companyNumber, setLoading, loading } = useAppContext();
  const [totals, setTotals] = useState<Totals[]>([]);
  const [chartSales, setChartSales] = useState<Totals[]>([]);


  useEffect(() => {
    setLoading(true);
    const getTotals = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/totals`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({
          organization: session?.user?.organizationId,
          company: companyNumber,
          date: moment(selectedDate).format('YYYYMMDD')
        })
      }).then((res) => res.json())
        .then((res) => setTotals(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    getTotals();
  }, [session, companyNumber, selectedDate]);

  useEffect(() => {
    setLoading(true);
    const getChartSales = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chartsales`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({
          organization: session?.user?.organizationId,
          company: companyNumber,
          date: moment(selectedDate).format('YYYYMM')
        })
      }).then((res) => res.json())
        .then((res) => setChartSales(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    getChartSales();
  }, [session, companyNumber, selectedDate]);

  return (
    <div className='flex flex-col gap-4'>
      {loading ? <Loading />
        :
        totals ?
          <>
            <KpisDashboard data={totals} />
            <RadialChartCustomer data={totals} />
            <CompositeChartApp data={chartSales} />
          </>
          : <span className='text-sm text-gray-600'>Ops, não há dados para gerar análises...</span>}
    </div>
  )

}