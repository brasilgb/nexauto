'use server'

import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';
import prisma from '@/src/lib/prisma';

export default async function registerAction(
    _prevState: any,
    formData: FormData
) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        email: string;
        name: string;
        password: string;
    };

    if (!data.email || !data.name || !data.password) {
        return {
            message: 'Preencha todos os campos!',
            success: false,
        };
    }

    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
        } as any
    });

    if (user) {
        return {
            message: 'Este usuário já existe.',
            success: false,
        }

    }

    await prisma.user.create({
        data: {
            organizationId: null,
            companyId: null,
            email: data.email,
            name: data.name,
            password: hashSync(data.password),
            is_admin: true,
            status: true,
            roles: ''
        } as any
    });

    return redirect('/sign-in');
}