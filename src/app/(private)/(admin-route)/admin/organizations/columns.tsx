"use client"

import { Button, buttonVariants } from "@/src/components/ui/button"
import { Organization } from "@/src/types/organization"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, DatabaseBackup, Edit } from "lucide-react"
import { DeleteAlertDialog } from "@/src/components/app/DeleteAlertDialog"
import moment from "moment"
import { Badge } from "@/src/components/ui/badge"
import { maskCnpj } from "@/src/lib/utils"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "cnpj",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNPJ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fcnpj = row.original.cnpj
      return (
        <span>{maskCnpj(fcnpj)}</span>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const orgs = row.original.status;
      return (
        <div className="">
          {orgs ? <Badge variant="secondary">Ativo</Badge> : <Badge variant="destructive">Inativo</Badge>}</div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Cadastro</div>,
    cell: ({ row }) => {
      const dataa = new Date(row.getValue("createdAt"))
      const formatted = moment(dataa).format("DD/MM/YYYY")

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: " ",
    cell: ({ row }) => {
      const orgs = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Button className={`${buttonVariants({ variant: "destructive" })} bg-indigo-500 hover:bg-indigo-500/90`} size="icon" title="Limpar dados">
          <DatabaseBackup />
          </Button>
          <Button className={`${buttonVariants({ variant: "destructive" })} bg-orange-500 hover:bg-orange-500/90`} size="icon" asChild title="Editar organização">
            <Link href={`/admin/organizations/edit-organization/${orgs.id}`}>
              <Edit />
            </Link>
          </Button>
          <DeleteAlertDialog deleteId={orgs.id} module="organization" route="/admin/organizations" name="organização" />
        </div>
      )
    }
  }
]