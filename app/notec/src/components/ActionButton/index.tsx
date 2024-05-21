import { Button as MuiButton } from '@mui/material';
import styles from './styles.module.sass';
import classNames from 'classnames';

type Props = {
  label: string;
  onClick?: () => void;
  isSecondary?: boolean;
  isPrimary?: boolean;
  icon?: SVGElement | null;
};

const ActionButton = ({ label, onClick, isSecondary, isPrimary }: Props) => {
  const { Button, secondary, primary } = styles;

  const buttonClasses = classNames([Button], {
    [secondary]: isSecondary,
    [primary]: isPrimary,
  });

  return (
    <MuiButton
      className={buttonClasses}
      color="secondary"
      variant="text"
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

export default ActionButton;
