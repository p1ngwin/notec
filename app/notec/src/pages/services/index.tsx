import Breadcrumbs from "@/components/Breadcrumbs";
import Table, { Action, Column } from "@/components/DataTable";
import HeaderActions from "@/components/HeaderActions";
import View from "@/components/View";
import { IService } from "@/types/Service";
import { deleteData } from "@/utils/api/delete";
import { fetchData } from "@/utils/api/fetch";
import { servicesDeleteUrl, servicesUrl } from "@/utils/api/urls";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const Services = () => {
  const router = useRouter();

  const [curretServices, setServices] = useState<IService[]>([]);

  const handleDeleteService = async (id: string) => {
    if (!id) return toast.error("Missing person id.");

    toast.promise(
      deleteData(servicesDeleteUrl(id), {
        id: id,
      }).then(() => {
        fetchData(servicesUrl()).then((services) => {
          services && setServices(services);
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
      const services = await fetchData(servicesUrl());
      services && setServices(services);
    })();
  }, []);

  const tableColumns: Column<IService>[] = [
    { label: "Naziv storitve", field: "service", renderCell: (i) => i.service },
    {
      label: "Cena",
      field: "price",
      renderCell: (i) => (
        <span>
          <b>{i.price} €</b>
        </span>
      ),
    },
  ];

  const rowActions = useMemo<Action<IService>[]>(() => {
    return [
      {
        label: "Edit",
        onClick: ({ _id }) => router.push(`services/edit/${_id}`),
      },
      { label: "Delete", onClick: ({ _id }) => handleDeleteService(_id) },
    ];
  }, [router]);

  return (
    <View fullWidth>
      <HeaderActions>
        <Breadcrumbs
          depth={1}
          values={["Cenik"]}
        />
        <Button onClick={() => router.push("/services/add")}>
          Dodaj storitev
        </Button>
      </HeaderActions>
      <Table
        showRowCount
        rows={curretServices}
        columns={tableColumns}
        rowActions={rowActions}
      />
    </View>
  );
};

export default Services;
