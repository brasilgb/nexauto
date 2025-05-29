// services/logService.ts
import prisma from '@/src/lib/prisma';
import { ActivityLog } from '../prisma/client/client';
// import { ActivityLog } from '@prisma/client';

interface LogEntry {
  action: string;
  message: string;
  organization: string;
  organizationId: string;
  company: string;
  details?: any;
}

export async function createLogEntry(data: LogEntry): Promise<ActivityLog | null> {
  try {
    const log = await prisma.activityLog.create({
      data: {
        action: data.action,
        message: data.message,
        organization: data.organization,
        organizationId: data.organizationId,
        company: data.company,
        details: data.details || undefined,
      },
    });
    console.log('Log entry created:', log.id); // Log no console do servidor
    return log;
  } catch (error) {
    console.error('Failed to create log entry:', error);
    // Decida se quer relançar o erro ou apenas logar e continuar
    // Em geral, falhas no logging não deveriam impedir a operação principal
    return null;
  }
}