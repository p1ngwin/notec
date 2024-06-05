import Divider from '@/components/Divider';
import AddServiceForm from '@/forms/Services/Add';
import { Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddService = () => {
  const { t } = useTranslation();
  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }} alignItems="center">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="start"
          alignItems="center"
        >
          <Grid item xs={8} my={3}>
            <span className="HeaderHeading">
              {t('servicespage.new_service')}
            </span>
            <br />
            <span className="HeaderDate">
              {t('servicespage.new_service_subtext')}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <AddServiceForm />
    </>
  );
};
export default AddService;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
