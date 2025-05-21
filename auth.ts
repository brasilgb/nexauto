import NextAuth, { Session, User } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from "./src/lib/user";

declare module "next-auth" {
    interface Session {
        user: {
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
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const user = await findUserByCredentials(
                    credentials.email as string,
                    credentials.password as string
                ) as any

                return user;
            }
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Adiciona os campos adicionais ao token JWT
                token.id = user.id; // Geralmente já está no token, mas é bom garantir
                token.roles = (user as any).roles; // Adapte o tipo se necessário
                token.is_admin = (user as any).is_admin; // Adapte o tipo se necessário
                token.organizationId = (user as any).organizationId; // Adapte o tipo se necessário
                token.companyId = (user as any).companyId; // Adapte o tipo se necessário
            }

            // O token modificado será passado para o callback 'session' e também será o token interno do Auth.js
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                (session.user as any).id = token.id; // Adapte o tipo
                (session.user as any).roles = token.roles; // Adapte o tipo
                (session.user as any).is_admin = token.is_admin; // Adapte o tipo
                (session.user as any).organizationId = token.organizationId; // Adapte o tipo
                (session.user as any).companyId = token.companyId; // Adapte o tipo
            }

            // O objeto session modificado será retornado para o cliente
            return session;
        },
    },
    pages: {
        signIn: "/sign-in", // Opcional: página de login customizada
        // ... outras páginas
    }
})