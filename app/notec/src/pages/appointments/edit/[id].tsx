import View from "@/components/View";
import { useRouter } from "next/router";
import styles from "../styles.module.sass";
import AsyncSelect from "react-select/async";
import React, { useEffect, useState } from "react";
import {
  appointmentsUrl,
  deleteAppointmentUrl,
  personsUrl,
  servicesUrl,
  updateAppointmentUrl,
} from "@/utils/api/urls";
import { IPerson } from "@/types/Person";
import {
  useDeleteStore,
  useFetchStore,
  useUpdateStore,
} from "@/stores/useRequestStore";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Stack, Typography, FormControl, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { IAppointment } from "@/types/Appointment";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { IService } from "@/types/Service";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDate, formatTime, parseDateTime } from "@/utils/helpers/utils";

type FormValues = {
  person_id: string;
  date: string;
  time: string;
  service_id: string[];
};

export default function Page() {
  const router = useRouter();
  const { query } = router;

  const appointmentId = query.id as string;

  const { fetch, isLoading } = useFetchStore();
  const { update } = useUpdateStore();
  const { _delete } = useDeleteStore();

  const { PersonView } = styles;

  const [currentAppointment, setAppointment] = useState<IAppointment>();

  const { service_id, person_id, date, time } = currentAppointment ?? {};

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      date: parseDateTime(date),
      time: parseDateTime(time),
      person_id: person_id,
      service_id: service_id,
    },
  });

  const fetchServices = async () => {
    const services = await fetch(servicesUrl());
    if (services) {
      return services;
    }
  };

  useEffect(() => {
    (async () => {
      const appointment = await fetch(
        appointmentsUrl(new URLSearchParams({ id: appointmentId }))
      );
      if (appointment) {
        setAppointment(appointment[0]);
        reset({
          ...appointment,
          time: parseDateTime(appointment[0].time),
          date: parseDateTime(appointment[0].date),
        });
      }
    })();
  }, [appointmentId, fetch, reset]);

  const onUpdate = async (data: FormValues) => {
    const updatedAppointment = await update(
      updateAppointmentUrl(appointmentId),
      data
    );
    updatedAppointment && setAppointment(updatedAppointment);
    const appointment = await fetch(
      appointmentsUrl(new URLSearchParams({ id: appointmentId }))
    );
    if (appointment) {
      setAppointment(appointment);
      reset(appointment);

      toast.success("Oseba uspešno posodobljena.");
    } else {
      toast.error("Napaka pri posodabljanju osebe.");
    }
  };

  const handleOnDeleteClick = async () => {
    const deletedAppointment = await _delete(
      deleteAppointmentUrl(appointmentId),
      { id: appointmentId }
    );

    if (deletedAppointment) {
      toast.success("Naročilo uspešno izbrisano");
      router.push("/appointments");
    }
  };

  const serviceOptions = (): Promise<IService[]> =>
    new Promise((resolve) => {
      resolve(fetchServices());
    });

  const personOptions = (): Promise<IPerson[]> =>
    new Promise((resolve) => {
      resolve(fetch(personsUrl()));
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <View
        className={PersonView}
        fullWidth
      >
        <Breadcrumbs
          ignoreLastItem
          values={["Naročilo", "Urejanje"]}
        />
        <Typography variant="h4">
          Urejanje naročila - {currentAppointment?.first_name}{" "}
          {currentAppointment?.last_name} -{" "}
          {formatDate(currentAppointment?.date)} ob ,{" "}
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
                  rules={{ required: "Prosimo izberite storitev." }}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        format="dddd, DD. MMMM YYYY"
                        onChange={(date) => field.onChange(date!)}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                          },
                        }}
                      />
                    </>
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "Prosimo izberite čas" }}
                  render={({ field }) => (
                    <FormControl>
                      <TimePicker
                        {...field}
                        onChange={(date) => field.onChange(date!)}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            placeholder: dayjs().format("HH:mm"),
                          },
                        }}
                        views={["hours", "minutes"]}
                        ampm={false}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="service_id"
                  control={control}
                  rules={{ required: "Prosimo izberite osebo" }}
                  render={({ ...field }) => (
                    <FormControl>
                      <AsyncSelect<IService, true>
                        {...field}
                        cacheOptions
                        placeholder={currentAppointment?.service}
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
                  name="person_id"
                  control={control}
                  rules={{ required: "Prosimo izberite osebo" }}
                  render={({ ...field }) => (
                    <FormControl>
                      <AsyncSelect<IPerson, false>
                        {...field}
                        placeholder={`${currentAppointment?.first_name} ${currentAppointment?.last_name}`}
                        className="AsyncPrimary"
                        cacheOptions
                        loadOptions={personOptions}
                        defaultOptions
                        getOptionLabel={(person) =>
                          `${person.first_name} ${person.last_name}`
                        }
                        getOptionValue={(opt) => opt._id}
                        onChange={(value) =>
                          field.field.onChange(value?._id || "")
                        }
                        isLoading={isLoading}
                      />
                    </FormControl>
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Posodobi
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOnDeleteClick}
                >
                  Izbriši naročilo
                </Button>
              </Stack>
            </div>
          </form>
        </Box>
      </View>
    </LocalizationProvider>
  );
}
