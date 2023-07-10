import { Link } from "react-router-dom";
import styles from "../../assets/styles/Header.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/persons">Persons</Link>
          </li>
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
