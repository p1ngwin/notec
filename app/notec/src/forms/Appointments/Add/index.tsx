import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import {
  CalendarMonth,
  ModeEdit,
  Person,
  QueryBuilder,
} from "@mui/icons-material";
import { postData } from "@/utils/api/post";
import { createAppointmentUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { MenuItem, Select } from "@mui/material";
import { IPerson } from "@/types/Person";
import { IService } from "@/types/Service";
import { QueryProps } from "@/types/general";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { parseDateTime } from "@/utils/helpers/utils";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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

  const query = router.query as QueryProps;

  const { time, date } = query ?? {};

  const { FormGroup, FormContainer, FormInput, FormButton, Form } = styles;

  const { control, handleSubmit, reset } = useForm<FormProps>({
    defaultValues: {
      date: parseDateTime(),
      time: parseDateTime(),
    },
  });

  useEffect(() => {
    reset({ date: parseDateTime(date), time: parseDateTime(time) });
  }, [date, time, reset]);

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await postData(createAppointmentUrl(), data);
    if (response?.ok) {
      toast.success("Naročilo uspešno dodano.");
      router.push("/appointments");
    } else toast.error("Napaka!");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={FormContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={Form}
        >
          <div className={FormGroup}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <>
                  <CalendarMonth />
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
              render={({ field }) => (
                <>
                  <QueryBuilder />
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
                </>
              )}
            />
          </div>

          <div className={FormGroup}>
            <ModeEdit />
            <Controller
              name="service_id"
              control={control}
              rules={{ required: "Prosimo izberite storitev." }}
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue=""
                  className={FormInput}
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
              )}
            />
            <Person />
            <Controller
              name="person_id"
              control={control}
              rules={{ required: "Prosimo izberite osebo" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className={FormInput}
                  placeholder="Oseba"
                  defaultValue=""
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
              )}
            />
          </div>
          <div className={FormGroup}>
            <input
              type="submit"
              value="Create"
              className={FormButton}
            />
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default CreateAppointmentForm;
