import { signInUserWithEmail } from '@/auth/authHelpers';
import View from '@/components/View';
import { useUserStore } from '@/stores/useUserStore';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Email, VisibilityOff } from '@mui/icons-material';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import ActionButton from '@/components/ActionButton';

import styles from './styles.module.sass';
import Divider from '@/components/Divider';
import { useEffect } from 'react';

type FormProps = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const { Login, InputLabel, Subheading, Heading, _Button } = styles;
  const router = useRouter();
  const { query } = router;
  const actions = useUserStore();

  const { t } = useTranslation();

  const { control, handleSubmit, setValue } = useForm<FormProps>({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  });

  useEffect(() => {
    setValue('email', query.username as string);
    setValue('password', query.password as string);
  }, [query, setValue]);

  const onSubmit: SubmitHandler<FormProps> = async ({ email, password }) => {
    const result = await signInUserWithEmail(email, password);

    const { error, user, token } = result;

    if (error) {
      toast.error(`Error signing in. Error: ${error.message}`);
      return actions.setUser(null);
    }
    if (user) {
      toast.success(`Welcome ${user.displayName}`);
      actions.setUser(user);
      actions.setToken(token);
      return router.push('/');
    }
  };

  return (
    <View fullScreen className={Login}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid
            mb={4}
            display="flex"
            flexDirection="column"
            justifyItems="center"
          >
            <Typography
              component="h1"
              variant="h3"
              textAlign="center"
              mb={2}
              className={Heading}
            >
              {t('login.log_in')}
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              textAlign="center"
              className={Subheading}
            >
              {t('login.log_in_subtext')}
            </Typography>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <span className={InputLabel}>
                      {t('login.email_address')}
                    </span>
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      type="email"
                      autoFocus
                      InputProps={{
                        sx: { borderRadius: 35, paddingX: 2 },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <span className={InputLabel}>{t('login.password')}</span>
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      InputProps={{
                        sx: { borderRadius: 35, paddingX: 2 },
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOff />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              />
              <Grid container mt={2}>
                <Grid item xs={6} display="flex" justifyContent="start">
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox {...field} defaultChecked color="default" />
                        }
                        label="Remember me"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="end">
                  <ActionButton isPlain label="Forgot your password?" />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={_Button}
              >
                {t('login.sign_in')}
              </Button>
              <Divider>or</Divider>
              <Grid item display="flex" justifyContent="center" mt={2}>
                <ActionButton
                  isPlain
                  onClick={() => router.push('/register')}
                  label={t('login.no_account')}
                />
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </View>
  );
};

export default Login;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
