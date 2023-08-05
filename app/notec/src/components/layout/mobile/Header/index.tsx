import { useSidebar } from "@/context/mobileSidebar/useSidebar";
import { Toolbar, IconButton, AppBar } from "@mui/material";
import { Menu, Close, Home } from "@mui/icons-material";
import Link from "next/link";
import styles from "./styles.module.sass";

const HeaderMobile = () => {
  const { MobileMenuWrapper, HomeButton, NavButton } = styles;

  const { toggleDrawer, isDrawerOpen } = useSidebar();

  const handleDrawerToggle = () => {
    toggleDrawer();
  };

  return (
    <AppBar position="static">
      <div className="HeaderMobile">
        <Toolbar>
          <div className={HomeButton}>
            <Link href={"/"}>
              <Home />
            </Link>
          </div>
          <div className={NavButton}>
            <IconButton onClick={handleDrawerToggle}>
              {!isDrawerOpen ? <Menu /> : <Close />}
            </IconButton>
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
};
export default HeaderMobile;
