import React, { ReactNode } from 'react'

export default function AuthLayout({
  children }: { children: ReactNode; }
) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/70 via-primary to-primary/80'>
      <div className='flex items-center justify-center md:h-[560px] md:w-1/2 bg-accent rounded-4xl shadow-2xl border-2 border-white'>
        <div className='flex-1 border-r p-4 flex flex-col items-center justify-center h-full'>
          {children}
        </div>

        <div className='flex-1 h-full rounded-r-4xl border-l border-white'>
          <div className="flex items-center justify-center h-full rounded-4xl bg-[url(/images/auth-images.png)] bg-size-[auto_350px] bg-center bg-no-repeat">
            <h1 className="text-white text-2xl font-bold">Bem-vindo de volta!</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
