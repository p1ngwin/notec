import View from "@/components/View";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { servicesUrl } from "@/utils/api/urls";
import { IService } from "@/types/Service";
import { useFetchStore } from "@/stores/useRequestStore";

const ServicesEdit = () => {
  const { query } = useRouter();

  const { fetch } = useFetchStore();

  const serviceId = query.id as string;

  const [service, setPerson] = useState<IService>();

  useEffect(() => {
    (async () => {
      const services = await fetch(servicesUrl(serviceId));
      services && setPerson(services);
    })();
  }, [serviceId, fetch]);

  const { service: service_name, price } = service ?? {};

  return (
    <View>
      <div>
        {service_name}
        <br />
        {price} €
      </div>
    </View>
  );
};

export default ServicesEdit;
