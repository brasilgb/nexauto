import React from 'react'
import { DataTable } from '../../components/data-table'
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

async function getUsers(): Promise<User[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    cache: 'no-store'
  });
  if (res.ok) {
    return res.json();
  } else {
    return [];
  }
}

export default async function Companies() {

  const users = await getUsers();
  
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
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
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
        <DataTable columns={columns} data={users} label="Usuário" link='/admin/users/add-user' filter='name' />
      </Card>
    </div>
  )
}
