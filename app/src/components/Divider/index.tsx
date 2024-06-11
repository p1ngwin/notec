import { ReactNode } from 'react';

import styles from './styles.module.sass';

type Props = {
  children?: ReactNode;
};

const Divider = ({ children }: Props) => {
  const { Container, Border, Content } = styles;

  return (
    <div className={Container}>
      {children ? (
        <>
          <div className={Border} />
          <span className={Content}>{children}</span>
          <div className={Border} />
        </>
      ) : (
        <div className={Border} />
      )}
    </div>
  );
};

export default Divider;
