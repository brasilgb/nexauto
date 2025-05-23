import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { BarChart3, CreditCard, DollarSign, Users } from 'lucide-react'
import React from 'react'

interface KpisDashboardProps {
    title: string;
    icone: React.ReactNode;
    value: string | number;
}

export default function KpisDashboard({ title, icone, value }: KpisDashboardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icone}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{title} encontrados na aplicação</p>
            </CardContent>
        </Card>
    )
}

