"use server";

import { Photo } from "@/types/photo";
import errorApi from "@/functions/error-api";
import { PHOTOS_GET } from "@/functions/api";

type PhotosGetProps = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export default async function PhotosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetProps = {},
  optionsFront?: RequestInit,
) {
  try {
    const options = optionsFront || {
      next: {
        revalidate: 10,
        tags: ["photos"],
      },
    };
    const { url } = PHOTOS_GET({ page, total, user });
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Erro ao pegar as fotos");

    const data = (await response.json()) as Photo[];
    return {
      data,
      ok: true,
      error: null,
    };
  } catch (e) {
    return errorApi(e);
  }
}
