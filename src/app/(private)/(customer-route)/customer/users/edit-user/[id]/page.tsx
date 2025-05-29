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
import EditForm from '../../forms/edit-form'
import { User } from '@/src/types/user'
import { Company } from '@/src/types/company'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


async function getCompanies(org: string): Promise<Company[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company-branch`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify({
      organization: org,
    })
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar organizações: ${res.status}`);
  }
  return res.json();
};

async function getUser(id: string): Promise<User[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar usuários: ${res.status}`);
  }
  return res.json();
}

export default async function EditUser({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const usersys = await getUser(id) as any;
  const session = await auth() as any;
  const companies = await getCompanies(session?.user?.organizationId);
  if(usersys?.is_admin  && session?.user?.organizationId){
    return redirect('/customer/users');
  }
  if (session?.user?.email !== usersys?.email && session?.user?.organizationId  && session?.user?.companyId) {
    return redirect('/customer/users');
  }

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
                <BreadcrumbLink href="/customer">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/customer/users">Usuários</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editar usuário</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <EditForm companies={companies} usersys={usersys} />
      </Card>
    </div>
  )
}
