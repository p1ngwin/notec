import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import AddPersonForm from "@/forms/Persons/Add";

const AddPerson = () => {
  return (
    <>
      <HeaderActions>
        <Breadcrumbs
          depth={2}
          values={["Stranke", "Nova stranka"]}
        />
      </HeaderActions>
      <AddPersonForm />
    </>
  );
};
export default AddPerson;
