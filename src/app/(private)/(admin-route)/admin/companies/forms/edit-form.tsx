'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/contexts/AppContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from '../schema';
import { Switch } from '@/src/components/ui/switch';
import { CardFooter } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Check, Loader, Save } from 'lucide-react';
import { Textarea } from '@/src/components/ui/textarea';
import { Input } from '@/src/components/ui/input';
import { maskCep, maskCnpj, maskPhone } from '@/src/lib/utils';
import { toast } from 'sonner';

type FormData = z.infer<typeof formSchema>;
export const dynamic = 'force-dynamic';

export default function EditForm({ organizations, company }: any) {

    const { loading, setLoading } = useAppContext();
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            organizationId: company?.organizationId,
            cnpj: company?.cnpj,
            corpreason: company?.corpreason,
            subnumber: company?.subnumber,
            subname: company?.subname,
            cep: company?.cep,
            state: company?.state,
            city: company?.city,
            district: company?.district,
            street: company?.street,
            number: company?.number,
            complement: company?.complement,
            telefone: company?.telefone,
            status: company?.status,
            whatsapp: company?.whatsapp,
            observation: company?.observation,
        },
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company/${company.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'Application/json',
                // Authorization: `Bearer ${session?.user?.token}`
            },
            body: JSON.stringify({
                organizationId: data?.organizationId,
                cnpj: data?.cnpj,
                corpreason: data?.corpreason,
                subnumber: data?.subnumber,
                subname: data?.subname,
                cep: data?.cep,
                state: data?.state,
                city: data?.city,
                district: data?.district,
                street: data?.street,
                number: data?.number,
                complement: data?.complement,
                telefone: data?.telefone,
                status: data?.status,
                whatsapp: data?.whatsapp,
                observation: data?.observation,
            })
        });
        const user = await response.json();
        if (user && response.ok) {
            setLoading(false);
            form.reset()
            toast(
                "Filial editada", {
                description: "Filial editada com sucesso!",
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
            router.replace('/admin/companies')
        }
    };

    const handleVCep = ((cep: any) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                form.setValue('state', data.uf);
                form.setValue('city', data.localidade);
                form.setValue('district', data.bairro);
                form.setValue('street', data.logradouro);
                form.setFocus('number');
            });
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="md:grid grid-cols-9 gap-4">
                    <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>CNPJ</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} maxLength={18} value={maskCnpj(field.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="corpreason"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Razão social</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="organizationId"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Organização</FormLabel>
                                <FormControl>
                                    <Select {...field} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a organização" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organizations?.map((organization: any) => (
                                                <SelectItem key={organization.id} value={organization.id}>{organization.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="subname"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Nome filial</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="subnumber"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>N° Filial</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>
                <div className="md:grid grid-cols-6 gap-4">

                    <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} maxLength={9} value={maskCep(field.value)} onBlurCapture={() => handleVCep(field.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>UF</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Bairro</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                </div>
                <div className="md:grid grid-cols-7 gap-4">

                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Logradouro</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                            <FormItem
                                className="w-full col-span-2"
                            >
                                <FormLabel>Complemento</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} maxLength={15} value={maskPhone(field.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel>Whatsapp</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>
                <FormField
                    control={form.control}
                    name="observation"
                    render={({ field }) => (
                        <FormItem
                            className="w-full"
                        >
                            <FormLabel>Observações</FormLabel>
                            <FormControl>
                                <Textarea placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
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

                <CardFooter className='flex justify-end px-0'>
                    <Button type="submit" className="cursor-pointer" variant="default">
                        {loading ? <Loader className="animate-spin" /> : <Save />}Salvar
                    </Button>
                </CardFooter>
            </form>
        </Form>
    )
}
