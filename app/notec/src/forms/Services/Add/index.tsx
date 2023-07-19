import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import { Person } from "@mui/icons-material";
import { postData } from "@/utils/api/post";
import { servicesCreateUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Input } from "@mui/material";
import { AddBusiness } from "@mui/icons-material";

type FormProps = {
  service: string;
  price: number;
};

const AddServiceForm = () => {
  const router = useRouter();

  const { FormGroup, FormContainer, FormInput, FormButton } = styles;

  const { control, handleSubmit } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await postData(servicesCreateUrl(), data);
    if (response?.ok) {
      toast.success("Person successfully added!");
      router.push("/persons");
    }
  };

  return (
    <div className={FormContainer}>
      <h2>Stranka</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={FormGroup}>
          <AddBusiness />
          <Controller
            name="service"
            control={control}
            rules={{ required: "Prosimo izberite storitev." }}
            render={({ field }) => (
              <Input
                {...field}
                className={FormInput}
              />
            )}
          />
          <Person />
          <Controller
            name="price"
            control={control}
            rules={{ required: "Prosimo izberite osebo" }}
            render={({ field }) => (
              <Input
                {...field}
                className={FormInput}
              />
            )}
          />
        </div>
        <div className={FormGroup}>
          <input
            type="submit"
            value="Add"
            className={FormButton}
          />
        </div>
      </form>
    </div>
  );
};

export default AddServiceForm;
