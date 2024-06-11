import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from './styles.module.sass';
import { createPersonUrl } from '@/utils/api/urls';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { TextField, Stack, FormControl, Grid } from '@mui/material';
import { usePostStore } from '@/stores/useRequestStore';
import { useTranslation } from 'next-i18next';
import ActionButton from '@/components/ActionButton';

type FormProps = {
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  note?: string;
};

const AddPersonForm = () => {
  const router = useRouter();

  const { post } = usePostStore();

  const { t } = useTranslation();

  const { FormGroup, FormContainer } = styles;

  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      note: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await post(createPersonUrl(), data);
    if (response?.ok) {
      toast.success(t('toast.client_add_success'));
      router.push('/persons');
    }
  };

  return (
    <div className={FormContainer}>
      <Grid container>
        <Grid item xs={12}>
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
                        label={t('first_name')}
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
                      label={t('last_name')}
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
                      label={t('phone_number')}
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
                      label={t('email')}
                    />
                  )}
                />
                <Grid item xs={12} justifyContent="center" display="flex">
                  <ActionButton
                    isPrimary
                    onClick={handleSubmit(onSubmit)}
                    label={t('actions.add')}
                  />
                </Grid>
              </Stack>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddPersonForm;
