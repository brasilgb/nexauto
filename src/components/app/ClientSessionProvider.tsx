"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface SessionProviderProps { 
    children: React.ReactNode; 
    session?: Session | null; 
}

function ClientSessionProvider({ children, session }: SessionProviderProps ) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default ClientSessionProvider;