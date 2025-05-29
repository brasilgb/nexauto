import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const { organization } = body;

    try {

        const existSetting = await prisma.setting.count({
            where: {
                organizationId: organization
            }
        });
        if (!existSetting) {
            await prisma.setting.create({
                data: {
                    name: "",
                    logo: "",
                    organizationId: organization
                }
            })
        }

        const listSetting = await prisma.setting.findFirst({
            where: {
                organizationId: organization
            }
        });

        return NextResponse.json(listSetting);
    } catch (error) {
        return NextResponse.json({
            error: 'Erro ao buscar configurações',
        }, { status: 500 });
    }
}
