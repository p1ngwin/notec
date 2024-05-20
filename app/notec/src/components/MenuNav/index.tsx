import React from 'react';
import styles from './styles.module.sass';
import { Button } from '@mui/material';
import Image from 'next/image';
import logo from '../../assets/img/logo.svg';
import { useRouter } from 'next/router';
import Spacer from '@/components/Spacer';
import {
  Summarize,
  CalendarMonth,
  People,
  Home,
  AddCard,
  AccountBalance,
  Person,
} from '@mui/icons-material';
import classNames from 'classnames';
import { useSidebar } from '@/context/mobileSidebar/useSidebar';
import { useUserStore } from '@/stores/useUserStore';
import { useTranslation } from 'next-i18next';

type Props = {
  isMobile?: boolean;
};

export const MenuNav = ({ isMobile = false }: Props) => {
  const {
    NavMenuButton,
    NavMenuWrapper,
    NavMenuText,
    SideMenuWrapper,
    MobileMenuWrapper,
    NavMenuButtonWrapper,
    Logo,
  } = styles;

  const { t } = useTranslation('menu');
  const { toggleDrawer } = useSidebar();

  const user = useUserStore((state) => state.user);

  const handleOnMenuItemClicked = (path: string) => {
    router.push(path);
    isMobile && toggleDrawer();
  };

  const router = useRouter();
  return (
    <div
      className={classNames({
        [SideMenuWrapper]: !isMobile,
        [MobileMenuWrapper]: isMobile,
      })}
    >
      <div className={Logo}>
        <Image src={logo} alt="logo" />
      </div>

      <Spacer />
      <div className={NavMenuWrapper}>
        {isMobile && (
          <>
            <div className={NavMenuButtonWrapper}>
              <Button
                className={NavMenuButton}
                onClick={() => handleOnMenuItemClicked('/profile')}
              >
                <Person />
                <div className={NavMenuText}>
                  {user?.displayName ?? user?.email}
                </div>
              </Button>
            </div>
            <Spacer />
          </>
        )}
        <div className={NavMenuButtonWrapper}>
          <Button
            className={NavMenuButton}
            onClick={() => handleOnMenuItemClicked('/')}
          >
            <Home />
            <div className={NavMenuText}>{t('general.home')}</div>
          </Button>
        </div>
        <div className={NavMenuButtonWrapper}>
          <Button
            className={NavMenuButton}
            onClick={() => handleOnMenuItemClicked('/persons')}
          >
            <People />
            <div className={NavMenuText}>{t('clients')}</div>
          </Button>
        </div>
        <div className={NavMenuButtonWrapper}>
          <Button
            className={NavMenuButton}
            onClick={() => handleOnMenuItemClicked('/appointments')}
          >
            <CalendarMonth />
            <div className={NavMenuText}>{t('general.schedule')}</div>
          </Button>
        </div>
        <div className={NavMenuButtonWrapper}>
          <Button
            className={NavMenuButton}
            onClick={() => handleOnMenuItemClicked('/services')}
          >
            <Summarize />
            <div className={NavMenuText}>{t('general.price_list')}</div>
          </Button>
        </div>
        <div className={NavMenuButtonWrapper}>
          <Button
            className={NavMenuButton}
            onClick={() => handleOnMenuItemClicked('/revenue')}
          >
            <AddCard />
            <div className={NavMenuText}>{t('general.income')}</div>
          </Button>
        </div>
        <div className={NavMenuButtonWrapper}>
          <Button
            className={NavMenuButton}
            onClick={() => handleOnMenuItemClicked('/expenses')}
          >
            <AccountBalance />
            <div className={NavMenuText}>{t('general.expenses')}</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
