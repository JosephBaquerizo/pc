import styles from "./header.module.css";

export default function Header () {
    return (
        <div className={styles.header}>
            <section className={styles.logoSection}>
                <span className={styles.logo}>Pokecheck</span>
            </section>
        </div>
    )
}