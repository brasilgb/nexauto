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

async function getSetting(): Promise<Setting[]> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error(`Erro ao listar configuraões: ${res.status}`);
    }

    return res.json();
}

export async function AppSidebar() {

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



    const settings = await getSetting() as any;


    return (
        <Sidebar side='left' variant='sidebar' collapsible='icon' >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <Building className="h-5 w-5" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
