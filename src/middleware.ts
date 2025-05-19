// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/admin","/customer"] }
// middleware.js

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET }) as any;
  const { pathname } = req.nextUrl;

  // Rotas públicas que qualquer um pode acessar
  if (pathname.startsWith('/sign-in') || pathname === '/') {
    return NextResponse.next();
  }

  // Se não houver token, redirecionar para a página de sign-in
  if (!token) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Verificar a role para rotas de administrador
  if (pathname.startsWith('/admin') && !token?.is_admin) {
    return NextResponse.redirect(new URL('/customer', req.url));
  }

  // Verificar a role para rotas de cliente (opcional, dependendo da sua estrutura)
  if (pathname.startsWith('/customer') && token?.is_admin) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Se o token existir e a role for permitida, prosseguir
  return NextResponse.next();
}

// Especificar quais rotas este middleware deve proteger
export const config = {
  matcher: ['/admin/:path*', '/customer/:path*'],
};
