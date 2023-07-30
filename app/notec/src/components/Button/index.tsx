import { Button as MuiButton } from "@mui/material";
import styles from "./styles.module.sass";
import classNames from "classnames";

type Props = {
  label: string;
  onClick?: () => void;
  isSecondary?: boolean;
};

const Button = ({ label, onClick, isSecondary }: Props) => {
  const { Button, secondary } = styles;

  const buttonClasses = classNames([Button], {
    [secondary]: isSecondary,
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

export default Button;
