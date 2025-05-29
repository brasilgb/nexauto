import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization } = body;
        console.log(organization);

        const companies = await prisma.company.findMany({
            where: {
                organizationId: organization,
            },
        });

        return NextResponse.json(companies, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar filiais' }, { status: 500 });
    }
}