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
import { Building, SlidersHorizontal } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/src/components/ui/card'
import { SettingForm } from './setting-form'
import Image from 'next/image';
import { Setting } from '@/src/types/setting'

async function getSetting(): Promise<Setting[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar configuraões: ${res.status}`);
  }

  return res.json();
}

export default async function Settings() {

  const settings = await getSetting();

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center justify-left gap-2'>
          <SlidersHorizontal /> Configurações
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
          <Image width={150} height={60} src={`${settings[0]?.logo ? 'http://localhost:3000/public/images/' + settings[0]?.logo : '/images/not-image.jpg'}`} alt='' />
        </CardContent>
        <CardFooter className='flex items-center justify-end border-t'>
          <SettingForm settingid={settings} />
        </CardFooter>
      </Card>
    </div>
  )
}
