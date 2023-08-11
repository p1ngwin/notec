import styles from "./styles.module.sass";

const Footer = () => (
  <footer className={styles.footer}>
    <p>{new Date().getFullYear()} &copy; Frizerstvo Simona</p>
  </footer>
);

export default Footer;
