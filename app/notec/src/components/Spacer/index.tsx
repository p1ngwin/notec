import styles from './styles.module.sass';

type Props = {
  size?: number;
  color?: string;
  width?: number;
};

const Spacer = ({ size, color, width }: Props) => {
  const style = color && size ? { borderTop: `${size}em solid ${color}` } : {};

  return <hr className={styles.Spacer} style={{ ...style, width: `${width}%` }} />;
};

export default Spacer;
