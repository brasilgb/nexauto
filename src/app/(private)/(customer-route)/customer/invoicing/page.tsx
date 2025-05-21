'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';

import { Sales } from '@/src/types/sales';
import { Associations } from '@/src/types/associations';
import Summary from './summary';
import Association from './association';
import { useAppContext } from '@/src/contexts/AppContext';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../loading';

declare module 'next-auth' {
  interface User {
    organizationId?: string;
  }
}

export default function Invoicing() {
  const { data: session, status } = useSession();
  const { selectedDate, companyNumber, setLoading, loading } = useAppContext();
  const [sales, setSales] = useState<Sales[]>([]);
  const [associations, setAssociations] = useState<Associations[]>([]);

  useEffect(() => {
    setLoading(true);
    const getSales = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sales`, {
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
        .then((res) => setSales(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    getSales();
  }, [session, companyNumber, selectedDate]);

  useEffect(() => {
    setLoading(true);
    const getAssociation = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/associations`, {
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
        .then((res) => setAssociations(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    getAssociation();
  }, [session, companyNumber, selectedDate]);

  return (
    <>
      {loading && <Loading />}

      <Tabs defaultValue="summary">
        <div className='w-full bg-gray-100 rounded-md p-1'>
          <TabsList>
            <TabsTrigger value="summary" className='text-base font-medium text-gray-600 cursor-pointer px-6 !rounded-sm'>Resumo</TabsTrigger>
            <TabsTrigger value="association" className='text-base font-medium text-gray-600 cursor-pointer px-6 !rounded-sm'>Associação</TabsTrigger>
          </TabsList>
        </div>
        {!loading &&
          <>
            <TabsContent value="summary" className='mt-4'>
              {sales.length > 0 ? <Summary data={sales} /> : <span className='text-sm text-gray-600'>Ops, não há dados para gerar análises...</span>}
            </TabsContent>
            <TabsContent value="association" className='mt-4'>
              {associations.length > 0 ? <Association data={associations} /> : <span className='text-sm text-gray-600'>Ops, não há dados para gerar análises...</span>}
            </TabsContent>
          </>
        }
      </Tabs>
    </>
  )
}
