import React, { ReactNode } from 'react'
import HeaderCustomer from '../components/header/header-customer';
import FooterCustomer from '../components/footer/footer-customer';
import { auth } from '@/auth';
export default async function CustomerLayout({ children }: { children: ReactNode; }) {
  const session = await auth();
  return (
    <main className='flex flex-col min-h-screen'>
      <HeaderCustomer username={session?.user?.name}/>
      <div className='flex-grow px-4 py-6 md:px-6'>
        {children}
      </div>
      <FooterCustomer />
    </main>
  )
}