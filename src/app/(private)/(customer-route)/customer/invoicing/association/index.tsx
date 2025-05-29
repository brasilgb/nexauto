import React from 'react'
import { columns } from './columns'
import { DataTable } from '../../../components/data-table'

export default function Association({data}: any) {
  return (
    <div><DataTable columns={columns} data={data} filter={''} /></div>
  )
}