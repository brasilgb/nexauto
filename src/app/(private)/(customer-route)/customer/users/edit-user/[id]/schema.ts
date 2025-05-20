import { z } from "zod";

export const formSchema = z.object({
    companyId: z.string().nullable(),
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    email: z.string().min(1, { message: 'O e-mail deve ser preenchido!' }),
    password: z.string(),
    retype_password: z.string(),
    is_admin: z.boolean(),
    status: z.boolean()
}).refine(
      (values) => {
        return values.password === values.retype_password;
      },
      {
        message: "As senhas devem corresponder!",
        path: ["retype_password"],
      }
    );