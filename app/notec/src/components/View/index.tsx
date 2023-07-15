import classNames from "classnames";
import styles from "./styles.module.sass";
import { ReactNode } from "react";

type Props = {
  className?: string | string[];
  children: ReactNode;
  FullWidth?: boolean;
};

const View = ({ className, children, FullWidth = false }: Props) => {
  const { View, fullWidth } = styles;

  return <div className={`${View} ${FullWidth && fullWidth}`}>{children}</div>;
};

export default View;
