import View from "@/components/View";
import { Card } from "@mui/material";
import Avatar from "../Avatar";
import styles from "./styles.module.sass";
import { IPerson } from "@/types/Person";
import { Phone, Person, Email } from "@mui/icons-material";

type Props = {
  avatar?: SVGElement | string;
} & Partial<IPerson>;

const PersonCard = ({ first_name, last_name, phone_number, email }: Props) => {
  const { PersonView, PersonInfoRow } = styles;

  return (
    <View className={PersonView}>
      <Card>
        <Avatar />

        <div className={PersonInfoRow}>
          <Person />
          {first_name} {last_name}
        </div>
        <div className={PersonInfoRow}>
          <Phone />
          {phone_number}
        </div>
        <div className={PersonInfoRow}>
          <Email />
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </Card>
    </View>
  );
};

export default PersonCard;
