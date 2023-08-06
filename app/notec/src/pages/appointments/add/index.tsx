import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import CreateAppointmentForm from "@/forms/Appointments/Add";
import { useFetchStore } from "@/stores/useRequestStore";
import { IPerson } from "@/types/Person";
import { IService } from "@/types/Service";
import { personsUrl, servicesUrl } from "@/utils/api/urls";
import { useEffect, useState } from "react";

const CreateAppointment = () => {
  const [currentPersons, setPersons] = useState<IPerson[]>([]);
  const [currentServices, setServices] = useState<IService[]>([]);

  const { fetch } = useFetchStore();

  useEffect(() => {
    (async () => {
      const persons = await fetch(personsUrl());
      persons && setPersons(persons);
    })();

    (async () => {
      const services = await fetch(servicesUrl());
      services && setServices(services);
    })();
  }, [fetch]);

  return (
    <>
      <HeaderActions>
        <Breadcrumbs
          depth={2}
          values={["Naročila", "Novo naročilo"]}
        />
      </HeaderActions>
      <CreateAppointmentForm
        persons={currentPersons}
        services={currentServices}
      />
    </>
  );
};
export default CreateAppointment;
