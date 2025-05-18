import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company, yearmonth } = body;

        const sales = await prisma.sale.findMany({
            where: {
                organizationId: organization,
                resumo_codfil: company,
                resumo_datmvt: yearmonth
            },
        });

        return NextResponse.json(sales, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar vendas' }, { status: 500 });
    }
}