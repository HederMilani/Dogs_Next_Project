import { Metadata } from "next";
import LoginCriarForm from "@/components/login/login-criar-form";

export const metadata: Metadata = {
  title: "Cadastro | Dogs",
  description: "Página de criação de conta",
};

export default async function CriarPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <LoginCriarForm />
    </div>
  );
}
