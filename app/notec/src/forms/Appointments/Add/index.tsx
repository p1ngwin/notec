import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import { createAppointmentUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Box, FormControl, MenuItem, Select, Stack } from "@mui/material";
import { IPerson } from "@/types/Person";
import { IService } from "@/types/Service";
import { QueryProps } from "@/types/general";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { parseDateTime } from "@/utils/helpers/utils";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { usePostStore } from "@/stores/useRequestStore";

type FormProps = {
  person_id: string;
  date: string;
  time: string;
  service_id: string;
};

type Props = {
  persons: IPerson[];
  services: IService[];
};

const CreateAppointmentForm = ({ persons, services }: Props) => {
  const router = useRouter();

  const { post } = usePostStore();

  const query = router.query as QueryProps;

  const { time, date } = query ?? {};

  const { FormGroup, FormContainer, FormInput, FormButton } = styles;

  const { control, handleSubmit, reset } = useForm<FormProps>({
    defaultValues: {
      date: parseDateTime(),
      time: parseDateTime(),
      person_id: "",
      service_id: "",
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={FormContainer}>
        <h2>Novo naročilo</h2>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                            variant: "standard",
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
                            variant: "standard",
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
                  render={({ field }) => (
                    <FormControl>
                      <Select
                        {...field}
                        variant="standard"
                        placeholder="Storitev"
                        onChange={(event) => field.onChange(event.target.value)}
                      >
                        {services?.length &&
                          services.map((service: IService, index) => (
                            <MenuItem
                              key={index}
                              value={service?._id}
                            >
                              {service.service}
                              <i> ({service.price} €)</i>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="person_id"
                  control={control}
                  rules={{ required: "Prosimo izberite osebo" }}
                  render={({ field }) => (
                    <FormControl>
                      <Select
                        {...field}
                        variant="standard"
                        placeholder="Oseba"
                        onChange={(event) => field.onChange(event.target.value)}
                      >
                        {persons?.length &&
                          persons.map((person: IPerson, index) => (
                            <MenuItem
                              key={index}
                              value={person?._id}
                            >
                              {person?.first_name} {person?.last_name}
                            </MenuItem>
                          ))}
                      </Select>
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
