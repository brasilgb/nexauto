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
import AddForm from '../forms/add-form'
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

export default async function AddCompany() {
const organizations = await getOrganizations();
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
        <AddForm organizations={organizations} />
      </Card>
    </div>
  )
}
