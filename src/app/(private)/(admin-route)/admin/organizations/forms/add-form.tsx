'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/src/components/ui/input';
import { Switch } from '@/src/components/ui/switch';
import { Button } from '@/src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { DialogFooter } from '@/src/components/ui/dialog';
import { Check, Loader, Save } from 'lucide-react';
import { maskCnpj } from '@/src/lib/utils';
import { isCNPJ } from 'validation-br'
import { useAppContext } from '@/src/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
  cnpj: z.string().min(1, { message: 'O CNPJ deve ser preenchido!' }).refine((data) => isCNPJ(data), { message: 'O CNPJ deve ser válido!' }),
  status: z.boolean(),
})

type FormData = z.infer<typeof formSchema>;
export const dynamic = 'force-dynamic';

export default function AddForm() {
  const { loading, setLoading } = useAppContext();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cnpj: "",
      status: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization/`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        // Authorization: `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify({
        name: data?.name,
        cnpj: data?.cnpj,
        status: data?.status
      })
    });
    const user = await response.json();
    if (user && response.ok) {
      setLoading(false);
      form.reset()
      toast(
        "Organização cadastrada", {
        description: "Organização cadastrada com sucesso!",
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
      router.replace('/admin/organizations')
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem
                className="w-full"
              >
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem
                className="w-full"
              >
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="CNPJ" {...field} maxLength={18} value={maskCnpj(field.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>
        <div>
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
        <DialogFooter className="border-t pt-4">
          <Button type="submit" className="cursor-pointer" variant="default">
            {loading ? <Loader className="animate-spin" /> : <Save />}Salvar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}