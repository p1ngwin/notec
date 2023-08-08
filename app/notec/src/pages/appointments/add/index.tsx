import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import CreateAppointmentForm from "@/forms/Appointments/Add";

const CreateAppointment = () => {
  return (
    <>
      <HeaderActions>
        <Breadcrumbs
          depth={2}
          values={["Naročila", "Novo naročilo"]}
        />
      </HeaderActions>
      <CreateAppointmentForm />
    </>
  );
};
export default CreateAppointment;
