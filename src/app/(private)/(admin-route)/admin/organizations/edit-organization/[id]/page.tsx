import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Building2 } from 'lucide-react'
import { Card } from '@/src/components/ui/card'
import EditForm from '../../forms/edit-form'
import { Organization } from '@/src/types/organization'

async function getOrganization(id: string): Promise<Organization[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar organizações: ${res.status}`);
  }
  return res.json();
}

export default async function EditOrganization({
  params,
}: {
   params: Promise<{ id: string }>
}) {
   const { id } = await params;

   const organization = await getOrganization(id);

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center justify-left gap-2'>
          <Building2 /> Organizações
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/organizations">Organizações</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editar organização </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <EditForm organization={organization} />
      </Card>
    </div>
  )
}
