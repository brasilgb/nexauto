import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company, date } = body;

        const associacoesForDate = await prisma.association.findMany({
            where: {
                organizationId: organization,
                assoc_filial: company,
                assoc_datmvt: date
            },
        });
        if (associacoesForDate.length > 0) {
            return NextResponse.json(associacoesForDate, { status: 201 });
        } else {
            const lastDate = await prisma.association.findFirst({
                orderBy: {
                    assoc_datmvt: 'desc'
                }
            });

            const associationsLastDate = await prisma.association.findMany({
                where: {
                    organizationId: organization,
                    assoc_filial: company,
                    assoc_datmvt: lastDate?.assoc_datmvt
                }
            });
            if (associationsLastDate) {
                return NextResponse.json(associationsLastDate, { status: 201 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar associação' }, { status: 500 });
    }
}