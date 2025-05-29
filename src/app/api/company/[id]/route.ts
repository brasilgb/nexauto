import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';

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
// Função para buscar um company por ID
async function findCompany(id: string) {

    try {
        const company = await prisma.company.findUnique({
            where: { id: id },
        });
        if (!company) {
            return NextResponse.json({ error: 'filial não encontrada' }, { status: 404 });
        }
        return company;
    } catch (error) {
        console.error('Erro ao buscar filial:', error);
        return NextResponse.json({ error: 'Erro ao buscar filial' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: any) {

    const paramid = await params;
    const { id } = paramid;
    const company = await findCompany(id);
    if (company instanceof NextResponse) {
        return company;
    }
    return NextResponse.json(company);
}

export async function PUT(request: Request, { params }: any) {
    const paramid = await params;
    const { id } = paramid;
    try {
        const companyToUpdate = await findCompany(id);
        if (companyToUpdate instanceof NextResponse) {
            return companyToUpdate;
        }

        const body = await request.json();
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
        } = validationResult.data;

        const updatedcompany = await prisma.company.update({
            where: {
                id: id
            },
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

        return NextResponse.json(updatedcompany);
    } catch (error) {
        console.error('Erro ao atualizar filial:', error);
        return NextResponse.json({ error: 'Erro ao atualizar filial' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: any) {
    const paramid = await params;
    const { id } = paramid;
    try {
        const companyToDelete = await findCompany(params.id);
        if (companyToDelete instanceof NextResponse) {
            return companyToDelete;
        }

        await prisma.company.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: 'Organização deletada com sucesso' }, { status: 200 });
    } catch (error) {
        console.error('Erro ao deletar organização:', error);
        return NextResponse.json({ error: 'Erro ao deletar organização' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}