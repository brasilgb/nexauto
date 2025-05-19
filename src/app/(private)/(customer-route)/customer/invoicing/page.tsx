'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';

import { Sales } from '@/src/types/sales';
import { Associations } from '@/src/types/associations';
import { auth } from '@/auth';
import Summary from './summary';
import Association from './association';
import { useAppContext } from '@/src/contexts/AppContext';
import moment from 'moment';

interface GetData {
  org: string,
  com: string;
  dat: string;
}

async function getAssociations({ org, com, dat }: GetData): Promise<Associations[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/associations`, {
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

export default async function Invoicing() {
  const session = await auth() as any;
  const {selectedData, companyNumber} = useAppContext();

  const params = { org: session?.user?.organizationId, com: companyNumber, dat: moment(selectedData).format("YYYYMMDD") };

  const sales = await getSales(params);
  const associations = await getAssociations(params);

  return (
    <div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className='w-full'>
          <TabsTrigger value="summary" className='text-base font-semibold text-gray-600 cursor-pointer'>Resumo</TabsTrigger>
          <TabsTrigger value="association" className='text-base font-semibold text-gray-600 cursor-pointer'>Associação</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className='mt-4'>
          {sales.length > 0 ? <Summary data={sales} /> : <span className='text-sm text-gray-600'>Ops, não há dados para gerar análises...</span>}
        </TabsContent>
        <TabsContent value="association">
          {associations.length > 0 ? <Association data={associations} /> : <span className='text-sm text-gray-600'>Ops, não há dados para gerar análises...</span>}
        </TabsContent>
      </Tabs>
    </div>
  )
}
