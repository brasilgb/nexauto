import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";

export async function GET() {
    try {
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

        return NextResponse.json(listSetting);
    } catch (error) {
        return NextResponse.json({
            error: 'Erro ao buscar configurações',
        }, { status: 500 });
    }
}
