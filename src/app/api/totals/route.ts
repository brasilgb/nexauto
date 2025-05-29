import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company, date } = body;

        const totalsForDate = await prisma.total.findFirst({
            where: {
                organizationId: organization,
                total_filial: company,
                total_datatu: date
            },
        });


        if (totalsForDate) {
            return NextResponse.json(totalsForDate, { status: 201 });
        } else {
            const totalsLastDate = await prisma.total.findFirst({
                where: {
                    organizationId: organization,
                    total_filial: company,
                },
                orderBy: {
                    total_datatu: 'desc'
                }
            });
            if (totalsLastDate) {
                return NextResponse.json(totalsLastDate, { status: 201 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar totais' }, { status: 500 });
    }
}