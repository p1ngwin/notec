import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from './styles.module.sass';
import { postData } from '@/utils/api/post';
import { servicesCreateUrl } from '@/utils/api/urls';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { TextField, Stack, Grid } from '@mui/material';
import ActionButton from '@/components/ActionButton';
import { useTranslation } from 'next-i18next';

type FormProps = {
  service: string;
  price?: number;
  note?: string;
};

const AddServiceForm = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { FormGroup, FormContainer } = styles;

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      price: undefined,
      service: '',
      note: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const response = await postData(servicesCreateUrl(), data);
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
                <Controller
                  name="service"
                  control={control}
                  rules={{ required: t('servicespage.enter_service_name') }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label={t('service_name')}
                      type="text"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: t('servicespage.enter_price') }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label={t('price')}
                      type="number"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: t('servicespage.enter_price') }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      multiline
                      rows={4}
                      label={`${t('note')} (${t('optional')}) `}
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

export default AddServiceForm;
