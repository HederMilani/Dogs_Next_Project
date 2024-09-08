import styles from "@/components/header.module.css";
import Link from "next/link";
import Image from "next/image";
import UserGet from "@/action/user-get";

export default async function Header() {
  const { data } = await UserGet();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/dogs.svg"
            alt="dogs"
            width={28}
            height={22}
            priority
          />
        </Link>
        {data ? (
          <Link href="/conta" className={styles.login}>
            {data.nome}
          </Link>
        ) : (
          <Link href="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
}
