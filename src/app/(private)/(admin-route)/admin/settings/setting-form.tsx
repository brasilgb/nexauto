"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/src/contexts/AppContext";
import { Check, FilePenLine, Loader, Save } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string(),
  logo: z.any().optional(),
  // logo: z.any().refine((files) => files?.[0], 'A imagem é obrigatória.'),
})
type FormData = z.infer<typeof formSchema>;
export const dynamic = 'force-dynamic';
interface UserProfileFormProps {
  initialData?: { name: string; logo?: string | null }; // Dados iniciais para edição (se aplicável)
  settingid?: any;
}

export function SettingForm({ initialData, settingid }: UserProfileFormProps) {

  const { loading, setLoading } = useAppContext();

  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.logo || null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: settingid.name, logo: null },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    console.log('logo data', data);
    if (data.logo?.[0]) {
      formData.append('logo', data.logo[0]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting/${settingid.id}`, {
      method: 'PUT',
      headers: {
        // Authorization: `Bearer ${session?.user?.token}`
      },
      body: formData,
    });
    const user = await response.json();
    if (user && response.ok) {
      setPreviewImage(null);
      setLoading(false);
      setOpen(false);
      toast(
        "Configuração alterada", {
        description: "Configuração alterada com sucesso!",
        classNames: {
          toast: '!bg-green-700 !border-2 !border-white',
          title: '!text-white text-base',
          description: '!text-gray-200',
          closeButton: '!bg-green-600 !text-white',
        },
        icon: <Check className='h-5 w-5 !text-gray-50' />,
        closeButton: true,
        position: 'top-right'
      });
      router.replace('/admin/settings')
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('logo', e.target.files); // Define o arquivo no React Hook Form
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer"><FilePenLine />Alterar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Editar configurações</DialogTitle>
          {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                    className="w-full"
                  >
                    <FormLabel>Nome do aplicação</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={form.control}
                name="logo"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem
                    className="w-full"
                  >
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" {...fieldProps} onChange={handleImageChange} />
                    </FormControl>
                    <FormMessage />
                    {previewImage && (
                      <div className="mt-2">
                        <img src={previewImage} alt="Prévia da Imagem" className="rounded-full w-20 h-20 object-cover" />
                      </div>
                    )}
                  </FormItem>
                )} />

              <DialogFooter className="border-t pt-4">
                <Button type="submit" variant="default" className="cursor-pointer">
                  {loading ? <Loader className="animate-spin" /> : <Save />}Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog >
  )
}