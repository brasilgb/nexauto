import moment from 'moment'
import React from 'react'

export default function FooterCustomer() {
  return (
        <footer className='border-t px-6 h-8 flex items-center justify-between bg-white drop-shadow-md'>
      <p className='text-xs font-medium text-gray-600'>&copy; {moment().format("Y")} - empresa</p>
      <p className='text-xs font-bold'>NEXT</p>
    </footer>
  )
}
