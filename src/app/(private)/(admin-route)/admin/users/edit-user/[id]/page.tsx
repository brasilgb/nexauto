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
import { Organization } from '@/src/types/organization'

async function getOrganizations(): Promise<Organization[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization`, {
    cache: 'no-store'
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
  const usersys = await getUser(id);
  const organizations = await getOrganizations();

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
                <BreadcrumbLink href="/admin/users">Usuários</BreadcrumbLink>
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
        <EditForm organizations={organizations} usersys={usersys} />
      </Card>
    </div>
  )
}
