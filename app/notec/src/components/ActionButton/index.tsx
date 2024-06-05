import { Button as MuiButton } from '@mui/material';
import styles from './styles.module.sass';
import classNames from 'classnames';

type Props = {
  label: string;
  onClick?: () => void;
  isSecondary?: boolean;
  isPrimary?: boolean;
  icon?: SVGElement | null;
  isPlain?: boolean;
};

const ActionButton = ({
  label,
  onClick,
  isSecondary,
  isPrimary,
  isPlain,
}: Props) => {
  const { Button, secondary, primary, plain } = styles;

  const buttonClasses = classNames([Button], {
    [secondary]: isSecondary,
    [primary]: isPrimary,
    [plain]: isPlain,
  });

  return (
    <MuiButton
      className={buttonClasses}
      color="secondary"
      variant="text"
      onClick={onClick}
      size="small"
    >
      {label}
    </MuiButton>
  );
};

export default ActionButton;
