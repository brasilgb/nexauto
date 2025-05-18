import React from 'react'
import prisma from '@/src/lib/prisma';
import { compareSync } from 'bcrypt-ts';

type User = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    roles?: string | null;
    is_admin?: boolean | null;
    organizationId?: string | null;
};

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    if (!user) {
        return null;
    }

    const passwordMatch = compareSync(password, user.password);

    if (passwordMatch) {
        return { email: user.email, name: user.name, organizationId: user.organizationId, is_admin: user.is_admin, roles: user.roles }
    }

    return null;
}
