import React, { ReactNode } from 'react'
import HeaderCustomer from '../components/header/header-customer';
import FooterCustomer from '../components/footer/footer-customer';
import { auth } from '@/auth';
import FilterBar from '../components/filters/FilterBar';
import { Company } from '@/src/types/company';
import ClientSessionProvider from '@/src/components/app/ClientSessionProvider';
import { Toaster } from '@/src/components/ui/sonner';

export default async function CustomerLayout({ children }: { children: ReactNode; }) {
  const session = await auth();

  return (
    <main className='flex flex-col min-h-screen'>
        <ClientSessionProvider>
        <HeaderCustomer userdata={session?.user} />
        <div>
          <FilterBar />
        </div>
        <div className='flex-grow px-4'>
          {children}
        </div>
        <Toaster />
        <FooterCustomer />
    </ClientSessionProvider>
      </main>
  )
}