"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    resumo_datmvt: string
    resumo_valdev: string
    resumo_margem: string
    resumo_presen: string
    resumo_metdia: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "resumo_datmvt",
        header: "Data",
    },
    {
        accessorKey: "resumo_valdev",
        header: "Devolução",
    },
    {
        accessorKey: "resumo_margem",
        header: "Margem",
    },
    {
        accessorKey: "resumo_presen",
        header: "Representa%",
    },
    {
        accessorKey: "resumo_metdia",
        header: "Meta dia",
    },
]