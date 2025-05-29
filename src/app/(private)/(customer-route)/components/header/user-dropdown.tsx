
import { CreditCard, LogOut, Settings, SlidersHorizontal, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import Form from "next/form"
import logoutAction from "@/src/app/(public)/(auth)/(logout)/logoutActions"
import Link from "next/link"

export function UserDropdow({ username }: any) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-accent">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center gap-2">
          <User className="h-4 w-4" />{username?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/customer/users"}>
              <User className="h-4 w-4" />
              <span>Usuários</span>
            </Link>
          </DropdownMenuItem>
          
          {!username?.companyId &&
            <DropdownMenuItem asChild>
              <Link href={"/customer/settings"}>
                <SlidersHorizontal className="h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
          }

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Form action={logoutAction} className="w-full">
            <button className="flex items-center gap-2 w-full">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}