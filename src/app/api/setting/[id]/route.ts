import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

const settingSchema = z.object({
    name: z.string(),
    logo: z.string(),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// Função para garantir que o diretório de upload exista
async function ensureUploadDirExists(dirPath: any) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error: any) {
        if (error.code !== 'EEXIST') { // Ignora o erro se o diretório já existe
            console.error('Erro ao criar diretório de uploads:', error);
            throw new Error('Erro interno do servidor ao criar diretório para uploads.');
        }
    }
}

// Função para buscar um setting por ID
async function findSetting(id: string) {

    try {
        const setting = await prisma.setting.findUnique({
            where: { id: id },
        });
        if (!setting) {
            return NextResponse.json({ error: 'Configurações não encontrada' }, { status: 404 });
        }
        return setting;
    } catch (error) {
        console.error('Erro ao buscar Configurações:', error);
        return NextResponse.json({ error: 'Erro ao buscar Configurações' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const paramid = await params;
    const { id } = paramid;

    // Diretório onde as imagens de perfil serão salvas
    const uploadDir = path.join(process.cwd(), 'public/images');
    try {
        await ensureUploadDirExists(uploadDir); // Garante que o diretório exista
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }



  const form = formidable({
    multiples: false, // Apenas um arquivo
    uploadDir: uploadDir, // Diretório de upload temporário/final
    keepExtensions: true, // Manter a extensão original do arquivo
    // Opcional: definir um nome de arquivo personalizado
    filename: (name, ext, part, form) => {
      // Cuidado com 'part.originalFilename' pois pode ser nulo ou malicioso
      // É melhor gerar um nome único ou usar um sanitizado
      const originalFilename = part.originalFilename || `file-${Date.now()}`;
      const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
      return `${Date.now()}-${sanitizedFilename}`;
    },
  });


    try {
        const settingToUpdate = await findSetting(id);
        if (settingToUpdate instanceof NextResponse) {
            return settingToUpdate;
        }

        const body = await request.formData();

        const validationResult = settingSchema.safeParse(body);
        console.log(validationResult);

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
        }

        const { name, logo } = validationResult.data;

        const updatedsetting = await prisma.setting.update({
            where: {
                id: id
            },
            data: {
                name,
                logo
            },
        });

        return NextResponse.json(updatedsetting);
    } catch (error) {
        console.error('Erro ao atualizar Configurações:', error);
        return NextResponse.json({ error: 'Erro ao atualizar Configurações' }, { status: 500 });
    }
}
