import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import AddServiceForm from "@/forms/Services/Add";

const AddService = () => {
  return (
    <>
      <HeaderActions>
        <Breadcrumbs
          depth={2}
          values={["Cenik", "Nova storitev"]}
        />
      </HeaderActions>
      <AddServiceForm />
    </>
  );
};
export default AddService;