import React from 'react';
import moment from 'moment';

export default function FooterAdm() {
  return (
    <footer className='w-full px-3 h-8 bg-white shadow-md border-t flex items-center justify-between'>
      <p className='text-sm font-medium'>&copy;{moment().format('YYYY')}</p>
      <p className='text-sm font-semibold'>TEXT</p>
    </footer>
  )
}