import { CustomTrigger } from '@/src/hooks/use-sidebar'
import React from 'react'
import { DropdowMenuAdm } from './dropdow-menu-adm'

export default function HeaderAdm() {
  return (
    <header className='flex bg-background h-16 shrink-0 items-center justify-between gap-2 shadow w-full'>
        <CustomTrigger />
      <div className='flex items-center gap-2 px-4'>
        <DropdowMenuAdm />
      </div>
    </header>
  )
}
