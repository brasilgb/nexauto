import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { User as Uicon } from 'lucide-react'
import { Card } from '@/src/components/ui/card'
import { columns } from './columns'
import { User } from '@/src/types/user'
import { DataTable } from '../../../(admin-route)/components/data-table'
import { auth } from '@/auth'

interface GetData {
  org: string;
  com: string;
}

async function getUsers({ org, com }: GetData): Promise<User[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify({
      organization: org,
      company: com,
    })
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar usuários: ${res.status}`);
  }
  return res.json();
}

export default async function Companies() {
  const session = await auth() as any;
  const params = { org: session?.user?.organizationId, com: session?.user?.companyId };
  const users = await getUsers(params);
console.log(session?.user);
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center justify-left gap-2'>
          <Uicon /> Usuários
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/cudtomer">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Usuários</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Card className='p-4'>
        <DataTable columns={columns} data={users} label="Usuário" link='/customer/users/add-user' filter='name' />
      </Card>
    </div>
  )
}
