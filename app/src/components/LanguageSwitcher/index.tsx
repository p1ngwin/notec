import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { activeLanguages } from '@/utils/lang/activeLanguages';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Language } from '@mui/icons-material';

import styles from './styles.module.sass';
import { getCookie } from '@/utils/helpers/utils';

const LanguageSwitcher = () => {
  const { LanguageSwitcher, SelectedLanugage } = styles;

  const router = useRouter();
  const { i18n } = useTranslation();

  const initialLocale = getCookie('lang');

  const handleLocaleChange = (locale: string) => {
    i18n.changeLanguage(locale);
    router.push(router.asPath, router.query, { locale });
    document.cookie = 'lang=' + locale;
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [i18n, initialLocale]);

  return (
    <div className={LanguageSwitcher}>
      <IconButton onClick={handleClick}>
        <Language />
        <span className={SelectedLanugage}>
          {
            activeLanguages?.find(({ code }) => code === i18n?.language)
              ?.language
          }
        </span>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {activeLanguages.map(({ code, language }) => (
          <MenuItem key={code} onClick={() => handleLocaleChange(code)}>
            {language}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
