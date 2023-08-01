import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./styles.module.sass";
import { Email, Person, Phone } from "@mui/icons-material";
import { postData } from "@/utils/api/post";
import { createPersonUrl } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputAdornment,
} from "@mui/material";

type FormProps = {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
};

const AddPersonForm = () => {
  const router = useRouter();

  const { FormGroup, FormContainer, FormButton } = styles;

  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await postData(createPersonUrl(), data);
    if (response?.ok) {
      toast.success("Person successfully added!");
      router.push("/persons");
    }
  };

  return (
    <div className={FormContainer}>
      <h2>Dodaj stranko</h2>
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
              <FormControl variant="standard">
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Ime"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Priimek"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Tel. št."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
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

export default AddPersonForm;
