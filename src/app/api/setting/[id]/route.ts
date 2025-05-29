import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

// Configuração para o formidable (upload de arquivos)
export const config = {
    api: {
        bodyParser: false, // Desabilita o bodyParser padrão do Next.js para lidar com FormData
    },
};

async function findSetting(organization: any) {

    try {
        const organizationSetting = await prisma.setting.findFirst({
            where: { 
                organizationId: organization ? organization : null 
            },
        });

        return organizationSetting;
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: any) {
    
    const paramid = await params;
    const { id } = paramid;
    const org = await findSetting(id);
    

    if (org instanceof NextResponse) {
        return org;
    }
    return NextResponse.json(org);
}

// Função auxiliar para salvar a imagem (exemplo de salvamento local - ADAPTAR PARA SEU STORAGE)
async function saveImage(file: File): Promise<string | null> {
    if (!file) {
        return null;
    }
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name}`;
        const uploadDir = path.join(process.cwd(), 'public', 'images'); // Crie a pasta 'public/images'
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);
        return `/images/${filename}`; // Retorna o caminho público da imagem
    } catch (error) {
        console.error('Erro ao salvar a imagem:', error);
        return null;
    }
}

export async function PUT(request: NextRequest, { params }: any) {

    try {
        const formData = await request.formData();
        const name = formData.get('name') as string | null;
        const logoFile = formData.get('logo') as File | null;
        const organizationId = formData.get('organizationId') as string | null;

        if (!name) {
            return NextResponse.json({ error: 'O nome é obrigatório.' }, { status: 400 });
        }

        let imageUrl: string | null = null;
        if (logoFile && typeof logoFile.size === 'number' && logoFile.size > 0) {
            imageUrl = await saveImage(logoFile);
            if (!imageUrl) {
                return NextResponse.json({ error: 'Falha ao salvar a imagem.' }, { status: 500 });
            }
        }

        const paramid = await params;
        const { id } = paramid;
        const logoExist = await prisma.setting.findFirst({
            where: {
                id: id
            },
            select: {
                logo: true
            }
        });

        if (logoFile) {
            fs.unlink(`./public/${logoExist?.logo}`, (err) => {
                if(err) throw(err)
            });
        }
        
        const updatedProfile = await prisma.setting.update({
            where: { id: id }, // Use o ID do usuário correto
            data: {
                organizationId,
                name,
                logo: logoFile ? imageUrl : logoExist?.logo,
            },
        });

        return NextResponse.json({ message: 'Configuração atualizado com sucesso.', imageUrl: updatedProfile.logo });
    } catch (error) {
        console.error('Erro ao processar a atualização das configurações:', error);
        return NextResponse.json({ error: 'Erro ao atualizar a configuração.' }, { status: 500 });
    }
}