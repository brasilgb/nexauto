'use client'
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Form from 'next/form';
import registerAction from './registerAction';
import { useActionState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerAction, null);
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
            <Form action={formAction} className='flex flex-col gap-4'>
                <div>
                    <Label>Nome</Label>
                    <Input type="text" name="name" placeholder="Fulano de Tal" />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="eu@exemplo.com" />
                </div>
                <div>
                    <Label>Senha</Label>
                    <Input type="password" name="password" placeholder="********" />
                </div>
                <div>
                    <Button disabled={isPending} className="w-full mt-6" type="submit">
                        Registrar
                    </Button>
                </div>
            </Form>
        </>
    )
}
