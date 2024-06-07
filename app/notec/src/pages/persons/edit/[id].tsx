import View from '@/components/View';
import { useRouter } from 'next/router';
import styles from '../styles.module.sass';
import PersonCard from '@/components/Profile/PersonCard';
import { useEffect, useState } from 'react';
import { deletePersonUrl, personsUrl, updatePersonUrl } from '@/utils/api/urls';
import { IPerson } from '@/types/Person';
import {
  useDeleteStore,
  useFetchStore,
  useUpdateStore,
} from '@/stores/useRequestStore';
import { TextField, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ActionButton from '@/components/ActionButton';
import { useTranslation } from 'next-i18next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PaperCard } from '@/components/PaperCard';

type FormValues = {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
};

export default function Page() {
  const router = useRouter();
  const { query } = router;

  const { fetch, isLoading } = useFetchStore();
  const { update } = useUpdateStore();
  const { _delete } = useDeleteStore();

  const { t } = useTranslation();

  const personId = query.id as string;

  const { PersonView } = styles;

  const [person, setPerson] = useState<IPerson>();

  const { first_name, last_name, email, phone_number, id } = person ?? {};

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      first_name: first_name ?? '',
      last_name: last_name ?? '',
      phone_number: phone_number ?? '',
      email: email ?? '',
    },
  });

  useEffect(() => {
    (async () => {
      const person = await fetch(personsUrl(personId));
      if (person) {
        setPerson(person);
        setValue('first_name', person.first_name);
        setValue('last_name', person.last_name);
        setValue('email', person.email);
        setValue('phone_number', person.phone_number);
      }
    })();
  }, [personId, fetch, setValue]);

  const onUpdate = async (data: FormValues) => {
    const updatedPerson = await update(updatePersonUrl(personId), data);
    updatedPerson && setPerson(updatedPerson);
    const person = await fetch(personsUrl(personId));
    if (person) {
      setPerson(person);
      setValue('first_name', person.first_name);
      setValue('last_name', person.last_name);
      setValue('email', person.email);
      setValue('phone_number', person.phone_number);

      toast.success(t("toast.client_delete_success"));
    } else {
      toast.error(t("toast.client_delete_error"));
    }
  };

  const onDelete = async () => {
    toast
      .promise(_delete(deletePersonUrl(personId)), {
        loading: t('toast.client_delete_loading'),
        success: t('toast.client_delete_success'),
        error: t('toast.client_delete_error'),
      })
      .then(() => router.push('../'));
  };

  if (!isLoading && !person) {
    return <span>Oseba ni najdena!</span>;
  }

  return (
    <View className={PersonView} fullWidth>
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
            <span className="HeaderHeading">
              {first_name} {last_name}
            </span>
            <br />
            <span className="HeaderDate">
              {t('clientpage.client_overview')}
            </span>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={6} display="flex">
          <PaperCard>
            <PersonCard {...person} />
          </PaperCard>
        </Grid>
        <Grid item xs={6} display="flex">
          <PaperCard title={t('clientpage.edit_client')}>
            <form onSubmit={handleSubmit(onUpdate)}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        label="Ime"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        label="Priimek"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} margin="normal" label="Tel. št" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} margin="normal" label="Email" />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    margin="normal"
                    label="Note (optional)"
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} justifyContent="start" display="flex">
                  <ActionButton
                    label={t('actions.save')}
                    onClick={handleSubmit(onUpdate)}
                    isPrimary
                  />
                </Grid>
                <Grid item xs={6} justifyContent="end" display="flex">
                  <ActionButton
                    label={t('actions.delete')}
                    onClick={handleSubmit(onDelete)}
                    isSecondary
                  />
                </Grid>
              </Grid>
            </form>
          </PaperCard>
        </Grid>
      </Grid>
    </View>
  );
}

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
