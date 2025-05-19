import React, { ReactNode } from 'react'
import HeaderCustomer from '../components/header/header-customer';
import FooterCustomer from '../components/footer/footer-customer';
import { auth } from '@/auth';
import FilterBar from '../components/filters/FilterBar';
import { Company } from '@/src/types/company';

async function getCompanies(): Promise<Company[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Erro ao listar filiais: ${res.status}`);
  }
  return res.json();
}

export default async function CustomerLayout({ children }: { children: ReactNode; }) {
  const session = await auth();
  const companies = await getCompanies();

  return (
    <main className='flex flex-col min-h-screen'>
      <HeaderCustomer username={session?.user?.name} />
      <div>
        <FilterBar companies={companies} />
      </div>
      <div className='flex-grow px-4 py-6 md:px-6'>
        {children}
      </div>
      <FooterCustomer />
    </main>
  )
}