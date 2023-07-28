import classNames from "classnames";
import styles from "./styles.module.sass";
import { ReactNode } from "react";
import { Grid } from "@mui/material";

type Props = {
  className?: string | string[];
  children: ReactNode;
  fullWidth?: boolean;
  fullScreen?: boolean;
};

const View = ({
  className,
  children,
  fullWidth = false,
  fullScreen = false,
}: Props) => {
  const { View, FullScreen, FullWidth } = styles;

  const viewCn = classNames([className, View], {
    [FullScreen]: Boolean(fullScreen),
    [FullWidth]: Boolean(fullWidth),
  });

  return <Grid className={viewCn}>{children}</Grid>;
};

export default View;
