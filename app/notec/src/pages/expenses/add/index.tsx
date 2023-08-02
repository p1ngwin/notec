import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import AddServiceForm from "@/forms/Services/Add";
import { Stack } from "@mui/material";

const AddService = () => {
  return (
    <>
      <HeaderActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Breadcrumbs
            depth={2}
            values={["Cenik", "Nova storitev"]}
          />
        </Stack>
      </HeaderActions>
      <AddServiceForm />
    </>
  );
};
export default AddService;
