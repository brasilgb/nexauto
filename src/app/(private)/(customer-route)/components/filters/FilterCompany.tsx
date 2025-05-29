'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { useAppContext } from '@/src/contexts/AppContext';
import { Company } from "@/src/types/company";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function FilterCompany() {
  const { setCompanyNumber, companyNumber } = useAppContext();
  const [companies, setCompanies] = useState<Company[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getCompany = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
        method: 'GET'
      })
        .then((res) => res.json())
        .then((res) => setCompanies(res))
        .catch((err) => console.log(err))
        .finally(() => console.log('')
        );
    };
    getCompany();
  }, []);

  const company = companies?.find((comp: any) => comp.id === session?.user?.companyId);
  if (session?.user?.organizationId && session?.user?.companyId) {
    setCompanyNumber(company?.subnumber);
  }
  return (
    <>
      {session?.user?.organizationId && session?.user?.companyId
        ? <div className="flex items-center justify-start border rounded-sm py-2 shadow-sm px-2.5">
          <h1 className="text-sm font-semibold text-gray-500">Filial ativa: {company?.subname}</h1>
        </div>
        : <Select onValueChange={(value) => setCompanyNumber(value)} value={companyNumber}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Dados da rede</SelectItem>
            {companies?.map((comp: any, idx: number) => (
              <SelectItem key={idx} value={comp.subnumber}>{comp.subname}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    </>
  )
}