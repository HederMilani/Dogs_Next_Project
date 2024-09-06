"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/form/button";
import React from "react";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/form/input";
import PasswordReset from "@/action/password-reset";

type ResetParams = {
  keyToken: string;
  login: string;
};

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>Resetando...</Button>
      ) : (
        <Button>Resetar</Button>
      )}
    </>
  );
}

export default function LoginResetForm({ keyToken, login }: ResetParams) {
  const [state, action] = useFormState(PasswordReset, {
    ok: false,
    error: "",
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) {
      window.location.href = "/login";
    }
  }, [state.ok]);

  return (
    <>
      <form className="animeLeft" action={action}>
        <Input label="Nova Senha" name="password" type="password" />
        <input type="hidden" name="key" value={keyToken} />
        <input type="hidden" name="login" value={login} />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
}
