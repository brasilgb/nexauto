import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';

const organizationSchema = z.object({
    name: z.string().min(1),
    cnpj: z.string().min(1),
    status: z.boolean(),
});

// Função para buscar um organization por ID
async function findOrganization(id: string) {


    try {
        const organization = await prisma.organization.findUnique({
            where: { id: id },
        });
        if (!organization) {
            return NextResponse.json({ error: 'organization não encontrada' }, { status: 404 });
        }
        return organization;
    } catch (error) {
        console.error('Erro ao buscar organization:', error);
        return NextResponse.json({ error: 'Erro ao buscar organization' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: any) {

    const paramid = await params;
    const { id } = paramid;
    const organization = await findOrganization(id);
    if (organization instanceof NextResponse) {
        return organization;
    }
    return NextResponse.json(organization);
}

export async function PUT(request: Request, { params }: any) {
    const paramid = await params;
    const { id } = paramid;
    try {
        const organizationToUpdate = await findOrganization(id);
        if (organizationToUpdate instanceof NextResponse) {
            return organizationToUpdate;
        }

        const body = await request.json();
        const validationResult = organizationSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
        }

        const { name, cnpj, status } = validationResult.data;

        const updatedorganization = await prisma.organization.update({
            where: {
                id: id
            },
            data: {
                name,
                cnpj,
                status
            },
        });

        return NextResponse.json(updatedorganization);
    } catch (error) {
        console.error('Erro ao atualizar organization:', error);
        return NextResponse.json({ error: 'Erro ao atualizar organization' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: any) {
    const paramid = await params;
    const { id } = paramid;
    try {
        const organizationToDelete = await findOrganization(params.id);
        if (organizationToDelete instanceof NextResponse) {
            return organizationToDelete;
        }

        await prisma.organization.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: 'Organização deletada com sucesso' }, { status: 200 });
    } catch (error) {
        console.error('Erro ao deletar organização:', error);
        return NextResponse.json({ error: 'Erro ao deletar organização' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}