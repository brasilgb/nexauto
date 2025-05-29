import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from "./src/lib/user";
import NextAuth from 'next-auth';

declare module "next-auth" {
    interface User {
        id: string;
        companyId?: string;
        organizationId?: string;
        is_admin?: boolean;
        roles?: string[];
        email?: string | null;
        name?: string | null;
        image?: string | null;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'seu@email.com' },
                password: { label: 'Senha', type: 'password' },
            },
            async authorize(credentials) {
                const user = await findUserByCredentials(
                    credentials.email as string,
                    credentials.password as string
                ) as any

                return user;
            }
        }),
    ],
    session: {
        strategy: 'jwt', // JWT é geralmente recomendado, especialmente para Credentials
    },
    callbacks: {
        async jwt({ token, user }) {
            // Se 'user' existe (ocorre no login), adicione o ID do usuário ao token
            if (user) {
                token.id = user.id;
                token.roles = user.roles;
                token.is_admin = user.is_admin;
                token.organizationId = user.organizationId;
                token.companyId = user.companyId;

            }
            return token;
        },
        async session({ session, token }) {
            // Adicione o ID do usuário (do token) à sessão do cliente
            if (session.user && token.id) {
                session.user.roles = token.roles as string[];
                session.user.id = token.id as string;
                session.user.is_admin = token.is_admin as boolean;
                session.user.organizationId = token.organizationId as string;
                session.user.companyId = token.companyId as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in", // Opcional: página de login customizada
        // ... outras páginas
    }
})