'use server';

import { auth, signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export default async function signInAction(_prevState: any, formData: FormData) {
    try {
        await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            redirect: true,
            redirectTo: '/admin',
        });
        return { success: true };

    } catch (e: any) {

        if (isRedirectError(e)) {
            throw e;
        }

        if (e.type === 'CredentialsSignin') {
            return { success: false, message: 'Dados de login incorretos.' };
        }

        return { success: false, message: 'Ops, algum erro aconteceu!' };
    }
}