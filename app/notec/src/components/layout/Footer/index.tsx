import styles from "./styles.module.sass";

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Your Website Name</p>
  </footer>
);

export default Footer;
