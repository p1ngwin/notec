import { IPerson } from "@/types/person/Person";
import { useState } from "react";

const Appointments = () => {
  const [persons, setPersons] = useState<IPerson[]>();

  return (
    <>
      <h1>Appointments section</h1>
    </>
  );
};

export default Appointments;
