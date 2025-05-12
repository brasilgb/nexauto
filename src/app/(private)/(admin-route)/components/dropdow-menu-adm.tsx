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
import { LogOut, User } from "lucide-react";
import Form from "next/form"

interface DropdowUserProps {
    userName: string;
}

export function DropdowMenuAdm({ userName }: DropdowUserProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><User /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2"><User className="h-4 w-4" />{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                    <User className="h-4 w-4" />Profile
                    </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Form action={'logoutAction'}>
                        logout
                        {/* <button className="flex items-center gap-2"><LogOut className="h-4 w-4" /> Sair</button> */}
                    </Form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}