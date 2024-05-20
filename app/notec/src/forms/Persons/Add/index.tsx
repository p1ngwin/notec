import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from './styles.module.sass';
import { Email, Person, Phone } from '@mui/icons-material';
import { createPersonUrl } from '@/utils/api/urls';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { usePostStore } from '@/stores/useRequestStore';

type FormProps = {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
};

const AddPersonForm = () => {
  const router = useRouter();

  const { post } = usePostStore();

  const { FormGroup, FormContainer, FormButton } = styles;

  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await post(createPersonUrl(), data);
    if (response?.ok) {
      toast.success('Person successfully added!');
      router.push('/persons');
    }
  };

  return (
    <div className={FormContainer}>
      <h2>New client</h2>
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
                      label="First name"
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
                    label="Last name"
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
                    label="Phone number"
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
                <input type="submit" value="Add" className={FormButton} />
              </div>
            </Stack>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AddPersonForm;
