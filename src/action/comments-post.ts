"use server";

import { cookies } from "next/headers";
import errorApi from "@/functions/error-api";
import { COMMENT_POST } from "@/functions/api";
import { revalidateTag } from "next/cache";

export default async function CommentsPost(state: {}, formData: FormData) {
  const token = cookies().get("token")?.value;
  const comment = formData.get("comment") as string;
  const id = formData.get("id") as string;

  try {
    if (!comment) {
      throw new Error("Preencha o comentário");
    }
    if (!token) {
      throw new Error("Você precisa estar logado");
    }

    const { url } = COMMENT_POST(id);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Erro ao enviar comentário");

    const data = (await response.json()) as Comment;
    revalidateTag("comment");
    return { data, ok: true, error: "" };
  } catch (e) {
    return errorApi(e);
  }
}
