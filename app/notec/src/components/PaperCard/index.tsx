import classNames from "classnames";
import styles from "./styles.module.sass";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  value?: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
  extend?: boolean;
  centerContent?: boolean;
};

export const PaperCard = ({
  title,
  subtitle,
  value,
  icon,
  onClick,
  isLoading,
  children,
  extend,
  centerContent,
}: Props) => {
  const { PaperCard, Title, Subtitle, Value, Clickable } = styles;

  return (
    <Paper
      className={classNames([PaperCard], {
        [Clickable]: !!onClick,
      })}
      elevation={1}
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        placeContent: centerContent ? "center" : "initial",
        placeItems: centerContent ? "center" : "initial",
        flex: extend ? 1 : "initial",
      }}
      onClick={onClick}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            <Typography
              variant="h5"
              className={Title}
            >
              {title}
            </Typography>
          </Box>
          <Box>
            {subtitle && (
              <Typography
                variant="subtitle2"
                className={Subtitle}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", paddingTop: "1rem" }}
          >
            {icon && icon}

            <Typography
              variant="h4"
              className={Value}
            >
              {value}
            </Typography>
            {children}
          </Box>
        </>
      )}
    </Paper>
  );
};
