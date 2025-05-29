'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/contexts/AppContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Switch } from '@/src/components/ui/switch';
import { CardFooter } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Check, Loader, Save } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import { toast } from 'sonner';
import { formSchema } from '../add-user/schema';
import { useSession } from 'next-auth/react';

type FormData = z.infer<typeof formSchema>;
export const dynamic = 'force-dynamic';

export default function AddForm({companies}:any) {
    const { data: session, status } = useSession();
    const { loading, setLoading } = useAppContext();
    
    const router = useRouter();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyId: "",
            name: "",
            email: "",
            password: "",
            retype_password: "",
            is_admin: false,
            status: false,
            roles: ""
        },
    });

    const onSubmit = async (data: FormData) => {

        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                // Authorization: `Bearer ${session?.user?.token}`
            },
            body: JSON.stringify({
                organizationId: session?.user?.organizationId,
                companyId: data.companyId,
                name: data.name,
                email: data.email,
                password: data.password,
                status: data.status,
                is_admin: false,
                roles: ""
            })
        });
        const user = await response.json();
        if (user && response.ok) {
            setLoading(false);
            form.reset()
            toast(
                "Usuário cadastrado", {
                description: "Usuário cadastrado com sucesso!",
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
            router.replace('/customer/users')
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="md:grid grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="companyId"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Filial</FormLabel>
                                <FormControl>
                                    <Select {...field} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a filial" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companies?.map((company: any) => (
                                                <SelectItem key={company.id} value={company.id}>{company.subname}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div className="md:grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="retype_password"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Repita a senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div className="md:grid grid-cols-2 gap-4">
                    {/* <FormField
                        control={form.control}
                        name="is_admin"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Administrador Geral</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} /> */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Selecione o Status</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                </div>
                <CardFooter className='flex justify-end px-0'>
                    <Button type="submit" className="cursor-pointer" variant="default">
                        <Save />{loading ? <Loader className="animate-spin" /> : 'Salvar'}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    )
}
