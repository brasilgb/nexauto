'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import { Button } from "@/src/components/ui/button"
import { useAppContext } from "@/src/contexts/AppContext";
import { AlertTriangle, Check, Loader, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteAlertDialog({ deleteId, module, route, name }: any) {

    const { loading, setLoading } = useAppContext();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function onDelete() {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${module}/${deleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'Application/json',
                // Authorization: `Bearer ${session?.user?.token}`
            }
        });
        const user = await response.json();
        if (user && response.ok) {
            setLoading(false);
            setOpen(false)
            toast(
                `${name.charAt(0).toUpperCase() + name.slice(1)} deletada/o`, {
                description: `${name.charAt(0).toUpperCase() + name.slice(1)} deletada/o com sucesso!`,
                classNames: {
                    toast: '!bg-green-700 !border-2 !border-white',
                    title: '!text-white text-base',
                    description: '!text-gray-200',
                    closeButton: '!bg-green-600 !text-white',
                },
                icon: <Check className='h-5 w-5 !text-gray-50' />,
                closeButton: true,
                position: 'top-right'
            });
            router.replace(route)
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive" size="icon" title={`Excluir ${name}`}><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-600 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente a {name} de nossos servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-4">
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button variant="destructive" onClick={() => onDelete()}>{loading ? <Loader className="animate-spin" /> : <Trash /> } Excluir</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}