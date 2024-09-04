"use server";

import { Photo } from "@/types/photo";

export default async function PhotosGet() {
  const response = await fetch(
    "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0",
  );
  const json = (await response.json()) as Photo[];
  return json;
}
