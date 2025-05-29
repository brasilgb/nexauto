"use client"

import Link from "next/link"
import { Bell, Menu } from "lucide-react"


import { Button } from "@/src/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/src/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

import { usePathname } from "next/navigation"
import { UserDropdow } from "./user-dropdown"
import { useEffect, useState } from "react"

export default function HeaderCustomer({ userdata }: any) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>([]);

  useEffect(() => {
    const getSettings = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting/${userdata?.organizationId}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => res.json())
        .then((res) => {
          setSettings(res);
        })
        .catch((err) => console.log(err));
    };
    getSettings();
  }, [userdata]);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className='gap-6'>
            <NavigationMenuItem className='cursor-pointer'>
              <NavigationMenuLink asChild className="hover:bg-transparent active:bg-transparent focus:bg-transparent">
                <Link href="/customer">
                  <Avatar>
                    <AvatarImage src={process.env.NEXT_PUBLIC_API_URL + `${settings?.logo ? settings?.logo : 'images/not-image.jpg'}`} alt={settings?.name} />
                  </Avatar>
                </Link>
              </NavigationMenuLink>
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
        <UserDropdow username={userdata} />
      </div>
    </header>
  )
}
