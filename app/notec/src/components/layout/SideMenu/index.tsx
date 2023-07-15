import React from "react";
import styles from "./styles.module.sass";
import { Button, Drawer } from "@mui/material";
import Image from "next/image";
import logo from "../../../assets/img/logo.svg";
import { useRouter } from "next/router";
import Spacer from "@/components/Spacer";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const SideMenuLayout = () => {
  const { SideMenuWrapper, DrawerPrimary, NavMenuButton, NavMenuWrapper } =
    styles;

  const router = useRouter();

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
        <div className="Logo">
          <Image
            src={logo}
            alt="logo"
          />
        </div>
        <Spacer />
        <div className={NavMenuWrapper}>
          <div className={NavMenuButton}>
            <Button onClick={() => router.push("/persons")}>
              <PeopleIcon />
              <span>Stranke</span>
            </Button>
          </div>
          <div className={NavMenuButton}>
            <Button onClick={() => router.push("/appointments")}>
              <CalendarMonthIcon />
              Urnik
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SideMenuLayout;
