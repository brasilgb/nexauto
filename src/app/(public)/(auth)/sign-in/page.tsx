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

  const greetingMessage = () => {
    //let h = new Date().toLocaleTimeString('pt-BR', { hour: 'numeric', hour12: false }); 
    let h = new Date().getHours();
    switch (true) {
      case h <= 5: return 'Olá! Você está acordado(a)? Pronto(a) para analisar dados?';
      case h < 12: return 'Bom dia! Pronto(a) para transformar dados em decisões estratégicas?';
      case h < 18: return 'Boa tarde! Acesse e continue a explorar suas métricas.';
      default: return 'Boa noite! Mesmo tarde, os dados não param.';
    }
  }

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl md:shadow-none md:border-0 md:bg-accent relative">
        <CardHeader>
          <div className='flex items-center justify-center mb-4'>
            <div className='p-4 bg-white w-32 h-32 rounded-full flex items-center justify-center'>
              <img src="/images/analytcs.png" alt="Logo" className="object-cover rounded-2xl" />
            </div>
          </div>
          <h2 className="text-base font-bold text-gray-700">{greetingMessage()}</h2>
          <CardDescription>Faça seu login com email e senha para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
}