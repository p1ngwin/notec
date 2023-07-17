import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.sass";
import { Email, Person, Phone } from "@mui/icons-material";
import { postData } from "@/utils/api/post";
import { createPersonUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type FormProps = {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
};

const AddPersonForm = () => {
  const router = useRouter();

  const { FormGroup, FormContainer, FormInput, FormButton } = styles;

  const { register, handleSubmit } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await postData(createPersonUrl(), data);
    if (response?.ok) {
      toast.success("Person successfully added!");
      router.push("/persons");
    }
  };

  return (
    <div className={FormContainer}>
      <h2>Person form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={FormGroup}>
          <Person />
          <input
            type="text"
            {...register("first_name")}
            placeholder="Ime"
            className={FormInput}
          />
          <input
            {...register("last_name")}
            placeholder="Priimek"
            required
            className={FormInput}
          />
        </div>

        <div className={FormGroup}>
          <Phone />
          <input
            {...register("phone_number")}
            placeholder="Tel. št."
            type="tel"
            className={FormInput}
          />
        </div>
        <div className={FormGroup}>
          <Email />
          <input
            {...register("email")}
            placeholder="Email"
            className={FormInput}
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

export default AddPersonForm;
