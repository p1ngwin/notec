import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import CreateAppointmentForm from "@/forms/Appointments/Add";
import { IPerson } from "@/types/Person";
import { IService } from "@/types/Service";
import { fetchData } from "@/utils/api/fetch";
import { personsUrl, servicesUrl } from "@/utils/api/urls";
import { useEffect, useState } from "react";

const CreateAppointment = () => {
  const [currentPersons, setPersons] = useState<IPerson[]>([]);
  const [currentServices, setServices] = useState<IService[]>([]);

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
