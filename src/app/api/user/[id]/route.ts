import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { hash } from 'bcryptjs';

const userSchema = z.object({
    organizationId: z.string().min(1),
    companyId: z.string().optional(),
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string(),
    is_admin: z.boolean(),
    status: z.boolean(),
    roles: z.string()
});

// Função para buscar um user por ID
async function findUser(id: string) {

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        
        return user;

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: any) {

    const paramid = await params;
    const { id } = paramid;
    const user = await findUser(id);
    
    if (user instanceof NextResponse) {
        return user;
    }
    return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: any) {
    const paramid = await params;
    const { id } = paramid;
    try {
        const userToUpdate = await findUser(id);
        if (userToUpdate instanceof NextResponse) {
            return userToUpdate;
        }

        const body = await request.json();
        const validationResult = userSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
        }
        const userExist = await prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                password: true
            }
        });

        const {
            organizationId,
            companyId,
            name,
            email,
            password,
            is_admin,
            status,
            roles
        } = validationResult.data as any;

        const passwordHash = await hash(password, 8);

        const updateduser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                organizationId,
                companyId,
                name,
                email,
                password: password ? passwordHash : userExist?.password,
                is_admin,
                status,
                roles
            },
        });

        return NextResponse.json(updateduser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: any) {
    const paramid = await params;
    const { id } = paramid;
    try {
        const userToDelete = await findUser(params.id);
        if (userToDelete instanceof NextResponse) {
            return userToDelete;
        }

        await prisma.user.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: 'Usuário deletado com sucesso' }, { status: 200 });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 });
    }
}