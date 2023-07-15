import styles from "./styles.module.sass";

type Props = {
  size?: number;
  color?: string;
};

const Spacer = ({ size, color }: Props) => {
  const style = color && size ? { borderTop: `${size}em solid ${color}` } : {};

  return (
    <hr
      className={styles.Spacer}
      style={style}
    />
  );
};

export default Spacer;
