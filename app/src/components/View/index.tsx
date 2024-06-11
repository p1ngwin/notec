import classNames from "classnames";
import styles from "./styles.module.sass";
import { ReactNode } from "react";
import { Grid, Container } from "@mui/material";

type Props = {
  className?: string | string[];
  children: ReactNode;
  fullWidth?: boolean;
  fullScreen?: boolean;
  container?: boolean;
  direction?: "row" | "column"
};

const View = ({
  className,
  children,
  fullWidth = false,
  fullScreen = false,
  container = false,
  direction
}: Props) => {
  const { View, FullScreen, FullWidth, DirectionRow, DirectionColumn } = styles;

  const viewCn = classNames([className, View], {
    [FullScreen]: Boolean(fullScreen),
    [FullWidth]: Boolean(fullWidth),
    [DirectionColumn]: Boolean(direction === "column"),
    [DirectionRow]: Boolean(direction === "row"),
  });

  return container ? (
    <Container>
      <Grid className={viewCn}>{children}</Grid>
    </Container>
  ) : (
    <Grid className={viewCn}>{children}</Grid>
  );
};

export default View;
