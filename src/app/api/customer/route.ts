import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { organization, company } = body;

        if (company && organization) {
            const customersAll = await prisma.user.findMany({
                include: {
                    Organization: true,
                    Company: true,
                },
                where: {
                    organizationId: organization,
                    companyId: company
                },
            });
            if (customersAll.length > 0) {
                return NextResponse.json(customersAll, { status: 201 });
            }
        } else {
            if ( organization && !company ) {
                const customersOrg = await prisma.user.findMany({
                    include: {
                        Organization: true,
                    },
                    where: {
                        organizationId: organization,
                    },
                });
                if (customersOrg.length > 0) {
                    return NextResponse.json(customersOrg, { status: 201 });
                }
            }
        }

    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar clientes' }, { status: 500 });
    }
}