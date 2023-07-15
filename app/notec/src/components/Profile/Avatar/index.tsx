import Image from "next/image";
import styles from "./styles.module.sass";
import React from "react";
import Person from "@mui/icons-material/Person";

type Props = {
  img?: SVGElement | string;
};

const SVGWrapper: React.FC<{ svgElement: SVGElement }> = ({ svgElement }) => (
  <>{svgElement}</>
);

const Avatar = ({ img }: Props) => {
  const { AvatarBox } = styles;

  return (
    <div className={AvatarBox}>
      {img ? (
        typeof img === "string" ? (
          <Image
            src={img}
            alt="avatar"
          />
        ) : img instanceof SVGElement ? (
          <SVGWrapper svgElement={img} />
        ) : null
      ) : (
        <Person />
      )}
    </div>
  );
};

export default Avatar;
