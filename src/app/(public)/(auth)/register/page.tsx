import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/src/components/ui/card';
import Link from 'next/link';
import RegisterForm from './register-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {

    const session = await auth();

    if (session && (session?.user as { is_admin?: boolean })?.is_admin) {
        return redirect('/admin')
    }
    if (session && !(session?.user as { is_admin?: boolean })?.is_admin) {
        return redirect('/customer')
    }
   
    return (
        <>
            <Card className="max-w-sm w-full rounded-2xl mt-12 md:shadow-none md:border-0 md:bg-accent">
                <CardHeader>
                    <h2 className="text-base font-bold text-gray-700">Cadastro do administrador</h2>
                    <CardDescription>Faça o cadastro de primeiro acesso.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground mt-3">
                Já possui cadastro?{' '}
                <Link className="text-gray-800 hover:underline" href="/sign-in">
                    Faça o login
                </Link>
                .
            </p>
        </>
    );
}