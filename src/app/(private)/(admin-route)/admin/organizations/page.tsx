import React from 'react'
import { DataTable } from '../../components/data-table'
import { columns } from './columns'
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
import { Organization } from '@/src/types/organization'

async function getOrganizations(): Promise<Organization[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization`, {
    cache: 'no-store'
  });

   if (res.ok) {
    return res.json();
  } else {
    return [];
  }
};

export default async function Organizations() {

  const organizations = await getOrganizations();
 
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
                <BreadcrumbPage>Organizações</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Card className='p-4'>
        <DataTable columns={columns} data={organizations} label="Organização" link='/admin/organizations/add-organization' filter='name' />
      </Card>
    </div>
  )
}