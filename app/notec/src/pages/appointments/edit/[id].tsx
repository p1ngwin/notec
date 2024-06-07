import View from '@/components/View';
import { useRouter } from 'next/router';
import styles from '../styles.module.sass';
import AsyncSelect from 'react-select/async';
import React, { useEffect, useState } from 'react';
import {
  appointmentsUrl,
  deleteAppointmentUrl,
  personsUrl,
  servicesUrl,
  updateAppointmentUrl,
} from '@/utils/api/urls';
import { IPerson } from '@/types/Person';
import {
  useDeleteStore,
  useFetchStore,
  useUpdateStore,
} from '@/stores/useRequestStore';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Box, Stack, Typography, FormControl, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { IAppointment } from '@/types/Appointment';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { IService } from '@/types/Service';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatDate, formatTime, parseDateTime } from '@/utils/helpers/utils';
import { useTranslation } from 'next-i18next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type FormValues = {
  client_id: string;
  date: string;
  time: string;
  service_id: string[];
};

export default function Page() {
  const router = useRouter();
  const { query } = router;

  const appointmentId = query.id as string;

  const { t } = useTranslation();

  const { fetch, isLoading } = useFetchStore();
  const { update } = useUpdateStore();
  const { _delete } = useDeleteStore();

  const { PersonView } = styles;

  const [currentAppointment, setAppointment] = useState<IAppointment>();

  const { service_id, client_id, date, time } = currentAppointment ?? {};

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      date: parseDateTime(date),
      time: parseDateTime(time),
      client_id: client_id,
      service_id: service_id,
    },
  });

  useEffect(() => {
    (async () => {
      const appointment = await fetch(
        appointmentsUrl(new URLSearchParams({ id: appointmentId })),
      );
      if (appointment) {
        setAppointment(appointment[0]);
        reset(appointment);
      }
    })();
  }, [appointmentId, fetch, reset]);

  const onUpdate = async (data: FormValues) => {
    const updatedAppointment = await update(
      updateAppointmentUrl(appointmentId),
      data,
    );
    updatedAppointment && setAppointment(updatedAppointment);
    const appointment = await fetch(
      appointmentsUrl(new URLSearchParams({ id: appointmentId })),
    );
    if (appointment) {
      setAppointment(appointment);
      reset(appointment);

      toast.success('Oseba uspešno posodobljena.');
    } else {
      toast.error('Napaka pri posodabljanju osebe.');
    }
  };

  const handleOnDeleteClick = async () => {
    const deletedAppointment = await _delete(
      deleteAppointmentUrl(appointmentId),
      { id: appointmentId },
    );

    if (deletedAppointment) {
      toast.success('Naročilo uspešno izbrisano');
      router.push('/appointments');
    }
  };

  const fetchServices = async () => {
    const services = await fetch(servicesUrl());
    if (services) {
      return services;
    }
  };

  const fetchPersons = async () => {
    const services = await fetch(personsUrl());
    if (services) {
      return services;
    }
  };

  const serviceOptions = (filterValue: string): Promise<IService[]> =>
    new Promise((resolve) => {
      resolve(
        fetchServices().then((res) =>
          res.filter((item: IService) =>
            item.service.toLowerCase().includes(filterValue.toLowerCase()),
          ),
        ),
      );
    });

  const personOptions = (filterValue: string): Promise<IPerson[]> =>
    new Promise((resolve) => {
      resolve(
        fetchPersons().then((res) =>
          res.filter(
            (item: IPerson) =>
              item.first_name
                .toLowerCase()
                .includes(filterValue.toLowerCase()) ||
              item.last_name.toLowerCase().includes(filterValue.toLowerCase()),
          ),
        ),
      );
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <View className={PersonView} fullWidth>
        <Breadcrumbs ignoreLastItem values={['Naročilo', 'Urejanje']} />
        <Typography variant="h6">
          {currentAppointment?.first_name} {currentAppointment?.last_name} -{' '}
          {formatDate(currentAppointment?.date)},{' '}
          {formatTime(currentAppointment?.time)}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onUpdate)}>
            <div>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent="center"
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        format="dddd, DD. MMMM YYYY"
                        onChange={(date) => field.onChange(date!)}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                          },
                        }}
                      />
                    </>
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <TimePicker
                        {...field}
                        onChange={(date) => field.onChange(date!)}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            placeholder: dayjs().format('HH:mm'),
                          },
                        }}
                        views={['hours', 'minutes']}
                        ampm={false}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="service_id"
                  control={control}
                  render={({ ...field }) => (
                    <FormControl>
                      <AsyncSelect<IService, true>
                        {...field}
                        cacheOptions
                        placeholder="Izberite storitve"
                        className="AsyncPrimary"
                        loadOptions={serviceOptions}
                        isMulti
                        defaultOptions
                        getOptionLabel={(opt) =>
                          `${opt.service} - (${opt.price}€)`
                        }
                        getOptionValue={(opt) => opt._id}
                        onChange={(value) => {
                          field.field.onChange(value.map((val) => val._id));
                        }}
                        isLoading={isLoading}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="client_id"
                  control={control}
                  rules={{ required: 'Prosimo izberite osebo' }}
                  render={({ ...field }) => (
                    <FormControl>
                      <AsyncSelect<IPerson, false>
                        className="AsyncPrimary"
                        cacheOptions
                        loadOptions={personOptions}
                        placeholder="Izberite stranko"
                        defaultOptions
                        getOptionLabel={(person) =>
                          `${person.first_name} ${person.last_name}`
                        }
                        getOptionValue={(opt) => opt._id}
                        onChange={(value) =>
                          field.field.onChange(value?._id || '')
                        }
                        isLoading={isLoading}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
                <Button type="submit" variant="contained" color="primary">
                  {t('actions.update')}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOnDeleteClick}
                >
                  {t('appointments.delete')}
                </Button>
              </Stack>
            </div>
          </form>
        </Box>
      </View>
    </LocalizationProvider>
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
