import { IPerson } from "@/types/person/Person";
import { fetchData } from "@/utils/api/fetch";
import { useEffect, useState } from "react";

const Persons = () => {
  const [persons, setPersons] = useState<IPerson[]>();

  console.log("in persons component now");

  useEffect(() => {
    fetchData("http://localhost:8000/persons/all")
      .then((res) => res.json())
      .then((data) => setPersons(data));
  }, []);

  return (
    <>
      <ul>
        {persons?.map((person) => (
          <li key={person.id}>
            {person.first_name} {person.last_name}{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
