import React, { ReactNode } from 'react'

export default function AuthLayout({
  children }: { children: ReactNode; }
) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-primary'>
      <div className='flex items-center justify-center w-1/2 bg-accent rounded-4xl shadow-2xl'>
        <div className='flex-1 border-r p-4 flex flex-col items-center justify-center'>
      {children}
        </div>

        <div className='flex-1 bg-[url(/img/mountains.jpg)] bg-cover bg-center bg-no-repeat rounded-4xl'>
          <div className="flex items-center justify-center h-full bg-black/50 rounded-4xl">
            <h1 className="text-white text-2xl font-bold">Bem-vindo de volta!</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
