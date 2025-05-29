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
import { Building } from 'lucide-react'
import { Card } from '@/src/components/ui/card'
import { columns } from './columns'
import { Company } from '@/src/types/company'

async function getCompanies(): Promise<Company[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar filiais: ${res.status}`);
  }
  return res.json();
}

export default async function Companies() {

  const companies = await getCompanies();
  
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
                <BreadcrumbPage>Filiais</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Card className='p-4'>
        <DataTable columns={columns} data={companies} label="Filial" link='/admin/companies/add-company' filter='subname' />
      </Card>
    </div>
  )
}
