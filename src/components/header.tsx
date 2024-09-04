import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
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
        <Link href="/login" className={styles.login}>
          Login / Criar
        </Link>
      </nav>
    </header>
  );
}
