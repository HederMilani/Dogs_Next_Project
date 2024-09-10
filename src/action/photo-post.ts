"use server";

import errorApi from "@/functions/error-api";
import { cookies } from "next/headers";
import { PHOTO_POST } from "@/functions/api";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function PhotoPost(state: {}, formData: FormData) {
  const token = cookies().get("token")?.value;
  const nome = formData.get("nome") as string;
  const peso = formData.get("peso") as string;
  const idade = formData.get("idade") as string;
  const img = formData.get("img") as File;

  try {
    if (!nome || !peso || !idade || img.size === 0) {
      throw new Error("Preencha todos os campos");
    }
    if (!token) {
      throw new Error("Você precisa estar logado");
    }

    const { url } = PHOTO_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar foto");
    }
  } catch (e) {
    return errorApi(e);
  }

  revalidateTag("photos");
  redirect("/conta");
}
