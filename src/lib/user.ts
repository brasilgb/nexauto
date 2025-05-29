import React from 'react'
import prisma from '@/src/lib/prisma';
import { compareSync } from 'bcrypt-ts';

type User = {
    id?: string;
    userid?: string;
    name: string;
    email: string;
    password?: string;
    roles?: string | null;
    is_admin?: boolean | null;
    organizationId?: string | null;
    companyId?: string | null;
};

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    if (!user || !user.password) {
        return null;
    }

    const passwordMatch = compareSync(password, user.password);

    if (passwordMatch) {
        return { userid: user.id, companyId: user.companyId, email: user.email, name: user.name, organizationId: user.organizationId, is_admin: user.is_admin, roles: user.roles }
    }

    return null;
}
