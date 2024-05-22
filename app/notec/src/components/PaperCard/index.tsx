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
  const { PaperCard, Title, Subtitle, Value, Clickable } = styles;

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
          <Grid item xs={12}>
            <Typography variant="h5" className={Title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {subtitle && (
              <Typography variant="subtitle2" className={Subtitle}>
                {subtitle}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {icon && icon}
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
