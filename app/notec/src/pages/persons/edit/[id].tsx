import View from "@/components/View";
import { useRouter } from "next/router";
import styles from "../styles.module.sass";
import PersonCard from "@/components/Profile/PersonCard";
import { useEffect, useState } from "react";
import { personsUrl, updatePersonUrl } from "@/utils/api/urls";
import { IPerson } from "@/types/Person";
import { useFetchStore, useUpdateStore } from "@/stores/useRequestStore";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, TextField, Stack, Button, Typography, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
};

export default function Page() {
  const { query } = useRouter();

  const { fetch } = useFetchStore();
  const { update } = useUpdateStore();

  const personId = query.id as string;

  const { PersonView } = styles;

  const [person, setPerson] = useState<IPerson>();

  const { first_name, last_name, email, phone_number } = person ?? {};

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      first_name: first_name ?? "",
      last_name: last_name ?? "",
      phone_number: phone_number ?? "",
      email: email ?? "",
    },
  });

  useEffect(() => {
    (async () => {
      const person = await fetch(personsUrl(personId));
      if (person) {
        setPerson(person);
        setValue("first_name", person.first_name);
        setValue("last_name", person.last_name);
        setValue("email", person.email);
        setValue("phone_number", person.phone_number);
      }
    })();
  }, [personId, fetch, setValue]);

  const onUpdate = async (data: FormValues) => {
    const updatedPerson = await update(updatePersonUrl(personId), data);
    updatedPerson && setPerson(updatedPerson);
    const person = await fetch(personsUrl(personId));
    if (person) {
      setPerson(person);
      setValue("first_name", person.first_name);
      setValue("last_name", person.last_name);
      setValue("email", person.email);
      setValue("phone_number", person.phone_number);

      toast.success("Oseba uspešno posodobljena.");
    } else {
      toast.error("Napaka pri posodabljanju osebe.");
    }
  };

  return (
    <View
      className={PersonView}
      fullWidth
    >
      <Breadcrumbs
        ignoreLastItem
        values={["Cenik", "Urejanje"]}
      />

      <Typography variant="h4">
        Urejanje osebe - {first_name} {last_name}
      </Typography>
      {first_name && last_name ? (
        <PersonCard
          first_name={first_name}
          last_name={last_name}
          email={email}
          phone_number={phone_number}
        />
      ) : (
        <span>Oseba ni najdena!</span>
      )}

      <Box sx={{ mt: 1 }}>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
          >
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xs={6}
              >
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
              <Grid
                item
                xs={6}
              >
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
              <Grid
                item
                xs={6}
              >
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      label="Tel. št"
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      label="Email"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Posodobi
            </Button>
          </Stack>
        </form>
      </Box>
    </View>
  );
}
