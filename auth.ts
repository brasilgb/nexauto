import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from "./src/lib/user";

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
                )

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
            }

            // O token modificado será passado para o callback 'session' e também será o token interno do Auth.js
            return token;
        },
        async session({ session, token, user }) {
            // O 'token' aqui é o JWT modificado no callback anterior ('jwt')
            // O 'user' aqui só existe se você estiver usando um adapter de banco de dados
            // e session.strategy for "database". Com session.strategy: "jwt", use o 'token'.

            // Adiciona os campos do token ao objeto session
            // Garanta que os tipos estejam corretos (veja Passo 2)
            if (token) {
                (session.user as any).id = token.id; // Adapte o tipo
                (session.user as any).roles = token.roles; // Adapte o tipo
                (session.user as any).is_admin = token.is_admin; // Adapte o tipo
                (session.user as any).organizationId = token.organizationId; // Adapte o tipo
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