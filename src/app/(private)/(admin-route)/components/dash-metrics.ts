import { Company } from "@/src/types/company";
import { Organization } from "@/src/types/organization";
import { User } from "@/src/types/user";

export async function getOrganization(): Promise<Organization[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    return [];
  }
}

export async function getUser(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    return [];
  }
}

export async function getCompany(): Promise<Company[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    return [];
  }
}