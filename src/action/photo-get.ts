"use server";

import errorApi from "@/functions/error-api";
import { PHOTO_GET } from "@/functions/api";
import { PhotoWithComments } from "@/types/photo";

export default async function PhotoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id);
    const response = await fetch(url, {
      next: {
        revalidate: 10,
        tags: ["photo", "comment"],
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar a foto");

    const data = (await response.json()) as PhotoWithComments;
    return {
      data,
      ok: true,
      error: null,
    };
  } catch (e) {
    return errorApi(e);
  }
}
