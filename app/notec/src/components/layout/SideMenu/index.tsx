import React from "react";
import styles from "./styles.module.sass";
import { Drawer } from "@mui/material";
import { MenuNav } from "@/components/MenuNav";

const SideMenuLayout = () => {
  const { SideMenuWrapper, DrawerPrimary } = styles;

  return (
    <div className={SideMenuWrapper}>
      <Drawer
        variant="permanent"
        className={DrawerPrimary}
        sx={{
          "& .MuiPaper-root": {
            position: "relative",
          },
        }}
      >
        <MenuNav />
      </Drawer>
    </div>
  );
};

export default SideMenuLayout;
