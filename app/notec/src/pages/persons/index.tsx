import { useCallback } from 'react';
import Table, { Action, Column } from '@/components/DataTable';
import View from '@/components/View';
import { IPerson } from '@/types/Person';
import { deletePersonUrl, personsUrl } from '@/utils/api/urls';
import { Grid, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { theme } from '@/assets/styles/theme';
import { useDeleteStore, useFetchStore } from '@/stores/useRequestStore';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ActionButton from '@/components/ActionButton';
import { useTranslation } from 'next-i18next';

const Appointments = () => {
  const router = useRouter();

  const [currentPersons, setPersons] = useState<IPerson[]>([]);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { fetch } = useFetchStore();
  const { _delete } = useDeleteStore();

  const { t } = useTranslation();

  const handleDeletePerson = useCallback(
    async (id: string) => {
      if (!id) return;

      toast.promise(
        _delete(deletePersonUrl(id), {
          id,
        }).then(() => {
          fetch(personsUrl()).then((persons) => {
            persons && setPersons(persons);
          });
        }),
        {
          loading: 'Deleting person...',
          success: 'Successfully deleted person',
          error: 'Failed to delete person',
        },
      );
    },
    [setPersons, _delete, fetch],
  );

  useEffect(() => {
    (async () => {
      const persons = await fetch(personsUrl());
      persons && setPersons(persons);
    })();
  }, [fetch]);

  const EMPTY_CELL = <span>/</span>;

  const tableColumns: Column<IPerson>[] = [
    {
      label: t('first_name'),
      field: 'first_name',
      renderCell: (i) => i.first_name,
    },
    {
      label: t('last_name'),
      field: 'last_name',
      renderCell: (i) => i.last_name,
    },
    {
      label: t('phone_number'),
      field: 'phone_number',
      renderCell: (i) => i.phone_number ?? EMPTY_CELL,
    },
    {
      label: t('email'),
      field: 'email',
      renderCell: (i) => i.email ?? EMPTY_CELL,
    },
  ];

  const rowActions = useMemo<Action<IPerson>[]>(() => {
    return [
      {
        label: t('actions.edit'),
        onClick: ({ _id }) => router.push(`persons/edit/${_id}`),
      },
      {
        label: t('actions.delete'),
        onClick: ({ _id }) => handleDeletePerson(_id),
      },
    ];
  }, [router, handleDeletePerson, t]);

  return (
    <View fullWidth direction="column">
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
              {t('clientpage.client_overview')}
            </span>
            <br />
            <span className="HeaderDate">
              {t('clientpage.view_manage_clients')}
            </span>
          </Grid>
          <Grid item xs={4} justifyContent={'end'} display="flex">
            <ActionButton
              isPrimary
              onClick={() => router.push('/persons/add')}
              label={t('new_client')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Table
            showRowCount={!isMobile}
            rows={currentPersons}
            columns={tableColumns}
            rowActions={rowActions}
            searchFieldPlaceholder={t('clientpage.search_for_clients')}
            onRowClick={(e) => {
              router.push(`/persons/edit/${e._id}`);
            }}
          />
        </Grid>
      </Grid>
    </View>
  );
};

export default Appointments;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
