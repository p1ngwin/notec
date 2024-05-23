import classNames from 'classnames';
import styles from './styles.module.sass';
import { Typography, CircularProgress, Grid } from '@mui/material';

type Props = {
  title?: string;
  subtitle?: string;
  value?: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
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
}: Props) => {
  const { PaperCard, Title, Subtitle, Value, Clickable, PaperCardIcon } =
    styles;

  return (
    <div
      className={classNames([PaperCard], {
        [Clickable]: !!onClick,
      })}
      onClick={onClick}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid xs={12} display="flex" justifyContent="space-between">
            <Grid item xs={icon ? 8 : 12}>
              <Typography variant="h5" className={Title}>
                {title}
              </Typography>
            </Grid>
            {icon && (
              <Grid
                className={PaperCardIcon}
                item
                xs={2}
                display="flex"
                justifyContent="end"
                alignItems="center"
                fontSize={4}
              >
                {icon}
              </Grid>
            )}
          </Grid>
          {subtitle && (
            <Grid item xs={icon ? 8 : 12}>
              <Typography className={Subtitle}>{subtitle}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h4" className={Value}>
              {value}
            </Typography>
          </Grid>
          <Grid mt={5} item xs={12}>
            {children}
          </Grid>
        </Grid>
      )}
    </div>
  );
};
