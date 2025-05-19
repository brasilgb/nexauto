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
import { useEffect, useState } from "react";

export default function FilterCompany() {
  const { setCompanyNumber } = useAppContext();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const getCompany = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
        method: 'GET'
      })
        .then((res) => res.json())
        .then((res) => setCompanies(res))
        .catch((err) => console.log(err))
        .finally(() => console.log('FIM')
        );
    };
    getCompany();
  }, [])

  const handleValueCity = (value: string) => {
    setCompanyNumber(value)
  };

  return (
    <>
      <Select onValueChange={handleValueCity}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filial" />
        </SelectTrigger>
        <SelectContent>
          {companies?.map((comp: any, idx: number) => (
            <SelectItem key={idx} value={comp.subnumber}>{comp.subname}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}