import Table, { Action, Column } from '@/components/DataTable';
import View from '@/components/View';
import { IService } from '@/types/Service';
import { servicesDeleteUrl, servicesUrl } from '@/utils/api/urls';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useFetchStore, useDeleteStore } from '@/stores/useRequestStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ActionButton from '@/components/ActionButton';
import { useTranslation } from 'next-i18next';

const Services = () => {
  const router = useRouter();

  const { fetch } = useFetchStore();
  const { _delete } = useDeleteStore();

  const { t } = useTranslation();

  const [curretServices, setServices] = useState<IService[]>([]);
  const handleDeleteService = async (id: string) => {
    if (!id) return toast.error('Missing person id.');

    toast.promise(
      _delete(servicesDeleteUrl(id), {
        id: id,
      }).then(() => {
        fetch(servicesUrl()).then((services) => {
          services && setServices(services);
        });
      }),
      {
        loading: t('toast.client_delete_loading'),
        success: t('toast.client_delete_success'),
        error: t('toast.client_delete_error'),
      },
    );
  };

  useEffect(() => {
    (async () => {
      const services = await fetch(servicesUrl());
      services && setServices(services);
    })();
  }, [fetch]);

  const tableColumns: Column<IService>[] = [
    {
      label: t('service_name'),
      field: 'service',
      renderCell: (i) => i.service,
    },
    {
      label: t('price'),
      field: 'price',
      renderCell: (i) => (
        <span>
          <b>{i.price} €</b>
        </span>
      ),
    },
  ];

  const rowActions = useMemo<Action<IService>[]>(() => {
    return [
      {
        label: t('actions.edit'),
        onClick: ({ _id }) => router.push(`services/edit/${_id}`),
      },
      {
        label: t('actions.delete'),
        onClick: ({ _id }) => handleDeleteService(_id),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
            <span className="HeaderHeading">
              {t('servicespage.services_overview')}
            </span>
            <br />
            <span className="HeaderDate">
              {t('servicespage.search_for_services')}
            </span>
          </Grid>
          <Grid item xs={4} justifyContent={'end'} display="flex">
            <ActionButton
              isPrimary
              onClick={() => router.push('/services/add')}
              label={t('new_service')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Table
        showRowCount
        rows={curretServices}
        columns={tableColumns}
        rowActions={rowActions}
        searchFieldPlaceholder={t('servicespage.search_for_services')}
        onRowClick={(e) => router.push(`/services/edit/${e._id}`)}
      />
    </View>
  );
};

export default Services;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
