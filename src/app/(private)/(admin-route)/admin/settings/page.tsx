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
import { Card, CardContent, CardFooter } from '@/src/components/ui/card'
import { Company } from '@/src/types/company'
import { SettingForm } from './setting-form'
import Image from 'next/image';

async function getCompanies(): Promise<Company[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar filiais: ${res.status}`);
  }
  return res.json();
}

export default async function Settings() {

  const companies = await getCompanies();

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center justify-left gap-2'>
          <Building /> Configurações
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Configurações</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Card className='p-4'>
        <CardContent>
          <Image width={150} height={60} src={require('@/public/images/not-image.jpg')} alt='' />
        </CardContent>
        <CardFooter className='flex items-center justify-end border-t'>
        <SettingForm />
        </CardFooter>
      </Card>
    </div>
  )
}
