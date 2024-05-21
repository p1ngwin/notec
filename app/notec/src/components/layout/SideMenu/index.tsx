import React from 'react';
import styles from './styles.module.sass';
import { Drawer, MenuItem } from '@mui/material';
import { MenuNav } from '@/components/MenuNav';
import Image from 'next/image';
import logo from '../../../assets/img/logo.svg';
import classNames from 'classnames';
import { useAuthActions } from '@/auth/authHelpers';
import { Logout as LogoutSVG, Settings } from '@mui/icons-material';
import Spacer from '@/components/Spacer';
import { useRouter } from 'next/router';

const SideMenuLayout = () => {
  const { SideMenuWrapper, Logo, Top, Middle, Bottom, ActionItem, Active } =
    styles;

  const router = useRouter();

  const { route } = router;

  const { handleSignOut } = useAuthActions();

  return (
    <div className={SideMenuWrapper}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiPaper-root': {
            position: 'relative',
            background: '#252429',
            justifyContent: 'space-between',
          },
          height: '100%',
        }}
      >
        <div className={classNames([Logo, Top])}>
          <Image src={logo} alt="logo" />
        </div>
        <div className={Middle}>
          <MenuNav />
        </div>
        <Spacer width={95} />
        <div className={Bottom}>
          <div
            className={classNames([ActionItem, route === '/profile' && Active])}
          >
            <MenuItem onClick={() => router.push('/profile')}>
              <Settings /> Settings
            </MenuItem>
          </div>
          <div className={ActionItem}>
            <MenuItem onClick={handleSignOut}>
              <LogoutSVG /> Sign out
            </MenuItem>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SideMenuLayout;
