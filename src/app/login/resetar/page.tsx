import LoginResetForm from "@/components/login/login-reset-form";
import { Metadata } from "next";

type ResetarSearchParams = {
  searchParams: {
    key: string;
    login: string;
  };
};

export const metadata: Metadata = {
  title: "Resetar | Dogs",
  description: "Página de reset de senha",
};

export default async function ResetarPage({
  searchParams,
}: ResetarSearchParams) {
  return (
    <div className="animeLeft">
      <h1 className="title">Resete sua senha</h1>
      <LoginResetForm keyToken={searchParams.key} login={searchParams.login} />
    </div>
  );
}
