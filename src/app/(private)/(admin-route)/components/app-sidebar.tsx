import { auth } from "@/auth";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/src/components/ui/sidebar"
import { Setting } from "@/src/types/setting";
import { Building, Building2, Calendar, Home, Inbox, Search, Settings, SlidersHorizontal, User } from "lucide-react"
import Link from "next/link";

async function getSetting(organization: any): Promise<Setting[]> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting/${organization}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return res.json();
}

export async function AppSidebar() {

    const session = await auth();
    const settings = await getSetting(session?.user?.organizationId) as any;

    const items = [
        {
            title: "Home",
            url: "/admin",
            icon: Home,
        },
        {
            title: "Organizações",
            url: "/admin/organizations",
            icon: Building2,
        },
        {
            title: "Filiais",
            url: "/admin/companies",
            icon: Building,
        },
        {
            title: "Configurações",
            url: "/admin/settings",
            icon: SlidersHorizontal,
        },
        {
            title: "Usuários",
            url: "/admin/users",
            icon: User,
        },
    ]

    return (
        <Sidebar side='left' variant='sidebar' collapsible='icon' >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/customer">
                                <Avatar>
                                    <AvatarImage src={process.env.NEXT_PUBLIC_API_URL + `${settings?.logo ? settings?.logo : 'images/not-image.jpg'}`} alt={settings?.name} />
                                </Avatar>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
