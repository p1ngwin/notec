import View from '@/components/View';
import { Card, Grid } from '@mui/material';
import Avatar from '../Avatar';
import styles from './styles.module.sass';
import { IPerson } from '@/types/Person';
import { Phone, Person, Email } from '@mui/icons-material';
import classNames from 'classnames';
import Divider from '@/components/Divider';

type Props = {
  avatar?: SVGElement | string;
} & Partial<IPerson>;

const PersonCard = ({
  first_name,
  last_name,
  phone_number,
  email,
  note,
}: Props) => {
  const { PersonView, PersonInfoRow, BaseCard, _Avatar, PersonNote } = styles;

  return (
    <Grid container className={PersonView}>
      <Card
        sx={{ background: 'transparent', boxShadow: 'none' }}
        className={BaseCard}
      >
        <div className={_Avatar}>
          <Avatar />
        </div>

        <Grid container spacing={1}>
          <Grid item xs={12} className={PersonInfoRow}>
            <Person />
            {first_name} {last_name}
          </Grid>
          <Grid item xs={12} className={PersonInfoRow}>
            <Phone />
            {phone_number}
          </Grid>
          <Grid item xs={12} className={PersonInfoRow}>
            <Email />
            <a href={`mailto:${email}`}>{email}</a>
          </Grid>
          <Divider />
          <Grid
            item
            className={classNames([PersonInfoRow, PersonNote])}
            xs={12}
          >
            {note}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PersonCard;
