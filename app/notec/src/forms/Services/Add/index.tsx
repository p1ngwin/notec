import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import { postData } from "@/utils/api/post";
import { servicesCreateUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Box, TextField, Stack } from "@mui/material";

type FormProps = {
  service: string;
  price?: number;
};

const AddServiceForm = () => {
  const router = useRouter();

  const { FormGroup, FormContainer, FormButton } = styles;

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      price: undefined,
      service: "",
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await postData(servicesCreateUrl(), data);
    if (response?.ok) {
      toast.success("Person successfully added!");
      router.push("/persons");
    }
  };

  return (
    <div className={FormContainer}>
      <h2>Dodaj storitev</h2>
      <Box sx={{ mt: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={FormGroup}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
            >
              <Controller
                name="service"
                control={control}
                rules={{ required: "Prosimo izberite storitev." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Naziv"
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{ required: "Prosimo izberite osebo" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Cena"
                  />
                )}
              />
              <div className={FormGroup}>
                <input
                  type="submit"
                  value="Dodaj"
                  className={FormButton}
                />
              </div>
            </Stack>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AddServiceForm;
