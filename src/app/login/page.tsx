import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: "Página de login",
};

export default async function LoginPage() {
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <LoginForm />
    </section>
  );
}
