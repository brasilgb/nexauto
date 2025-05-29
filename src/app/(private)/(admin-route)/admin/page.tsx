import React from 'react'
import KpisDashboard from '../components/dashboard/kpis-dashboard'
import { Building, Building2, User } from 'lucide-react'
import { getCompany, getOrganization, getUser } from '../components/dash-metrics';

export default async function Dashboard() {

  const organization = await getOrganization();
  const company = await getCompany();
  const user = await getUser();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpisDashboard title="Organizações" icone={<Building2 className="h-4 w-4 text-muted-foreground" />} value={organization.length} />
      <KpisDashboard title="Filiais" icone={<Building className="h-4 w-4 text-muted-foreground" />} value={company.length} />
      <KpisDashboard title="Usuários" icone={<User className="h-4 w-4 text-muted-foreground" />} value={user.length} />
    </div>
  )
  
}
