"use client"

import { Button } from "@/src/components/ui/button"
import { maskMoney } from "@/src/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    assoc_datmvt: string
    assoc_valdev: string
    assoc_valven: string
    assoc_margem: string
    assoc_presen: string
    assoc_metdia: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "assoc_datmvt",
        header: "Data",
    },
    {
        accessorKey: "assoc_ass",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Associação
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "assoc_metdia",
        header: "Meta dia",
        cell: ({ row }) => {
            const val = row?.original?.assoc_metdia;
            return (
                <div className="">R$ {maskMoney(val)}</div>
            )
        },
    },
    {
        accessorKey: "assoc_valven",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Faturamento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const val = row?.original?.assoc_valven;
            return (
                <div className="">R$ {maskMoney(val)}</div>
            )
        },
    },
    {
        accessorKey: "assoc_margem",
        header: "Margem (%)",
        cell: ({ row }) => {
            const val = row?.original?.assoc_margem;
            return (
                <div className="">{parseFloat(val).toFixed(2)}</div>
            )
        },
    },
    {
        accessorKey: "assoc_repres",
        header: "Representa (%)",
        cell: ({ row }) => {
            const val = row?.original?.assoc_margem;
            return (
                <div className="">{parseFloat(val).toFixed(2)}</div>
            )
        },
    },
]