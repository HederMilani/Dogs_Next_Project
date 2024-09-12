"use server";

import errorApi from "@/functions/error-api";
import { PHOTO_DELETE } from "@/functions/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export default async function PhotoDelete(id: string) {
  const token = cookies().get("token")?.value;
  try {
    if (!token) throw new Error("Você precisa estar logado");
    const { url } = PHOTO_DELETE(id);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao deletar foto");
  } catch (e) {
    return errorApi(e);
  }

  revalidateTag("photos");
  redirect("/conta");
}
