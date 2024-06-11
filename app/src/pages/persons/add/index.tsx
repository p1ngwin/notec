import Divider from '@/components/Divider';
import AddPersonForm from '@/forms/Persons/Add';
import { Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddPerson = () => {
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
            <span className="HeaderHeading">{t('clientpage.new_client')}</span>
            <br />
            <span className="HeaderDate">
              {t('clientpage.new_client_subtext')}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <AddPersonForm />
    </>
  );
};
export default AddPerson;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};
