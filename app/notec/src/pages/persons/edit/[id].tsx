import View from "@/components/View";
import { useRouter } from "next/router";
import styles from "../styles.module.sass";
import PersonCard from "@/components/Profile/PersonCard";
import { useEffect, useState } from "react";
import { personsUrl } from "@/utils/api/urls";
import { IPerson } from "@/types/Person";
import { useFetchStore } from "@/stores/useFetchStore";

export default function Page() {
  const { query } = useRouter();

  const { fetch } = useFetchStore();

  const personId = query.id as string;

  const { PersonView } = styles;

  const [person, setPerson] = useState<IPerson>();

  useEffect(() => {
    (async () => {
      const persons = await fetch(personsUrl(personId));
      persons && setPerson(persons);
    })();
  }, [personId, fetch]);

  const { first_name, last_name, email, phone_number } = person ?? {};

  return (
    <View className={PersonView}>
      {first_name && last_name ? (
        <PersonCard
          first_name={first_name}
          last_name={last_name}
          email={email}
          phone_number={phone_number}
        />
      ) : (
        <span>No user found!</span>
      )}
    </View>
  );
}
