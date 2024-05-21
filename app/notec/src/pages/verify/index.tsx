import {
  sendEmailVerificationToUser,
  useAuthActions,
} from '@/auth/authHelpers';
import Button from '@/components/ActionButton';
import View from '@/components/View';
import { useUserStore } from '@/stores/useUserStore';
import { Container, Typography, Box, Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const VerifyEmail = () => {
  const user = useUserStore((state) => state.user);

  const { handleSignOut } = useAuthActions();
  return (
    <View fullScreen>
      <Container>
        <Box marginBottom={'1rem'}>
          <Typography align="center" fontSize={'1.5rem'}>
            Please verify email <b>{user?.email}</b>
          </Typography>
        </Box>
        <Grid justifyContent={'center'} container>
          <Grid item margin={'1rem'}>
            <Button
              onClick={() => sendEmailVerificationToUser(user)}
              label="Resend verification mail"
            />
          </Grid>
          <Grid item margin={'1rem'}>
            <Button onClick={() => window.location.reload()} label="Retry" />
          </Grid>

          <Grid item margin={'1rem'}>
            <Button onClick={handleSignOut} label="Sign out" />
          </Grid>
        </Grid>
      </Container>
    </View>
  );
};

export default VerifyEmail;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
