import { Metadata } from "next";
import ContaPhotoPost from "@/components/conta/postar/conta-photo-post";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Postar | Dogs",
  description: "Postar fotos dos seus cachorros",
};

export default async function PostarPage() {
  return (
    <div className="animeLeft">
      <ContaPhotoPost />
    </div>
  );
}
