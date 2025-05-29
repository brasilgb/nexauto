import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Building, Building2 } from 'lucide-react'
import { Card } from '@/src/components/ui/card'
import { Organization } from '@/src/types/organization'
import EditForm from '../../forms/edit-form'
import { Company } from '@/src/types/company'

async function getOrganizations(): Promise<Organization[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar organizações: ${res.status}`);
  }
  return res.json();
};


async function getCompany(id: string): Promise<Company[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar filiais: ${res.status}`);
  }
  return res.json();
}


export default async function EditCompany({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const organizations = await getOrganizations();
  const company = await getCompany(id);
  
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center justify-left gap-2'>
          <Building /> Filiais
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/companies">Filiais</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Adicionar filial</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <EditForm organizations={organizations} company={company} />
      </Card>
    </div>
  )
}
