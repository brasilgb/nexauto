'use client';
import React, { useActionState } from 'react'
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Form from 'next/form';
import loginAction from './loginAction';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, null)

    return (
        <>
            {state?.success === false && (
                <Alert variant="destructive" className='mb-4'>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro!</AlertTitle>
                    <AlertDescription>
                        {state?.message}
                    </AlertDescription>
                </Alert>
            )}
            <Form action={formAction} className='flex flex-col gap-4' >
                <div>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="eu@exemplo.com" />
                </div>
                <div>
                    <Label>Senha</Label>
                    <Input type="password" name="password" placeholder="********" />
                </div>
                <div>
                    <Button className="w-full mt-6" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </>
    )
}