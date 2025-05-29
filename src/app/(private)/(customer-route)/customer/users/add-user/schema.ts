import { z } from "zod";

export const formSchema = z.object({
    companyId: z.string().min(1, { message: 'Selecione a filial!' }),
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    email: z.string().min(1, { message: 'O e-mail deve ser preenchido!' }),
    password: z.string().min(1, { message: 'A senha deve ser preenchida!' }),
    retype_password: z.string().min(1, { message: 'A senha comparativa deve ser preenchida!' }),
    is_admin: z.boolean(),
    status: z.boolean(),
    roles: z.string()
}).refine(
      (values) => {
        return values.password === values.retype_password;
      },
      {
        message: "As senhas devem corresponder!",
        path: ["retype_password"],
      }
    );;