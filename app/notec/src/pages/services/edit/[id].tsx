import View from "@/components/View";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { servicesUrl } from "@/utils/api/urls";
import { fetchData } from "@/utils/api/fetch";
import { IService } from "@/types/Service";

export default function Page() {
  const { query } = useRouter();

  const serviceId = query.id as string;

  const [service, setPerson] = useState<IService>();

  useEffect(() => {
    (async () => {
      const persons = await fetchData(servicesUrl(serviceId));
      persons && setPerson(persons);
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
}
