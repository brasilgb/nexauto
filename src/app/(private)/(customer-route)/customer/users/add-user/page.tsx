import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import AddForm from '../forms/add-form'
import { User as Uicon } from 'lucide-react';
import { Card } from '@/src/components/ui/card';
import { Company } from '@/src/prisma/client';
import { auth } from '@/auth';

async function getCompanies(org: string): Promise<Company[]> {
// console.log(org);

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

export default async function AddUser() {
  const session = await auth() as any;
  const companies = await getCompanies(session?.user?.organizationId);

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
                <BreadcrumbPage>Adicionar usuário</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <AddForm companies={companies} />
      </Card>
    </div>
  )
}
