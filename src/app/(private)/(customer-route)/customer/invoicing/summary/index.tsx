import React from 'react'
import { DataTable } from '../../../components/data-table'
import { columns } from './columns'

export default function Summary({data}: any) {
  return (
    <div><DataTable columns={columns} data={data} filter={'summary'} /></div>
  )
}
