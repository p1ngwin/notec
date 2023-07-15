import { PropsWithChildren } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.sass";

type Props = {
  title?: string;
};

const HeaderActions = ({ title, children }: PropsWithChildren<Props>) => {
  const { HeaderActions, Title } = styles;

  return (
    <div className={HeaderActions}>
      <span className={Title}>{title}</span>
      {children}
    </div>
  );
};

export default HeaderActions;
