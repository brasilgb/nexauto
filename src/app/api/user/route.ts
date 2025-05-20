import { z } from "zod";
import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";
import { hash } from "bcrypt-ts";

const userSchema = z.object({
    organizationId: z.string().min(1),
    companyId: z.string().optional(),
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1),
    is_admin: z.boolean(),
    status: z.boolean(),
    roles: z.string()
});

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                Organization: true
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({
            error: 'Erro ao buscar usuário',
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('body', body);
        
        const validationResult = userSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.issues }, { status: 400 });
        }

        const {
            organizationId,
            companyId,
            name,
            email,
            password,
            is_admin,
            status,
            roles
        } = validationResult.data as any;

        const passwordHash = await hash(password, 8);
        const newUser = await prisma.user.create({
            data: {
                organizationId,
                companyId,
                name,
                email,
                password: passwordHash,
                is_admin,
                status,
                roles
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao ciar usuário' }, { status: 500 });
    }
}