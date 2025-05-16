"use client"

import Link from "next/link"
import { Bell, Menu } from "lucide-react"


import { Button } from "@/src/components/ui/button"
import { UserDropdown } from "./user-dropdown"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/src/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

import { usePathname } from "next/navigation"

export default function HeaderCustomer() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className='gap-6'>
            <NavigationMenuItem className='cursor-pointer'>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </NavigationMenuItem>

            <NavigationMenuItem className='cursor-pointer'>
              <NavigationMenuLink data-active={pathname == '/customer'} asChild className={navigationMenuTriggerStyle()}>
                <Link href="/customer">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className='cursor-pointer'>
              <NavigationMenuLink data-active={pathname == '/customer/invoicing'} asChild className={navigationMenuTriggerStyle()}>
                <Link href="/customer/invoicing">
                  Faturamento
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Notificações</span>
        </Button>
        {/* <ThemeToggle /> */}
        <UserDropdown />
      </div>
    </header>
  )
}
