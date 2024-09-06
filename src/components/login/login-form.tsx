"use client";

import styles from "./login-form.module.css";
import stylesBtn from "@/components/form/button.module.css";
import Login from "@/action/login";
import { useFormStatus, useFormState } from "react-dom";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import ErrorMessage from "@/components/helper/error-message";
import React from "react";
import Link from "next/link";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>Carregando...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
    </>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(Login, {
    ok: false,
    error: "",
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) {
      window.location.href = "/conta";
    }
  }, [state.ok]);

  return (
    <>
      <form className={styles.form} action={action}>
        <Input label="Usuário" name="username" type="text" />
        <Input label="Senha" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link href="conta/perdeu" className={styles.lost}>
        Perdeu a senha?
      </Link>
      <div className={styles.create}>
        <h2 className={styles.subtitle}>Criar conta</h2>
        <p>Ainda não possui uma conta? Crie uma agora mesmo!</p>
        <Link href="conta/criar" className={stylesBtn.button}>
          Cadastre-se
        </Link>
      </div>
    </>
  );
}
