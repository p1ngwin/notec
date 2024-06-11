import View from '@/components/View';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { servicesUpdateUrl, servicesUrl } from '@/utils/api/urls';
import { IService } from '@/types/Service';
import { useFetchStore, useUpdateStore } from '@/stores/useRequestStore';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { PaperCard } from '@/components/PaperCard';
import ActionButton from '@/components/ActionButton';
import { CreditCard, Label, StickyNote2 } from '@mui/icons-material';

import styles from '../styles.module.sass';
import Divider from '@/components/Divider';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type FormProps = {
  service: string;
  price: number;
  note?: string;
};

const ServicesEdit = () => {
  const { query } = useRouter();

  const { fetch } = useFetchStore();
  const { update } = useUpdateStore();

  const { Service, InfoLabel, ServiceIcon, InfoNote } = styles;

  const { t } = useTranslation();

  const serviceId = query.id as string;

  const [service, setService] = useState<IService>();

  const { control, handleSubmit, setValue } = useForm<FormProps>({
    defaultValues: {
      price: service?.price ?? 0,
      service: service?.service ?? '',
      note: service?.note,
    },
  });

  useEffect(() => {
    (async () => {
      const service = await fetch(servicesUrl(serviceId));
      if (service) {
        setService(service);
        setValue('price', service.price);
        setValue('service', service.service);
      }
    })();
  }, [serviceId, fetch, setValue]);

  const onUpdate = async (data: FormProps) => {
    const updatedService = await update(servicesUpdateUrl(serviceId), data);
    updatedService && setService(updatedService);

    const service = await fetch(servicesUrl(serviceId));
    if (service) {
      setService(service);
      setValue('price', service.price);
      setValue('service', service.service);
      toast.success(t('toast.service_update_success'));
    } else {
      toast.error(t('toast.service_update_error'));
    }
  };

  return (
    <View fullWidth>
      <Grid container sx={{ justifyContent: 'center' }} alignItems="center">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="start"
          alignItems="center"
          mb={4}
        >
          <Grid item xs={8} my={3}>
            <span className="HeaderHeading">{service?.service}</span>
            <br />
            <span className="HeaderDate">
              {t('servicespage.services_overview')}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={6} display="flex">
          <PaperCard>
            <Grid
              container
              className={Service}
              display="flex"
              alignItems="center"
            >
              <Grid item xs={4} display="flex" className={ServiceIcon}>
                <StickyNote2 />
              </Grid>
              <Grid item xs={8}>
                <Grid item xs={12} display="flex" my={2} className={InfoLabel}>
                  <Label />
                  {service?.service}
                </Grid>
                <Grid item xs={12} display="flex" my={2} className={InfoLabel}>
                  <CreditCard />
                  {service?.price.toFixed(2)} €
                </Grid>
                <Divider />
                <Grid item xs={12} className={InfoNote}>
                  {service?.note}
                  Lorem ipsum note
                </Grid>
              </Grid>
            </Grid>
          </PaperCard>
        </Grid>
        <Grid item xs={6} display="flex">
          <PaperCard title={t('servicespage.edit_service')}>
            <form onSubmit={handleSubmit(onUpdate)}>
              <Grid container maxWidth="md" spacing={1}>
                <Grid item xs={6}>
                  <Controller
                    name="service"
                    control={control}
                    rules={{ required: t('servicespage.enter_service_name') }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label={t('service_name')}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: t('servicespage.enter_price') }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label={t('price')}
                        type="number"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    multiline
                    margin="normal"
                    label={`${t('note')} (${t('optional')})`}
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ActionButton
                    label={t('actions.save')}
                    onClick={handleSubmit(onUpdate)}
                    isPrimary
                  />
                </Grid>
              </Grid>
            </form>
          </PaperCard>
        </Grid>
      </Grid>
    </View>
  );
};

export default ServicesEdit;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
