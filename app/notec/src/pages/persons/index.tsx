import Breadcrumbs from "@/components/Breadcrumbs";
import Table, { Action, Column } from "@/components/DataTable";
import HeaderActions from "@/components/HeaderActions";
import View from "@/components/View";
import { IPerson } from "@/types/Person";
import { deleteData } from "@/utils/api/delete";
import { deletePersonUrl, personsUrl } from "@/utils/api/urls";
import { Button, CircularProgress, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "@/assets/styles/theme";
import { useFetchStore } from "@/stores/useFetchStore";

const Appointments = () => {
  const router = useRouter();

  const [currentPersons, setPersons] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { fetch } = useFetchStore();

  const handleDeletePerson = async (id: string) => {
    if (!id) return;

    toast.promise(
      deleteData(deletePersonUrl(), {
        id,
      }).then(() => {
        fetch(personsUrl()).then((persons) => {
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
      const persons = await fetch(personsUrl());
      persons && setPersons(persons);
      setIsLoading(false);
    })();
  }, [fetch]);

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
      {
        label: "Edit",
        onClick: ({ _id }) => router.push(`persons/edit/${_id}`),
      },
      { label: "Delete", onClick: ({ _id }) => handleDeletePerson(_id) },
    ];
  }, [router]);

  return (
    <View
      fullWidth
      container
    >
      <HeaderActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Breadcrumbs
            depth={1}
            values={["Stranke"]}
          />
          <Button onClick={() => router.push("/persons/add")}>
            Dodaj <AddIcon />
          </Button>
        </Stack>
      </HeaderActions>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table
          showRowCount={!isMobile}
          rows={currentPersons}
          columns={tableColumns}
          rowActions={rowActions}
        />
      )}
    </View>
  );
};

export default Appointments;
