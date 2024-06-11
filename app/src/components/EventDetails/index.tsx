import { EventCellProps } from '@/types/common';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { deleteAppointmentUrl } from '@/utils/api/urls';
import { useDeleteStore } from '@/stores/useRequestStore';
import toast from 'react-hot-toast';
import { Divider, Grid, MenuItem, Typography } from '@mui/material';
import {
  CalendarTodayOutlined,
  ChevronRightOutlined,
  PersonOutline,
  TimerOutlined,
} from '@mui/icons-material';
import ActionButton from '../ActionButton';

const EventDetails = ({
  id,
  time,
  date,
  first_name,
  last_name,
  service,
}: EventCellProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  const { _delete } = useDeleteStore();

  const handleAppointmentDelete = async (id: string) => {
    const deletedAppointment = await await _delete(deleteAppointmentUrl(id), {
      id,
    });
    if (deletedAppointment) {
      toast.success(t('toast.appointment_deleted_success'));
      window.location.reload();
    } else {
      toast.error(t('toast.appointment_deleted_success'));
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">
          <CalendarTodayOutlined sx={{ marginRight: 1 }} />
          {date}
          <br /> <TimerOutlined sx={{ marginRight: 1 }} />
          {time}
          <br />
          <PersonOutline sx={{ marginRight: 1 }} />
          {first_name} {last_name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ margin: '1rem 0' }} />
        {service &&
          service.split(',').map((service, index) => (
            <MenuItem key={id ?? index}>
              <ChevronRightOutlined sx={{ marginRight: 1 }} />
              {service}
            </MenuItem>
          ))}
        <Divider sx={{ margin: '1rem 0' }} />
      </Grid>

      <Grid
        container
        marginTop={2}
        xs={12}
        display="flex"
        justifyContent="space-between"
      >
        <Grid item xs={6} display="flex" textAlign={'center'}>
          <ActionButton
            isPrimary
            onClick={() => router.push(`/appointments/edit/${id}`)}
            label={t('appointmentspage.edit_appointment')}
          ></ActionButton>
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          justifyContent="end"
          textAlign={'center'}
        >
          <ActionButton
            isSecondary
            onClick={() => handleAppointmentDelete(id)}
            label={t('appointmentspage.delete_appointment')}
          ></ActionButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventDetails;
