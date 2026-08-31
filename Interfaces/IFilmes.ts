import z from "zod";

export const IFilmes = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "O nome do filme é obrigatório" }),
    description: z.string().min(1, { message: "A descrição do filme é obrigatória" }),
    video: z.string().min(1, { message: "O link do vídeo do filme é obrigatório" }),
    image: z.string().min(1, { message: "O link da imagem do filme é obrigatório" }),
});

export type IFilmes = z.infer<typeof IFilmes>;