import View from "@/components/View";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { servicesUpdateUrl, servicesUrl } from "@/utils/api/urls";
import { IService } from "@/types/Service";
import { useFetchStore, useUpdateStore } from "@/stores/useRequestStore";
import { Controller, useForm } from "react-hook-form";
import { Box, Stack, TextField, Button } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import toast from "react-hot-toast";

type FormProps = {
  service: string;
  price: number;
};

const ServicesEdit = () => {
  const { query } = useRouter();

  const { fetch } = useFetchStore();
  const { update } = useUpdateStore();

  const serviceId = query.id as string;

  const [service, setService] = useState<IService>();

  const { control, handleSubmit, setValue } = useForm<FormProps>({
    defaultValues: {
      price: service?.price ?? 0,
      service: service?.service ?? "",
    },
  });

  useEffect(() => {
    (async () => {
      const service = await fetch(servicesUrl(serviceId));
      if (service) {
        setService(service);
        setValue("price", service.price);
        setValue("service", service.service);
      }
    })();
  }, [serviceId, fetch, setValue]);

  const onUpdate = async (data: FormProps) => {
    const updatedService = await update(servicesUpdateUrl(serviceId), data);
    updatedService && setService(updatedService);

    const service = await fetch(servicesUrl(serviceId));
    if (service) {
      setService(service);
      setValue("price", service.price);
      setValue("service", service.service);
      toast.success("Storitev uspešno posodobljena.");
    } else {
      toast.error("Napaka pri posodabljanju storitve.");
    }
  };

  return (
    <View>
      <Breadcrumbs
        ignoreLastItem
        values={["Cenik", "Urejanje"]}
      />
      <h2>
        Urejanje storitve - {service?.service} <i>({service?.price} €)</i>
      </h2>
      <Box sx={{ mt: 1 }}>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
          >
            <Controller
              name="service"
              control={control}
              rules={{ required: "Prosimo izberite storitev." }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Naziv"
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{ required: "Prosimo izberite osebo" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Cena"
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Spremeni
            </Button>
          </Stack>
        </form>
      </Box>
    </View>
  );
};

export default ServicesEdit;
