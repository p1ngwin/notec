import { useUserStore } from '@/stores/useUserStore';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { registerUser } from '@/auth/authHelpers';
import View from '@/components/View';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { Email, VisibilityOff } from '@mui/icons-material';
import ActionButton from '@/components/ActionButton';

import styles from './styles.module.sass';
import Divider from '@/components/Divider';

type FormProps = {
  _email: string;
  _password: string;
};

const Register = () => {
  const { Register, Subheading, _Button } = styles;

  const router = useRouter();

  const { t } = useTranslation();

  const actions = useUserStore();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      _email: '',
      _password: '',
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async ({ _email, _password }) => {
    const result = await registerUser(_email, _password);
    if (result.error) {
      toast.error(`${t('toast.registration_error')} ${result.error.message}`);
      return actions.setUser(null);
    }
    if (result.user) {
      toast.success(
        `${t('toast.verification_email_sent')} ${result.user.email}.`,
      );
      router.push('/');
    }
  };

  return (
    <View fullScreen className={Register}>
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
            <Typography component="h1" variant="h3" textAlign="center" mb={2}>
              {t('register.register')}
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              textAlign="center"
              className={Subheading}
            >
              {t('register.register_new_account')}
            </Typography>
          </Grid>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="_email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <span>{t('login.email_address')}</span>
                    <TextField
                      {...field}
                      type="email"
                      autoComplete="new-email"
                      margin="normal"
                      required
                      fullWidth
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
                name="_password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <span>{t('login.password')}</span>
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      autoComplete="new-password"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={_Button}
              >
                {t('register.register')}
              </Button>
              <Divider>or</Divider>
              <Grid item display="flex" justifyContent="center" mt={2}>
                <ActionButton
                  isPlain
                  onClick={() => router.push('/login')}
                  label={t('register.already_registered')}
                />
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </View>
  );
};

export default Register;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
