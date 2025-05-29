import { auth } from "@/auth";
import logoutAction from "@/src/app/(public)/(auth)/(logout)/logoutActions";
import { Button } from "@/src/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { LogOut, Logs, User } from "lucide-react";
import Form from "next/form"
import Link from "next/link";


export async function DropdowMenuAdm() {
    const session = await auth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><User className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                    <DropdownMenuItem asChild>
                        <Link href={"/admin/logs"}>
                            <Logs className="h-4 w-4" />
                            <span>Logs</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Form action={logoutAction}>
                        <button className="flex items-center gap-2">
                            <LogOut className="h-4 w-4" />
                            <span>Sair</span>
                        </button>
                    </Form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}