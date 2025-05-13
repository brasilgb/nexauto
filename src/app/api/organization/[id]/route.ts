import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';

const organizationSchema = z.object({
    name: z.string().min(1),
    cnpj: z.string().min(1),
    status: z.boolean(),
});

// Função para buscar um organization por ID
async function findOrganization(id: string) {

    try {
        const organization = await prisma.organization.findUnique({
            where: { id: id },
        });
        if (!organization) {
            return NextResponse.json({ error: 'organization não encontrada' }, { status: 404 });
        }
        return organization;
    } catch (error) {
        console.error('Erro ao buscar organization:', error);
        return NextResponse.json({ error: 'Erro ao buscar organization' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const organization = await findOrganization(id);
    if (organization instanceof NextResponse) {
        return organization;
    }
    return NextResponse.json(organization);
}

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//     try {
//         const organizationToUpdate = await findOrganization(params.id);
//         if (organizationToUpdate instanceof NextResponse) {
//             return organizationToUpdate;
//         }

//         const body = await request.json();
//         const validationResult = organizationSchema.safeParse(body);

//         if (!validationResult.success) {
//             return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
//         }

//         const { title, content } = validationResult.data;

//         const updatedorganization = await prisma.organization.update({
//             where: { id: (organizationToUpdate as { id: number }).id },
//             data: {
//                 title,
//                 content,
//             },
//         });

//         return NextResponse.json(updatedorganization);
//     } catch (error) {
//         console.error('Erro ao atualizar organization:', error);
//         return NextResponse.json({ error: 'Erro ao atualizar organization' }, { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//     try {
//         const organizationToDelete = await findOrganization(params.id);
//         if (organizationToDelete instanceof NextResponse) {
//             return organizationToDelete;
//         }

//         await prisma.organization.delete({
//             where: { id: (organizationToDelete as { id: number }).id },
//         });

//         return NextResponse.json({ message: 'organization deletado com sucesso' }, { status: 200 });
//     } catch (error) {
//         console.error('Erro ao deletar organization:', error);
//         return NextResponse.json({ error: 'Erro ao deletar organization' }, { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }