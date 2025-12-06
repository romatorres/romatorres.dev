"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, FileText, Type, FileImage } from "lucide-react";
import { upload } from "@vercel/blob/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useProjectStore } from "@/stores/projectsStores";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título é obrigatório." })
    .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
  imageUrl: z
    .string()
    .min(1, { message: "A imagem do projeto é obrigatória." }),
  link: z.string().optional(),
  description: z
    .string()
    .max(500, { message: "Os detalhes devem ter no máximo 500 caracteres." }),
  sizes: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface AgendaFormProps {
  onSuccess?: () => void;
}

export function ProjectForm({ onSuccess }: AgendaFormProps) {
  const { createProject, updateProject, selectedProject, setSelectedProject } =
    useProjectStore();
  const [imageSource, setImageSource] = useState<"url" | "file">("url");
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      link: "",
      sizes: "LARGE",
      isActive: true,
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const isEditing = !!selectedProject?.id;
  const watchedDetalhes = watch("description");
  const watchedImageUrl = watch("imageUrl");

  useEffect(() => {
    if (isEditing && selectedProject?.id) {
      form.reset({
        title: selectedProject.title || "",
        imageUrl: selectedProject.imageUrl || "",
        description: selectedProject.description || "",
        link: selectedProject.link || "",
        sizes: selectedProject.sizes || "LARGE",
        isActive: selectedProject.isActive ?? true,
      });
      if (selectedProject.imageUrl) {
        setImageSource("url");
      }
    } else {
      form.reset({
        title: "",
        imageUrl: "",
        description: "",
        link: "",
        sizes: "LARGE",
        isActive: true,
      });
      setImageSource("url");
    }
  }, [selectedProject, form, isEditing]);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);

    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      const imageUrl = newBlob.url;

      form.setValue("imageUrl", imageUrl, { shouldValidate: true });
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar a imagem."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const dataToSubmit = {
        title: values.title,
        imageUrl: values.imageUrl,
        description: values.description,
        link: values.link,
        sizes: values.sizes,
        isActive: values.isActive,
      };

      if (isEditing) {
        await updateProject(selectedProject.id!, dataToSubmit);
        toast.success("Projeto atualizado com sucesso!");
      } else {
        await createProject(dataToSubmit);
        toast.success("Projeto criado com sucesso!");
      }

      setSelectedProject(null);
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      toast.error("Ocorreu um erro ao salvar o projeto.");
    }
  };

  const handleCancel = () => {
    setSelectedProject(null);
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center font-medium">
                <Type className="h-4 w-4" />
                Título do Projeto
              </FormLabel>
              <FormControl>
                <Input placeholder="Site Banda Flashback..." {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                {field.value?.length || 0}/100 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center font-medium">
                <FileImage className="h-4 w-4 mr-2" />
                Imagem do projeto
              </FormLabel>
              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant={imageSource === "url" ? "secondary" : "ghost"}
                  onClick={() => setImageSource("url")}
                >
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageSource === "file" ? "secondary" : "ghost"}
                  onClick={() => setImageSource("file")}
                >
                  Upload
                </Button>
              </div>
              {imageSource === "url" ? (
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
              ) : (
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </FormControl>
              )}

              {watchedImageUrl && (
                <div className="mt-4 relative w-48 h-48 rounded-md overflow-hidden border">
                  <Image
                    src={watchedImageUrl}
                    alt="Pré-visualização da imagem"
                    className="w-full h-full object-contain"
                    fill
                  />
                </div>
              )}

              <FormDescription className="text-xs">
                {imageSource === "file"
                  ? "Faça o upload de uma imagem."
                  : "Insira a URL de uma imagem."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center font-medium">
                <Type className="h-4 w-4" />
                Link do Projeto
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://bandaflashback.com.br..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                {field.value?.length || 0}/100 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamanho no Grid</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho para o card do projeto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SMALL">Pequeno (1x1)</SelectItem>
                  <SelectItem value="MEDIUM">Médio (1x2)</SelectItem>
                  <SelectItem value="LARGE">Grande (2x2)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Isso define como o projeto aparecerá no grid da página inicial.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center font-medium">
                <FileText className="h-4 w-4" />
                Descrição
              </FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Adicione informações extras sobre o projeto..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                {watchedDetalhes?.length || 0}/500 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditing && (
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-500 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Ativar Projeto</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-3 pt-4 ">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Atualizando..." : "Criando..."}
              </>
            ) : (
              <>{isEditing ? "Atualizar Projeto" : "Criar Projeto"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
