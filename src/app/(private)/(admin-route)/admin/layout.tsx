import { SidebarProvider, SidebarTrigger } from '@/src/components/ui/sidebar';
import React, { ReactNode } from 'react'
import { AppSidebar } from '../components/app-sidebar';
import { cookies } from 'next/headers';
import HeaderAdm from '../components/header-adm';
import FooterAdm from '../components/footer-adm';
import { Toaster } from '@/src/components/ui/sonner';

export default async function AdminLayout({ children }: {
    children: ReactNode;
}) {

    const SIDEBAR_WIDTH = "16rem"
    const SIDEBAR_WIDTH_MOBILE = "18rem"

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider
            defaultOpen={defaultOpen}
            style={{
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties}

        >
            <AppSidebar />
            <main className='w-full flex flex-col'>
                <HeaderAdm />
                <div className='flex-grow p-6'>
                    {children}
                </div>
                <FooterAdm />
            </main>
            <Toaster />
        </SidebarProvider>
    )
}
