"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/form/button";
import React from "react";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/form/input";
import PasswordLost from "@/action/password-lost";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>Enviando...</Button>
      ) : (
        <Button>Enviar E-mail</Button>
      )}
    </>
  );
}

export default function LoginPerdeuForm() {
  const [url, setUrl] = React.useState("");

  const [state, action] = useFormState(PasswordLost, {
    ok: false,
    error: "",
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) {
      window.location.href = "/conta";
    }
  }, [state.ok]);

  React.useEffect(() => {
    setUrl(window.location.href.replace("perdeu", "resetar"));
  }, []);

  return (
    <>
      <form action={action}>
        <Input label="E-mail / Usuário" name="login" type="text" />
        <input type="hidden" name="url" value={url} />
        <ErrorMessage error={state.error} />
        {state.ok ? (
          <p style={{ color: "#4c1" }}>E-mail enviado</p>
        ) : (
          <FormButton />
        )}
      </form>
    </>
  );
}
