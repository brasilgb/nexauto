import prisma from '@/src/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { data } = await req.json();

    if (data.type === 'venda') {
        let sale = false;
        const org = await prisma.organization.findFirst({
            where: {
                cnpj: data.jdata[0].resumo_cnpj,
            },
            select: {
                id: true
            },
        });

        if (!org) {
            return NextResponse.json({ message: 'Organização não encontrada.' }, { status: 404 });
        }

        for (const jdata of data.jdata) {
            // Check if the record already exists
            const existingSale = await prisma.sale.findFirst({
                where: {
                    id: org.id + jdata.resumo_codfil + jdata.resumo_cnpj + jdata.resumo_datmvt,
                },
            });

            if (existingSale) {
                await prisma.sale.updateMany({
                    where: {
                        id: org.id + jdata.resumo_codfil + jdata.resumo_cnpj + jdata.resumo_datmvt,
                    },
                    data: {
                        resumo_cnpj: jdata.resumo_cnpj,
                        resumo_codfil: (parseInt(jdata.resumo_codfil)).toString(),
                        resumo_desfil: jdata.resumo_desfil,
                        resumo_datmvt: jdata.resumo_datmvt,
                        resumo_yearmonth: (jdata.resumo_datmvt).slice(0, 6),
                        resumo_valdev: jdata.resumo_valdev,
                        resumo_valven: (parseFloat(jdata.resumo_valven)).toString(),
                        resumo_margem: (parseFloat(jdata.resumo_margem)).toString(),
                        resumo_presen: (parseFloat(jdata.resumo_presen)).toString(),
                        resumo_metdia: (parseFloat(jdata.resumo_metdia)).toString(),
                        organizationId: org.id
                    },
                });
                sale = false;
            } else {
                await prisma.sale.createMany({
                    data: {
                        id: org.id + jdata.resumo_codfil + jdata.resumo_cnpj + jdata.resumo_datmvt,
                        resumo_cnpj: jdata.resumo_cnpj,
                        resumo_codfil: (parseInt(jdata.resumo_codfil)).toString(),
                        resumo_desfil: jdata.resumo_desfil,
                        resumo_datmvt: jdata.resumo_datmvt,
                        resumo_yearmonth: (jdata.resumo_datmvt).slice(0, 6),
                        resumo_valdev: jdata.resumo_valdev,
                        resumo_valven: (parseFloat(jdata.resumo_valven)).toString(),
                        resumo_margem: (parseFloat(jdata.resumo_margem)).toString(),
                        resumo_presen: (parseFloat(jdata.resumo_presen)).toString(),
                        resumo_metdia: (parseFloat(jdata.resumo_metdia)).toString(),
                        organizationId: org.id
                    }
                });
                sale = true;
            }
        }
        if (sale) {
            return NextResponse.json({ message: 'Dados da venda inseridos com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Dados da venda atualizados com sucesso!' }, { status: 201 });
        }
    }

    if (data.type === 'assoc') {
        let assoc = false;
        const org = await prisma.organization.findFirst({
            where: {
                cnpj: data.jdata[0].assoc_cnpj, // Ensure 'resumo_cnpj' corresponds to the 'id' field or adjust schema
            },
            select: {
                id: true
            },
        });

        if (!org) {
            return NextResponse.json({ message: 'Organização não encontrada.' }, { status: 404 });
        }

        for (const jdata of data.jdata) {
            // Check if the record already exists
            const existingAssoc = await prisma.association.findFirst({
                where: {
                    id: org.id + jdata.assoc_filial + jdata.assoc_cnpj + jdata.assoc_datmvt + jdata.assoc_ass,
                },
            });

            if (existingAssoc) {
                await prisma.association.updateMany({
                    where: {
                        id: org.id + jdata.assoc_filial + jdata.assoc_cnpj + jdata.assoc_datmvt + jdata.assoc_ass
                    },
                    data: {
                        assoc_cnpj: jdata.assoc_cnpj,
                        assoc_filial: (parseInt(jdata.assoc_filial)).toString(),
                        assoc_datmvt: jdata.assoc_datmvt,
                        assoc_ass: jdata.assoc_ass,
                        assoc_desass: jdata.assoc_desass,
                        assoc_valdev: jdata.assoc_valdev,
                        assoc_valven: jdata.assoc_valven,
                        assoc_margem: jdata.assoc_margem,
                        assoc_repres: jdata.assoc_repres,
                        assoc_metdia: jdata.assoc_metdia,
                        organizationId: org.id
                    },
                });
                assoc = false;
            } else {
                //assoc_cnpj;assoc_filial;assoc_datmvt;assoc_ass;assoc_desass;assoc_valdev;assoc_valven;assoc_margem;assoc_repres;assoc_metdia;
                await prisma.association.createMany({
                    data: {
                        id: org.id + jdata.assoc_filial + jdata.assoc_cnpj + jdata.assoc_datmvt + jdata.assoc_ass,
                        assoc_cnpj: jdata.assoc_cnpj,
                        assoc_filial: (parseInt(jdata.assoc_filial)).toString(),
                        assoc_datmvt: jdata.assoc_datmvt,
                        assoc_ass: jdata.assoc_ass,
                        assoc_desass: jdata.assoc_desass,
                        assoc_valdev: jdata.assoc_valdev,
                        assoc_valven: jdata.assoc_valven,
                        assoc_margem: jdata.assoc_margem,
                        assoc_repres: jdata.assoc_repres,
                        assoc_metdia: jdata.assoc_metdia,
                        organizationId: org.id
                    }
                });
                assoc = true;
            }
        }
        if (assoc) {
            return NextResponse.json({ message: 'Dados da associação inseridos com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Dados da associação atualizados com sucesso!' }, { status: 201 });
        }
    }

    if (data.type === 'total') {
        let total = false;
        const org = await prisma.organization.findFirst({
            where: {
                cnpj: data.jdata[0].total_cnpj, // Ensure 'resumo_cnpj' corresponds to the 'id' field or adjust schema
            },
            select: {
                id: true
            },
        });

        if (!org) {
            return NextResponse.json({ message: 'Organização não encontrada.' }, { status: 404 });
        }

        for (const jdata of data.jdata) {
            // Check if the record already exists
            const existingTotal = await prisma.total.findFirst({
                where: {
                    id: org.id + jdata.total_filial + jdata.total_cnpj + jdata.total_datatu,
                },
            });

            if (existingTotal) {
                await prisma.total.updateMany({
                    where: {
                        id: org.id + jdata.total_filial + jdata.total_cnpj + jdata.total_datatu
                    },
                    data: {
                        total_cnpj: jdata.total_cnpj,
                        total_datatu: jdata.total_datatu,
                        total_filial: (parseInt(jdata.total_filial)).toString(),
                        total_valdev: jdata.total_valdev,
                        total_valven: (parseFloat(jdata.total_valven)).toString(),
                        total_margem: (parseFloat(jdata.total_margem)).toString(),
                        total_permet: jdata.total_permet,
                        total_projec: jdata.total_projec,
                        total_valjur: jdata.total_valjur,
                        total_perjur: jdata.total_perjur,
                        total_valina: jdata.total_valina,
                        total_perina: jdata.total_perina,
                        total_valest: jdata.total_valest,
                        total_meta: (parseFloat(jdata.total_meta)).toString(),
                        organizationId: org.id
                    },
                });
                total = false;
            } else {
                await prisma.total.createMany({
                    data: {
                        id: org.id + jdata.total_filial + jdata.total_cnpj + jdata.total_datatu,
                        total_cnpj: jdata.total_cnpj,
                        total_datatu: jdata.total_datatu,
                        total_filial: (parseInt(jdata.total_filial)).toString(),
                        total_valdev: jdata.total_valdev,
                        total_valven: (parseFloat(jdata.total_valven)).toString(),
                        total_margem: (parseFloat(jdata.total_margem)).toString(),
                        total_permet: jdata.total_permet,
                        total_projec: jdata.total_projec,
                        total_valjur: jdata.total_valjur,
                        total_perjur: jdata.total_perjur,
                        total_valina: jdata.total_valina,
                        total_perina: jdata.total_perina,
                        total_valest: jdata.total_valest,
                        total_meta: (parseFloat(jdata.total_meta)).toString(),
                        organizationId: org.id
                    }
                });
                total = true;
            }
        }
        if (total) {
            return NextResponse.json({ message: 'Dados totais inseridos com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Dados totais atualizados com sucesso!' }, { status: 201 });
        }
    }
}