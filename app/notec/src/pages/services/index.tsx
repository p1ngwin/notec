import Breadcrumbs from '@/components/Breadcrumbs';
import Table, { Action, Column } from '@/components/DataTable';
import HeaderActions from '@/components/HeaderActions';
import View from '@/components/View';
import { IService } from '@/types/Service';
import { servicesDeleteUrl, servicesUrl } from '@/utils/api/urls';
import { Button, Container, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useFetchStore, useDeleteStore } from '@/stores/useRequestStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const Services = () => {
  const router = useRouter();

  const { fetch } = useFetchStore();
  const { _delete } = useDeleteStore();

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
        loading: 'Deleting person...',
        success: 'Successfully deleted person',
        error: 'Failed to delete person',
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
    { label: 'Naziv storitve', field: 'service', renderCell: (i) => i.service },
    {
      label: 'Cena',
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
        label: 'Edit',
        onClick: ({ _id }) => router.push(`services/edit/${_id}`),
      },
      { label: 'Delete', onClick: ({ _id }) => handleDeleteService(_id) },
    ];
  }, [router]);

  return (
    <View fullWidth>
      <Container maxWidth="lg">
        <HeaderActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Breadcrumbs depth={1} values={['Cenik']} />
            <Button onClick={() => router.push('/services/add')}>
              Dodaj <AddIcon />
            </Button>
          </Stack>
        </HeaderActions>
        <Table
          showRowCount
          rows={curretServices}
          columns={tableColumns}
          rowActions={rowActions}
        />
      </Container>
    </View>
  );
};

export default Services;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
