'use client'
import { useSidebar } from "@/src/components/ui/sidebar"
import { ArrowLeft, ArrowRight, ChevronLeft, Menu } from "lucide-react"

export function CustomTrigger() {
    const { toggleSidebar, open } = useSidebar()

    return <button onClick={toggleSidebar}>
        <div className="md:flex cursor-pointer ml-2 hidden w-7 h-7 bg-accent border rounded-full items-center justify-center">{<ChevronLeft className={`w-5 h-5 duration-300 ${!open ? '-rotate-180' : 'rotate-0'}`} />}</div>
        <div className="md:hidden cursor-pointer ml-2 flex w-7 h-7 bg-transparent items-center justify-center z-50">{<Menu className={`w-5 h-5 duration-300 ${open ? '-rotate-180' : 'rotate-0'}`} />}</div>
    </button>
}
