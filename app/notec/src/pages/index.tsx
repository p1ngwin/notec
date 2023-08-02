import { useState } from "react";
import { Grid, Container, Typography, Divider } from "@mui/material";
import { Person, FactCheck, CreditCard } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { PaperCard } from "@/components/PaperCard";
import dayjs from "dayjs";
import { appointmentsUrl, personsUrl } from "@/utils/api/urls";
import { useRouter } from "next/router";
import { useFetchStore } from "@/stores/useFetchStore";
import Spacer from "@/components/Spacer";

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [appointmentsCount, setAppointmentsCount] = useState();
  const [personCount, setPersonCount] = useState();
  const [expenses, setExpenses] = useState();

  const actions = useFetchStore();

  useEffect(() => {
    (async () => {
      const persons = await actions.fetch(personsUrl());

      const appointments = await actions.fetch(
        appointmentsUrl(
          new URLSearchParams({ dateOnly: dayjs().format("YYYY-MM-DD") })
        )
      );
      setAppointmentsCount(appointments?.length ?? 0);

      setPersonCount(persons?.length ?? 0);

      const expenses = await actions.fetch(personsUrl());
      setExpenses(expenses?.length ?? 0);
    })();
  }, []);

  return (
    <div className="content">
      <Container>
        <Typography variant="h5">Dobrodošli na portalu</Typography>
        <Divider sx={{ m: 2 }} />
        <Grid
          container
          spacing={"1rem"}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex" }}
          >
            <PaperCard
              icon={<FactCheck fontSize={"large"} />}
              onClick={() => router.push("/appointments")}
              title="Število naročil danes:"
              subtitle={dayjs().format("dddd. MM. YYYY").toString()}
              value={appointmentsCount}
              isLoading={actions.isLoading}
              extend
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex" }}
          >
            <PaperCard
              icon={<CreditCard fontSize={"large"} />}
              onClick={() => router.push("/expenses")}
              title="Odhodki / dohodki"
              subtitle={dayjs().format("MMMM. YYYY")}
              value={expenses + "€"}
              isLoading={actions.isLoading}
              extend
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex" }}
          >
            <PaperCard
              onClick={() => router.push("/persons")}
              icon={<Person fontSize={"large"} />}
              title="Stranke"
              subtitle="Število aktivnih strank"
              value={personCount}
              isLoading={actions.isLoading}
              extend
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
