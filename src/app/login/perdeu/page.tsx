import { Metadata } from "next";
import LoginPerdeuForm from "@/components/login/login-perdeu-form";

export const metadata: Metadata = {
  title: "Perdeu | Dogs",
  description: "Página de recuperação de senha",
};

export default async function PerdeuPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Perdeu a Senha?</h1>
      <LoginPerdeuForm />
    </div>
  );
}
