import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/src/components/ui/card';
import Link from 'next/link';
import LoginForm from './sign-in-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {

  const session = await auth();

  if (session && (session?.user as { is_admin?: boolean })?.is_admin) {
    return redirect('/admin')
  }
  if (session && !(session?.user as { is_admin?: boolean })?.is_admin) {
    return redirect('/customer')
  }

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Boas Vindas</h2>
          <CardDescription>Faça seu login com email e senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-3">
        Não possui cadastro?{' '}
        <Link className="text-gray-800 hover:underline" href="/cadastro">
          Registre-se
        </Link>
        .
      </p>
    </>
  );
}