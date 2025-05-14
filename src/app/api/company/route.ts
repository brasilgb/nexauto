import { z } from "zod";
import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";

const companySchema = z.object({
    organizationId: z.string().min(1),
    cnpj: z.string().min(1),
    corpreason: z.string().min(1),
    subname: z.string().min(1),
    subnumber: z.string().min(1),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    district: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    telefone: z.string().min(1),
    status: z.boolean(),
    whatsapp: z.string(),
    observation: z.string(),
});

export async function GET() {
    try {
        const comps = await prisma.company.findMany({
            include: {
                Organization: true
            }
        });
        return NextResponse.json(comps);
    } catch (error) {
        return NextResponse.json({
            error: 'Erro ao buscar filial',
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validationResult = companySchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
        }

        const {
            organizationId,
            cnpj,
            corpreason,
            subnumber,
            subname,
            cep,
            state,
            city,
            district,
            street,
            number,
            complement,
            telefone,
            status,
            whatsapp,
            observation,
        } = validationResult.data as any;

        const newComp = await prisma.company.create({
            data: {
                organizationId,
                cnpj,
                corpreason,
                subnumber,
                subname,
                cep,
                state,
                city,
                district,
                street,
                number,
                complement,
                telefone,
                status,
                whatsapp,
                observation,
            },
        });

        return NextResponse.json(newComp, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao ciar filial' }, { status: 500 });
    }
}