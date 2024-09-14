"use client";

import styles from "./photo-delete.module.css";
import React from "react";

export default function PhotoDelete({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);

  async function handleDelete() {
    setLoading(true);

    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      await PhotoDelete({ id });
    }

    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          {" "}
          Deletando...
        </button>
      ) : (
        <button onClick={handleDelete} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
}
