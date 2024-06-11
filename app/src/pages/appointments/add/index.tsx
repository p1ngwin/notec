import Breadcrumbs from '@/components/Breadcrumbs';
import HeaderActions from '@/components/HeaderActions';
import CreateAppointmentForm from '@/forms/Appointments/Add';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateAppointment = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <HeaderActions>
        <Breadcrumbs
          depth={2}
          values={[
            t('navigation.appointments.title'),
            t('navigation.appointments.new_appointment'),
          ]}
        />
      </HeaderActions>
      <CreateAppointmentForm />
    </>
  );
};
export default CreateAppointment;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
