import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company, date } = body;

        const totals = await prisma.total.findFirst({
            where: {
                organizationId: organization,
                total_filial: company,
                total_datatu: date
            },
        });

        return NextResponse.json(totals, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar totais' }, { status: 500 });
    }
}