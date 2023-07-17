import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import {
  CalendarMonth,
  ModeEdit,
  Person,
  QueryBuilder,
} from "@mui/icons-material";
import { postData } from "@/utils/api/post";
import {
  createAppointmentUrl,
  personsUrl,
  servicesUrl,
} from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { MenuItem, Select } from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import { fetchData } from "@/utils/api/fetch";
import { IPerson } from "@/types/Person";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { IService } from "@/types/Service";
import Breadcrumbs from "@/components/Breadcrumbs";

type FormProps = {
  person_id: string;
  date: string;
  time: string;
  service_id: string;
};

interface QueryProps extends ParsedUrlQuery {
  [key: string]: string;
}

const CreateAppointmentForm = () => {
  const router = useRouter();

  const query = router.query as QueryProps;

  const { FormGroup, FormContainer, FormInput, FormButton } = styles;

  const [currentPersons, setPersons] = useState<IPerson[]>();
  const [currentServices, setServices] = useState<IService[]>();

  const { control, handleSubmit, setValue } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    console.log(data);
    const response = await postData(createAppointmentUrl(), data);
    if (response?.ok) {
      console.log(await response.json());
      toast.success("Person appointment successfully created");
      router.push("/appointments");
    } else return toast.error("Napaka!");
  };

  useEffect(() => {
    (async () => {
      const persons = await fetchData(personsUrl());
      persons && setPersons(persons);
    })();

    (async () => {
      const services = await fetchData(servicesUrl());
      services && setServices(services);
    })();
  }, []);

  useEffect(() => {
    query.time &&
      setValue(
        "time",
        moment(query.time, "YYYY-MM-DDTHH:mm:ss Z").format("HH:mm")
      );
    query.date && setValue("date", query.date);
  }, [query, setValue]);

  return (
    <div className={FormContainer}>
      <Breadcrumbs depth={2} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={FormGroup}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <>
                  <CalendarMonth />
                  <DatePicker
                    {...field}
                    value={
                      field.value ? moment(field.value, "YYYY-MM-DD") : null
                    }
                    onChange={(date: moment.Moment | null) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }}
                    format="DD.MM.YYYY"
                    slotProps={{ textField: { variant: "standard" } }}
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
                    value={field.value ? moment(field.value, "HH:mm") : null}
                    onChange={(time: moment.Moment | null) => {
                      field.onChange(time ? time.format("HH:mm") : "");
                    }}
                    slotProps={{
                      textField: { variant: "standard" },
                    }}
                    format={"HH:mm"}
                    views={["hours", "minutes"]}
                    ampm={false}
                  />
                </>
              )}
            />
          </LocalizationProvider>
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
                {currentServices?.length &&
                  currentServices.map((service: IService, index) => (
                    <MenuItem
                      key={index}
                      value={service?._id}
                    >
                      {service.service}
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
                {currentPersons?.length &&
                  currentPersons.map((person: IPerson, index) => (
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
  );
};

export default CreateAppointmentForm;