import classNames from "classnames";
import styles from "./styles.module.sass";
import { ReactNode } from "react";

type Props = {
  className?: string | string[];
  children: ReactNode;
  fullWidth?: boolean;
};

const View = ({ className, children, fullWidth = false }: Props) => {
  const { View } = styles;

  const viewCn = classNames([View], className, {
    FullWidth: Boolean(fullWidth),
  });

  return <div className={viewCn}>{children}</div>;
};

export default View;
