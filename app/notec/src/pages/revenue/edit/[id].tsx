import View from "@/components/View";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { servicesUrl } from "@/utils/api/urls";
import { fetchData } from "@/utils/api/fetch";
import { IService } from "@/types/Service";

const ServicesEdit = () => {
  const { query } = useRouter();

  const serviceId = query.id as string;

  const [service, setPerson] = useState<IService>();

  useEffect(() => {
    (async () => {
      const services = await fetchData(servicesUrl(serviceId));
      services && setPerson(services);
    })();
  }, [serviceId]);

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
