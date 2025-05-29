'use client';
import React, { useActionState, useState } from 'react'
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
// import Form from 'next/form';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import signInAction from './signInAction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { useAppContext } from '@/src/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
    email: z.string().min(1, {message: 'Digite o e-mail'}).email(),
    password: z.string().min(1, {
        message: "Digite a senha",
    }),
})

export default function SignInForm() {
    const [message, setMessage] = useState<any>(null)
    const { loading, setLoading } = useAppContext();

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const result = await signIn('credentials', {
            email: values?.email,
            password: values?.password,
            redirect: false
        });

        if (result?.error === 'CredentialsSignin') {
            setMessage("Algo deu errado, seu email e/ou senha podem estar errados.");
            setLoading(false)
            return;
        }

        if (result?.ok) {
            setLoading(false)
            form.reset()
            router.replace('/admin')
        }
    }
    return (
        <div>
            {message && (
                <Alert variant="destructive" className='mb-4 absolute top-32'>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="senha" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div>
                        <Button disabled={loading} className="w-full mt-6" type="submit">
                            Entrar
                        </Button>
                    </div>
                </form>
            </Form>
        </div >
    )
}