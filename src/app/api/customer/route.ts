import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company } = body;

        const customers = await prisma.user.findMany({
            include: {
                Organization: true,
                Company: true,
            },
            where: {
                organizationId: organization,
                companyId: company
            },
        });

        return NextResponse.json(customers, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar clientes' }, { status: 500 });
    }
}