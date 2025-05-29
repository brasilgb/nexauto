import { z } from "zod";
import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";

const organizationSchema = z.object({
    name: z.string().min(1),
    cnpj: z.string().min(1),
    status: z.boolean(),
});

export async function GET() {
    try {
        const orgs = await prisma.organization.findMany();
        return NextResponse.json(orgs);
    } catch (error) {
        return NextResponse.json({
            error: 'Erro ao buscar organização',
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validationResult = organizationSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
        }

        const { name, cnpj, status } = validationResult.data as any;

        const newOrg = await prisma.organization.create({
            data: {
                name,
                cnpj,
                status,
            },
        });

        return NextResponse.json(newOrg, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao ciar organização' }, { status: 500 });
    }
}