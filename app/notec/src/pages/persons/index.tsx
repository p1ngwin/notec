import Breadcrumbs from "@/components/Breadcrumbs";
import Table, { Action, Column } from "@/components/DataTable";
import HeaderActions from "@/components/HeaderActions";
import View from "@/components/View";
import { IPerson } from "@/types/Person";
import { deleteData } from "@/utils/api/delete";
import { fetchData } from "@/utils/api/fetch";
import { deletePersonUrl, personsUrl } from "@/utils/api/urls";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const Appointments = () => {
  const router = useRouter();

  const [currentPersons, setPersons] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeletePerson = async (id: string) => {
    if (!id) return;

    toast.promise(
      deleteData(deletePersonUrl(), {
        id: id,
      }).then(() => {
        fetchData(personsUrl()).then((persons) => {
          persons && setPersons(persons);
        });
      }),
      {
        loading: "Deleting person...",
        success: "Successfully deleted person",
        error: "Failed to delete person",
      }
    );
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const persons = await fetchData(personsUrl());
      persons && setPersons(persons);
      setIsLoading(false);
    })();
  }, []);

  const EMPTY_CELL = <span>/</span>;

  const tableColumns: Column<IPerson>[] = [
    { label: "Ime", field: "first_name", renderCell: (i) => i.first_name },
    { label: "Priimek", field: "last_name", renderCell: (i) => i.last_name },
    {
      label: "Tel. št.",
      field: "phone_number",
      renderCell: (i) => i.phone_number ?? EMPTY_CELL,
    },
    {
      label: "Email",
      field: "email",
      renderCell: (i) => i.email ?? EMPTY_CELL,
    },
  ];

  const rowActions = useMemo<Action<IPerson>[]>(() => {
    return [
      { label: "Edit", onClick: ({ _id }) => router.push(`persons/${_id}`) },
      { label: "Delete", onClick: ({ _id }) => handleDeletePerson(_id) },
    ];
  }, [router]);

  return (
    <View fullWidth>
      <HeaderActions>
        <Breadcrumbs depth={1} values={["Stranke"]}/>
        <Button onClick={() => router.push("/persons/add")}>ADD</Button>
      </HeaderActions>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table
          showRowCount
          rows={currentPersons}
          columns={tableColumns}
          rowActions={rowActions}
        />
      )}
    </View>
  );
};

export default Appointments;
