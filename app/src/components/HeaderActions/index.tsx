import { PropsWithChildren } from "react";
import styles from "./styles.module.sass";

type Props = {
  title?: string;
};

const HeaderActions = ({ title, children }: PropsWithChildren<Props>) => {
  const { HeaderActions, Title } = styles;

  return (
    <div className={HeaderActions}>
      {title && <span className={Title}>{title}</span>}
      {children}
    </div>
  );
};

export default HeaderActions;
