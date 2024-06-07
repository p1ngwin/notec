import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import { createAppointmentUrl, personsUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Box, FormControl, Stack, Typography } from "@mui/material";
import { IPerson } from "@/types/Person";
import { IService } from "@/types/Service";
import { QueryProps } from "@/types/general";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { parseDateTime } from "@/utils/helpers/utils";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFetchStore, usePostStore } from "@/stores/useRequestStore";
import { servicesUrl } from "@/utils/api/urls";
import AsyncSelect from "react-select/async";

type FormProps = {
  client_id: string;
  date: string;
  time: string;
  service_id: string[];
};

const CreateAppointmentForm = () => {
  const router = useRouter();

  const { post } = usePostStore();
  const { fetch, isLoading } = useFetchStore();

  const query = router.query as QueryProps;

  const { time, date } = query ?? {};

  const { FormGroup, FormContainer, FormInput, FormButton } = styles;

  const { control, handleSubmit, reset } = useForm<FormProps>({
    defaultValues: {
      date: parseDateTime(),
      time: parseDateTime(),
      client_id: "",
      service_id: [""],
    },
  });

  useEffect(() => {
    reset({ date: parseDateTime(date), time: parseDateTime(time) });
  }, [date, time, reset]);

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await post(createAppointmentUrl(), data);
    if (response?.ok) {
      toast.success("Naročilo uspešno dodano.");
      router.push("/appointments");
    } else toast.error("Napaka!");
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
            item.service.toLowerCase().includes(filterValue.toLowerCase())
          )
        )
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
              item.last_name.toLowerCase().includes(filterValue.toLowerCase())
          )
        )
      );
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Typography
          variant="h4"
          align="center"
        >
          Novo naročilo
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={FormContainer}
          >
            <div className={FormGroup}>
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
                        className={FormInput}
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
                        className={FormInput}
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
                        className="AsyncPrimary"
                        placeholder="Izberite storitev"
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
                  rules={{ required: "Prosimo izberite osebo" }}
                  render={({ ...field }) => (
                    <FormControl>
                      <AsyncSelect<IPerson, false>
                        {...field}
                        className="AsyncPrimary"
                        cacheOptions
                        placeholder="Izberite stranko"
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
                <div className={FormGroup}>
                  <input
                    type="submit"
                    value="Dodaj"
                    className={FormButton}
                  />
                </div>
              </Stack>
            </div>
          </form>
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default CreateAppointmentForm;
