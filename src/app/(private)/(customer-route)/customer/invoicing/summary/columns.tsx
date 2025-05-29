"use client"

import { maskMoney } from "@/src/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    resumo_datmvt: string
    resumo_valdev: string
    resumo_valven: string
    resumo_margem: string
    resumo_presen: string
    resumo_metdia: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "resumo_datmvt",
        header: "Data",
        cell: ({ row }) => {
            const formatted = moment(row?.original?.resumo_datmvt).format("DD/MM/YYYY")
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "resumo_metdia",
        header: "Meta dia",
        cell: ({ row }) => {
            const val = row?.original?.resumo_metdia;
            return (
                <div className="">R$ {maskMoney(val)}</div>
            )
        },
    },
    {
        accessorKey: "resumo_valven",
        header: "Faturamento",
        cell: ({ row }) => {
            const val = row?.original?.resumo_valven;
            return (
                <div className="">R$ {maskMoney(val)}</div>
            )
        },
    },
    {
        accessorKey: "resumo_margem",
        header: "Margem (%)",
        cell: ({ row }) => {
            const val = row?.original?.resumo_margem;
            return (
                <div className="">{parseFloat(val).toFixed(2)}</div>
            )
        },
    },
    {
        accessorKey: "resumo_presen",
        header: "Representa (%)",
        cell: ({ row }) => {
            const val = row?.original?.resumo_presen;
            return (
                <div className="">{parseFloat(val).toFixed(2)}</div>
            )
        },
    },
]