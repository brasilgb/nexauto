import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { SlidersHorizontal } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/src/components/ui/card'
import { SettingForm } from './setting-form'
import Image from 'next/image';
import { Setting } from '@/src/types/setting'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

async function getSetting(): Promise<Setting[]> {
const session = await auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      organization: session?.user?.organizationId,
    }),
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar configuraões: ${res.status}`);
  }

  return res.json();
}

export default async function Settings() {
  const session = await auth();
  const settings = await getSetting() as any;

  // Replace 'companyId' with the correct property from your session object, e.g., 'user?.organizationId'
  if (session?.user?.companyId) {
      redirect('/customer');
  }
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
        <CardHeader>
          <span className='text-gray-600'>Nome da aplicação:</span> <h1 className='text-lg font-bold'>{settings?.name}</h1>
        </CardHeader>
        <CardContent>
          <Image width={100} height={60} src={process.env.NEXT_PUBLIC_API_URL + `${settings?.logo ? settings?.logo : 'images/not-image.jpg'}`} alt={settings?.name} />
        </CardContent>
        <CardFooter className='flex items-center justify-end border-t'>
          <SettingForm settingid={settings} />
        </CardFooter>
      </Card>
    </div>
  )
}
