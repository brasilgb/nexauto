import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company, yearmonth } = body;

        const salesForYearMonth = await prisma.sale.findMany({
            where: {
                organizationId: organization,
                resumo_codfil: company,
                resumo_yearmonth: yearmonth
            },
        });
        if (salesForYearMonth.length > 0) {
            return NextResponse.json(salesForYearMonth, { status: 201 });
        } else {
            const lastYearMonth = await prisma.sale.findFirst({
                orderBy: {
                    resumo_yearmonth: 'desc'
                }
            });
            
            const salesLastYearMonth = await prisma.sale.findMany({
                where: {
                    organizationId: organization,
                    resumo_codfil: company,
                    resumo_yearmonth: lastYearMonth?.resumo_yearmonth
                }
            });
            if (salesLastYearMonth) {
                return NextResponse.json(salesLastYearMonth, { status: 201 });
            }
        }


    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar vendas' }, { status: 500 });
    }
}