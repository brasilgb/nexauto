import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company, date } = body;

        const salesForDate = await prisma.sale.findMany({
            where: {
                organizationId: organization,
                resumo_codfil: company,
                resumo_datmvt: date
            },
        });

        if (salesForDate.length > 0) {
            return NextResponse.json(salesForDate, { status: 201 });
        } else {
            const lastDate = await prisma.sale.findFirst({
                orderBy: {
                    resumo_datmvt: 'desc'
                }
            });

            const salesLastDate = await prisma.sale.findMany({
                where: {
                    organizationId: organization,
                    resumo_codfil: company,
                    resumo_datmvt: lastDate?.resumo_datmvt
                }
            });
            if (salesLastDate) {
                return NextResponse.json(salesLastDate, { status: 201 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar vendas' }, { status: 500 });
    }
}