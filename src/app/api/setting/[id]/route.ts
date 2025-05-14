import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';

const settingSchema = z.object({
    name: z.string(),
    logo: z.string(),
});


// Função para buscar um organization por ID
async function findOrganization(id: string) {

        const existSetting = await prisma.setting.count();
        if (!existSetting) {
            await prisma.setting.create({
                data: {
                    name: "",
                    logo: ""
                }
            })
        }
        const listSetting = await prisma.setting.findFirst();

        return listSetting;
        
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const paramid = await params;
    const { id } = paramid;
    const organization = await findOrganization(id);
    if (organization instanceof NextResponse) {
        return organization;
    }
    return NextResponse.json(organization);
}